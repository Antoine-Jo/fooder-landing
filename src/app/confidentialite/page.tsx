import type { Metadata } from "next";

import { LegalShell } from "@/components/legal-shell";
import { getSiteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Fooder traite les données de la liste d'attente.",
  alternates: { canonical: "/confidentialite" },
};

export default function PrivacyPage() {
  const { contactEmail } = getSiteConfig();

  return (
    <LegalShell>
      <span className="section-kicker">Dernière mise à jour : 5 août 2026</span>
      <h1>Politique de confidentialité</h1>
      <p className="legal-intro">
        Cette politique concerne le site de présentation Fooder et sa liste
        d&apos;attente. Elle ne remplace pas la notice spécifique présentée aux
        utilisateurs de l&apos;application pendant sa phase de test.
      </p>

      <div className="legal-notice">
        Cette preview n&apos;accepte aucune inscription. La collecte sera activée
        uniquement après publication des coordonnées légales et du canal permettant
        d&apos;exercer vos droits.
      </div>

      <section className="legal-section">
        <h2>1. Donnée collectée</h2>
        <p>
          Lorsque vous rejoignez la liste d&apos;attente, Fooder collecte votre adresse
          email, la date de votre consentement et l&apos;emplacement du formulaire
          utilisé. Une empreinte technique temporaire, produite à partir de
          l&apos;adresse réseau et d&apos;un secret, sert uniquement à limiter les abus. Elle
          ne permet pas à Fooder de retrouver l&apos;adresse réseau d&apos;origine.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Finalité et base légale</h2>
        <p>
          Votre email est utilisé pour vous informer de l&apos;ouverture de la bêta et
          des étapes importantes du lancement. Ce traitement repose sur votre
          consentement, donné lorsque vous envoyez le formulaire. Fooder ne vend
          pas ces informations et ne les utilise pas pour de la publicité ciblée.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Hébergement et destinataires</h2>
        <p>
          Le site est destiné à être hébergé par Vercel et la liste d&apos;attente est
          stockée par Supabase. Ces prestataires traitent les données uniquement
          pour fournir leur infrastructure. Consultez les politiques de{" "}
          <a href="https://vercel.com/legal/privacy-policy" rel="noreferrer" target="_blank">Vercel</a>
          {" "}et de{" "}
          <a href="https://supabase.com/privacy" rel="noreferrer" target="_blank">Supabase</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Mesure d&apos;audience</h2>
        <p>
          Fooder utilise Vercel Web Analytics pour mesurer de façon agrégée les
          visites et les inscriptions. Cette mesure n&apos;utilise pas de cookies
          publicitaires et ne construit pas de profil individuel.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Durée de conservation</h2>
        <p>
          Les inscriptions sont conservées jusqu&apos;au lancement de Fooder, au retrait
          de votre consentement ou au plus tard trois ans après le dernier contact.
          Les empreintes utilisées contre les abus expirent automatiquement après
          quinze minutes. Les enregistrements techniques devenus inutiles sont
          supprimés par lots lors des soumissions suivantes après vingt-quatre heures.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou l&apos;effacement de vos
          données, retirer votre consentement ou exercer les autres droits prévus
          par le RGPD. Vous pouvez également déposer une réclamation auprès de la CNIL.
          {contactEmail ? (
            <> Pour exercer ces droits, écrivez à <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</>
          ) : null}
        </p>
      </section>
    </LegalShell>
  );
}
