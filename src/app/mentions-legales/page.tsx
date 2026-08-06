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
      <span className="section-kicker">Statut : {isPublic ? "publication" : "prototype public"}</span>
      <h1>Mentions légales</h1>
      <p className="legal-intro">
        Fooder est actuellement développé dans le cadre d&apos;une phase personnelle,
        non commerciale, de conception et de test.
      </p>

      {!isPublic ? (
        <div className="legal-notice">
          Ce prototype public reste volontairement non indexé et n&apos;accepte aucune
          inscription. Les informations légales définitives devront être validées
          avant d&apos;activer la liste d&apos;attente ou toute diffusion commerciale.
        </div>
      ) : null}

      <section className="legal-section">
        <h2>Éditeur et directeur de publication</h2>
        <p>Antoine Jonville, éditeur à titre personnel et directeur de publication.</p>
        <p>Adresse postale : à compléter avant activation de la liste d&apos;attente.</p>
        <p>
          Contact : {contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : "à créer avant activation de la liste d'attente"}.
        </p>
      </section>

      <section className="legal-section">
        <h2>Hébergement du site</h2>
        <p>
          Site hébergé par Vercel Inc. La région d&apos;exécution, l&apos;adresse légale
          complète de l&apos;hébergeur et les garanties de transfert devront être
          reportées ici avant activation de la liste d&apos;attente.
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
