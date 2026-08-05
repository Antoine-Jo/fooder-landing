import { z } from "zod";

const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.url().optional(),
);

const optionalEmail = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.email().optional(),
);

const siteEnvironmentSchema = z.object({
  PUBLICATION_STATUS: z.enum(["preview", "public"]).default("preview"),
  WAITLIST_ENABLED: z.enum(["true", "false"]).default("false"),
  LEGAL_NOTICE_READY: z.enum(["true", "false"]).default("false"),
  NEXT_PUBLIC_SITE_URL: optionalUrl,
  NEXT_PUBLIC_CONTACT_EMAIL: optionalEmail,
  VERCEL_URL: z.string().optional(),
});

export type SiteConfig = {
  publicationStatus: "preview" | "public";
  isPublic: boolean;
  waitlistEnabled: boolean;
  siteUrl: string;
  contactEmail?: string;
};

export function parseSiteConfig(environment: Record<string, string | undefined>): SiteConfig {
  const parsed = siteEnvironmentSchema.parse(environment);
  const isPublic = parsed.PUBLICATION_STATUS === "public";
  const waitlistEnabled = parsed.WAITLIST_ENABLED === "true";
  const legalNoticeReady = parsed.LEGAL_NOTICE_READY === "true";
  const previewUrl = parsed.VERCEL_URL ? `https://${parsed.VERCEL_URL}` : "http://localhost:3000";
  const siteUrl = (parsed.NEXT_PUBLIC_SITE_URL ?? previewUrl).replace(/\/$/, "");

  if (isPublic) {
    if (!parsed.NEXT_PUBLIC_SITE_URL?.startsWith("https://")) {
      throw new Error("A public deployment requires an HTTPS NEXT_PUBLIC_SITE_URL.");
    }
    if (!parsed.NEXT_PUBLIC_CONTACT_EMAIL) {
      throw new Error("A public deployment requires NEXT_PUBLIC_CONTACT_EMAIL.");
    }
    if (!waitlistEnabled) {
      throw new Error("A public deployment requires WAITLIST_ENABLED=true.");
    }
    if (!legalNoticeReady) {
      throw new Error("A public deployment requires complete legal notices.");
    }
  } else if (waitlistEnabled) {
    throw new Error("The waitlist must remain disabled on preview deployments.");
  }

  return {
    publicationStatus: parsed.PUBLICATION_STATUS,
    isPublic,
    waitlistEnabled,
    siteUrl,
    contactEmail: parsed.NEXT_PUBLIC_CONTACT_EMAIL,
  };
}

export function getSiteConfig() {
  return parseSiteConfig(process.env);
}
