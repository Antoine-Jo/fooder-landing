import type { Metadata } from "next";

import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Conditions d'utilisation du site",
  description: "Conditions d'utilisation du site de présentation Fooder.",
  alternates: { canonical: "/conditions" },
};

export default function TermsPage() {
  return (
    <LegalShell>
      <span className="section-kicker">Version bêta · 5 août 2026</span>
      <h1>Conditions d&apos;utilisation du site</h1>
      <p className="legal-intro">
        Ces conditions encadrent l&apos;accès au site Fooder et à sa liste d&apos;attente.
        Elles ne constituent pas les conditions d&apos;utilisation de l&apos;application.
      </p>

      <div className="legal-notice">
        Le site présente un produit en cours de développement. Les visuels sont des
        mises en situation et certaines fonctionnalités peuvent évoluer avant la
        sortie publique.
      </div>

      <section className="legal-section">
        <h2>1. Éditeur</h2>
        <p>
          Fooder est actuellement édité à titre personnel et non commercial par
          Antoine Jonville dans le cadre d&apos;une phase de conception et de test. Les
          mentions relatives au statut juridique, à l&apos;adresse de contact et à
          l&apos;hébergement définitif seront complétées avant l&apos;ouverture publique.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Objet du site</h2>
        <p>
          Le site informe sur le projet Fooder et permet de demander à être prévenu
          de l&apos;ouverture de sa bêta. L&apos;inscription ne garantit ni une date de sortie,
          ni une place dans un programme de test, ni la disponibilité d&apos;une
          fonctionnalité donnée.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Utilisation</h2>
        <p>
          Vous vous engagez à ne pas perturber le site, contourner ses mécanismes de
          sécurité, automatiser abusivement les inscriptions ou utiliser son contenu
          en violation des droits de Fooder ou de tiers.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Propriété intellectuelle</h2>
        <p>
          Le nom Fooder, son identité, ses textes, illustrations culinaires,
          interfaces et éléments logiciels originaux sont protégés. Leur présence
          sur ce site ne vous accorde aucun droit de reproduction ou d&apos;exploitation.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Disponibilité et responsabilité</h2>
        <p>
          Le site et le projet sont fournis pendant une phase de test. Ils peuvent
          être modifiés, interrompus ou retirés. Fooder met en œuvre des moyens
          raisonnables pour maintenir des informations à jour sans garantir
          l&apos;absence totale d&apos;erreurs.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Droit applicable</h2>
        <p>
          Ces conditions sont régies par le droit français. Les règles impératives
          protégeant les consommateurs restent applicables.
        </p>
      </section>
    </LegalShell>
  );
}
