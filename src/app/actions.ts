"use server";

import "server-only";

import { headers } from "next/headers";

import { submitWaitlist } from "@/lib/waitlist-server";
import { waitlistSchema, type WaitlistState } from "@/lib/waitlist";

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
    return {
      status: "error",
      reason: "invalid",
      message: parsed.error.issues[0]?.message ?? "Vérifiez votre saisie.",
    };
  }

  if (parsed.data.website) {
    return { status: "success", message: "Votre inscription est confirmée." };
  }

  const requestHeaders = await headers();
  const address =
    requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    ?? requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? requestHeaders.get("x-real-ip")
    ?? "unknown";

  return submitWaitlist({
    email: parsed.data.email,
    source: parsed.data.source,
    address,
  });
}
