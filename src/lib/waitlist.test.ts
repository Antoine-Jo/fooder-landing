import { describe, expect, it } from "vitest";

import { normalizeEmail, waitlistSchema } from "./waitlist";

describe("waitlist validation", () => {
  it("accepts and normalizes a valid email", () => {
    const result = waitlistSchema.safeParse({
      email: "  BONJOUR@EXEMPLE.FR ",
      source: "hero",
    });

    expect(result.success).toBe(true);
    expect(normalizeEmail("  BONJOUR@EXEMPLE.FR ")).toBe("bonjour@exemple.fr");
  });

  it("rejects malformed addresses", () => {
    const result = waitlistSchema.safeParse({ email: "pas-un-email", source: "footer" });
    expect(result.success).toBe(false);
  });

  it("rejects unknown form sources", () => {
    const result = waitlistSchema.safeParse({ email: "a@b.fr", source: "campaign" });
    expect(result.success).toBe(false);
  });

  it("retains the honeypot value for the server action", () => {
    const result = waitlistSchema.safeParse({
      email: "a@b.fr",
      source: "hero",
      website: "https://spam.example",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.website).toBe("https://spam.example");
  });
});
