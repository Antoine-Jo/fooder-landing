import "server-only";

import { createHash } from "node:crypto";
import { z } from "zod";

import { getSiteConfig } from "@/lib/site-config";
import { normalizeEmail, WAITLIST_CONSENT_VERSION, type WaitlistState } from "@/lib/waitlist";

const serverEnvironmentSchema = z.object({
  SUPABASE_URL: z.url().refine(
    (url) => process.env.NODE_ENV !== "production" || url.startsWith("https://"),
    "SUPABASE_URL must use HTTPS in production.",
  ),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  WAITLIST_RATE_LIMIT_SALT: z.string().min(32),
});

const rpcResultSchema = z.enum(["accepted", "rate_limited"]);

type SubmitWaitlistInput = {
  email: string;
  source: "hero" | "footer";
  address: string;
  fetcher?: typeof fetch;
};

export async function submitWaitlist({
  email,
  source,
  address,
  fetcher = fetch,
}: SubmitWaitlistInput): Promise<WaitlistState> {
  const siteConfig = getSiteConfig();
  if (!siteConfig.isPublic || !siteConfig.waitlistEnabled) {
    return {
      status: "error",
      reason: "disabled",
      message: "La liste d'attente ouvrira avec la bêta publique.",
    };
  }

  const environment = serverEnvironmentSchema.safeParse(process.env);
  if (!environment.success) {
    console.error("Waitlist server configuration is invalid.");
    return {
      status: "error",
      reason: "configuration",
      message: "La liste d'attente ouvre bientôt. Réessayez dans quelques instants.",
    };
  }

  const fingerprint = createHash("sha256")
    .update(`${environment.data.WAITLIST_RATE_LIMIT_SALT}:${address}`)
    .digest("hex");

  try {
    const response = await fetcher(
      `${environment.data.SUPABASE_URL}/rest/v1/rpc/register_waitlist_signup`,
      {
        method: "POST",
        headers: {
          apikey: environment.data.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${environment.data.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signup_email: normalizeEmail(email),
          signup_source: source,
          signup_consent_version: WAITLIST_CONSENT_VERSION,
          request_fingerprint: fingerprint,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!response.ok) {
      console.error("Supabase waitlist request failed.", response.status);
      return {
        status: "error",
        reason: "upstream",
        message: "Impossible de vous inscrire pour le moment. Réessayez bientôt.",
      };
    }

    const result = rpcResultSchema.safeParse(await response.json());
    if (!result.success) {
      console.error("Supabase waitlist returned an unexpected response.");
      return {
        status: "error",
        reason: "upstream",
        message: "Impossible de vous inscrire pour le moment. Réessayez bientôt.",
      };
    }

    if (result.data === "rate_limited") {
      return {
        status: "error",
        reason: "rate_limited",
        message: "Trop de tentatives. Réessayez dans quelques minutes.",
      };
    }

    return {
      status: "success",
      message: "Vous êtes sur la liste. On vous prévient dès que Fooder passe à table.",
    };
  } catch (error) {
    const isTimeout = error instanceof DOMException && error.name === "TimeoutError";
    console.error(isTimeout ? "Waitlist request timed out." : "Waitlist request failed.");
    return {
      status: "error",
      reason: "upstream",
      message: "Impossible de vous inscrire pour le moment. Réessayez bientôt.",
    };
  }
}
