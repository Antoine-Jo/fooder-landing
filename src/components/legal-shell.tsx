import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

export function LegalShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <div className="shell nav-inner">
          <Link aria-label="Fooder, accueil" href="/"><Brand /></Link>
          <div className="nav-actions">
            <ThemeToggle />
            <Link className="back-link" href="/"><ArrowLeft size={16} /> Retour au site</Link>
          </div>
        </div>
      </header>
      <article className="shell legal-content">{children}</article>
    </main>
  );
}
