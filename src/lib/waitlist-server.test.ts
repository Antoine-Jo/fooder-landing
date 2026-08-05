import { afterEach, describe, expect, it, vi } from "vitest";

import { submitWaitlist } from "./waitlist-server";

function configurePublicWaitlist() {
  vi.stubEnv("PUBLICATION_STATUS", "public");
  vi.stubEnv("WAITLIST_ENABLED", "true");
  vi.stubEnv("LEGAL_NOTICE_READY", "true");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://fooder.example");
  vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "contact@fooder.example");
  vi.stubEnv("SUPABASE_URL", "https://project.supabase.co");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role-key-with-enough-characters");
  vi.stubEnv("WAITLIST_RATE_LIMIT_SALT", "a-secure-test-salt-with-at-least-32-characters");
}

afterEach(() => vi.unstubAllEnvs());

describe("waitlist server", () => {
  it("does not contact Supabase in preview", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const result = await submitWaitlist({
      email: "hello@example.com",
      source: "hero",
      address: "127.0.0.1",
      fetcher,
    });

    expect(result.reason).toBe("disabled");
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("submits normalized, versioned consent without exposing the address", async () => {
    configurePublicWaitlist();
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify("accepted"), { status: 200 }),
    );

    const result = await submitWaitlist({
      email: " Hello@Example.COM ",
      source: "footer",
      address: "203.0.113.1",
      fetcher,
    });

    expect(result.status).toBe("success");
    const request = fetcher.mock.calls[0];
    const body = JSON.parse(String(request?.[1]?.body));
    expect(body).toMatchObject({
      signup_email: "hello@example.com",
      signup_source: "footer",
      signup_consent_version: "2026-08-06.1",
    });
    expect(JSON.stringify(body)).not.toContain("203.0.113.1");
  });

  it("returns a dedicated rate-limit state", async () => {
    configurePublicWaitlist();
    const result = await submitWaitlist({
      email: "hello@example.com",
      source: "hero",
      address: "203.0.113.1",
      fetcher: vi.fn<typeof fetch>().mockResolvedValue(
        new Response(JSON.stringify("rate_limited"), { status: 200 }),
      ),
    });

    expect(result).toMatchObject({ status: "error", reason: "rate_limited" });
  });

  it("fails closed on an unexpected RPC response", async () => {
    configurePublicWaitlist();
    const result = await submitWaitlist({
      email: "hello@example.com",
      source: "hero",
      address: "203.0.113.1",
      fetcher: vi.fn<typeof fetch>().mockResolvedValue(
        new Response(JSON.stringify(null), { status: 200 }),
      ),
    });

    expect(result).toMatchObject({ status: "error", reason: "upstream" });
  });

  it("handles an unavailable upstream", async () => {
    configurePublicWaitlist();
    const result = await submitWaitlist({
      email: "hello@example.com",
      source: "hero",
      address: "203.0.113.1",
      fetcher: vi.fn<typeof fetch>().mockRejectedValue(new Error("offline")),
    });

    expect(result).toMatchObject({ status: "error", reason: "upstream" });
  });
});
