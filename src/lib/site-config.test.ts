import { describe, expect, it } from "vitest";

import { parseSiteConfig } from "./site-config";

describe("site configuration", () => {
  it("defaults to a non-indexable preview with a disabled waitlist", () => {
    expect(parseSiteConfig({})).toMatchObject({
      isPublic: false,
      waitlistEnabled: false,
      siteUrl: "http://localhost:3000",
    });
  });

  it("uses the Vercel deployment URL for previews", () => {
    expect(parseSiteConfig({ VERCEL_URL: "fooder-preview.vercel.app" }).siteUrl)
      .toBe("https://fooder-preview.vercel.app");
  });

  it("rejects a waitlist enabled in preview", () => {
    expect(() => parseSiteConfig({ WAITLIST_ENABLED: "true" }))
      .toThrow("waitlist must remain disabled");
  });

  it("rejects an incomplete public deployment", () => {
    expect(() => parseSiteConfig({ PUBLICATION_STATUS: "public" }))
      .toThrow("HTTPS NEXT_PUBLIC_SITE_URL");
  });

  it("accepts a fully declared public deployment", () => {
    expect(parseSiteConfig({
      PUBLICATION_STATUS: "public",
      WAITLIST_ENABLED: "true",
      LEGAL_NOTICE_READY: "true",
      NEXT_PUBLIC_SITE_URL: "https://fooder.example/",
      NEXT_PUBLIC_CONTACT_EMAIL: "contact@fooder.example",
    })).toMatchObject({
      isPublic: true,
      waitlistEnabled: true,
      siteUrl: "https://fooder.example",
      contactEmail: "contact@fooder.example",
    });
  });
});
