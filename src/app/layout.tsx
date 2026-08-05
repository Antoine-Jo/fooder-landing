import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Manrope } from "next/font/google";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Fooder | À deux, trouvez enfin où manger",
    template: "%s | Fooder",
  },
  description:
    "Fooder aide les duos à choisir un restaurant. Chacun choisit en privé et seuls les accords sont révélés.",
  applicationName: "Fooder",
  category: "food & drink",
  keywords: ["restaurant", "application", "couple", "sortie", "restaurant à deux", "Fooder"],
  authors: [{ name: "Fooder" }],
  creator: "Fooder",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Trouvez le restaurant qui vous met enfin d'accord.",
    description: "Chacun choisit en privé. Fooder révèle seulement vos bonnes idées communes.",
    url: "/",
    siteName: "Fooder",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fooder, mettez-vous à table.",
    description: "Le restaurant qui vous met enfin d'accord.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F6F0E7",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${fraunces.variable} ${manrope.variable}`} lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
