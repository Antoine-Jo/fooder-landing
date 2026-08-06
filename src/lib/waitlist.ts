import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Saisissez votre adresse email.")
    .email("Cette adresse email ne semble pas valide.")
    .max(254, "Cette adresse email est trop longue."),
  source: z.enum(["hero", "footer"]).default("hero"),
  website: z.string().max(500).optional(),
});

export const WAITLIST_CONSENT_VERSION = "2026-08-06.1";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
  reason?: "disabled" | "invalid" | "configuration" | "upstream" | "rate_limited";
};

export const initialWaitlistState: WaitlistState = { status: "idle", message: "" };

export function normalizeEmail(email: string) {
  return email.trim().toLocaleLowerCase("fr-FR");
}
