import type { Metadata } from "next";

import { LegalShell } from "@/components/legal-shell";
import { getSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Fooder.",
  alternates: { canonical: "/mentions-legales" },
};

export default function LegalNoticePage() {
  const { contactEmail, isPublic } = getSiteConfig();

  return (
    <LegalShell>
      <span className="section-kicker">Statut : {isPublic ? "publication" : "preview privée"}</span>
      <h1>Mentions légales</h1>
      <p className="legal-intro">
        Fooder est actuellement développé dans le cadre d&apos;une phase personnelle,
        non commerciale, de conception et de test.
      </p>

      {!isPublic ? (
        <div className="legal-notice">
          Cette preview ne doit pas être rendue publique ni indexée. L&apos;adresse de
          l&apos;éditeur et les informations d&apos;hébergement définitives doivent être
          validées avant de passer <code>PUBLICATION_STATUS</code> à <code>public</code>.
        </div>
      ) : null}

      <section className="legal-section">
        <h2>Éditeur et directeur de publication</h2>
        <p>Antoine Jonville, éditeur à titre personnel et directeur de publication.</p>
        <p>Adresse postale : à compléter avant publication publique.</p>
        <p>
          Contact : {contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : "à créer avant publication publique"}.
        </p>
      </section>

      <section className="legal-section">
        <h2>Hébergement du site</h2>
        <p>
          Hébergement prévu par Vercel Inc. La région d&apos;exécution, l&apos;adresse légale
          complète de l&apos;hébergeur et les garanties de transfert devront être
          reportées ici depuis la configuration effective du projet avant publication.
        </p>
      </section>

      <section className="legal-section">
        <h2>Hébergement des inscriptions</h2>
        <p>
          Stockage prévu par Supabase. La région du projet et les garanties de
          transfert devront être confirmées depuis le dashboard Supabase avant
          activation de la liste d&apos;attente.
        </p>
      </section>

      <section className="legal-section">
        <h2>Propriété intellectuelle</h2>
        <p>
          Le nom Fooder, ses textes, son identité visuelle, ses illustrations et ses
          interfaces originales sont protégés par les règles applicables à la
          propriété intellectuelle.
        </p>
      </section>
    </LegalShell>
  );
}
