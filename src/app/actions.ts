"use server";

import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

import { normalizeEmail, waitlistSchema, type WaitlistState } from "@/lib/waitlist";

export async function joinWaitlist(
  _previousState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const parsed = waitlistSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source"),
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Vérifiez votre saisie." };
  }

  if (parsed.data.website) {
    return { status: "success", message: "Votre inscription est confirmée." };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const rateLimitSalt = process.env.WAITLIST_RATE_LIMIT_SALT;

  if (!supabaseUrl || !serviceRoleKey || !rateLimitSalt) {
    console.error("Waitlist configuration is incomplete.");
    return {
      status: "error",
      message: "La liste d'attente ouvre bientôt. Réessayez dans quelques instants.",
    };
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwardedFor || requestHeaders.get("x-real-ip") || "unknown";
  const fingerprint = createHash("sha256").update(`${rateLimitSalt}:${address}`).digest("hex");

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/register_waitlist_signup`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signup_email: normalizeEmail(parsed.data.email),
        signup_source: parsed.data.source,
        request_fingerprint: fingerprint,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Supabase waitlist request failed", response.status, await response.text());
      return { status: "error", message: "Impossible de vous inscrire pour le moment. Réessayez bientôt." };
    }

    const result: unknown = await response.json();
    if (result === "rate_limited") {
      return { status: "error", message: "Trop de tentatives. Réessayez dans quelques minutes." };
    }

    return {
      status: "success",
      message: "Vous êtes sur la liste. On vous prévient dès que Fooder passe à table.",
    };
  } catch (error) {
    console.error("Waitlist request failed", error);
    return { status: "error", message: "Impossible de vous inscrire pour le moment. Réessayez bientôt." };
  }
}
