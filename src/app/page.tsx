import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Heart,
  LockKeyhole,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";

import { Brand } from "@/components/brand";
import { PhoneMockup } from "@/components/phone-mockup";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Fooder | Trouvez le restaurant qui vous met d'accord",
  description:
    "Fooder aide les duos à choisir un restaurant sans débat interminable. Chacun choisit en privé, seuls les accords sont révélés.",
};

const steps = [
  {
    number: "01",
    title: "Créez votre Table",
    text: "Choisissez une ville, vos envies et votre budget, puis invitez la personne avec qui vous sortez.",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Choisissez en privé",
    text: "Chacun parcourt la même sélection à son rythme. Aucun refus, aucune hésitation n'est montré à l'autre.",
    icon: LockKeyhole,
  },
  {
    number: "03",
    title: "Retrouvez-vous à table",
    text: "Fooder révèle uniquement vos adresses communes. Affinez ensemble, planifiez et profitez.",
    icon: Sparkles,
  },
];

const features = [
  {
    title: "Ici ou ailleurs",
    text: "Autour de vous, dans un quartier ou dans la ville de votre prochaine escapade.",
    icon: MapPin,
  },
  {
    title: "Selon vos envies",
    text: "Cuisine, budget, distance et restaurants ouverts : gardez seulement ce qui compte.",
    icon: SlidersHorizontal,
  },
  {
    title: "Vos bonnes adresses",
    text: "Conservez vos favoris et transformez une sélection personnelle en décision à deux.",
    icon: Heart,
  },
  {
    title: "La sortie est calée",
    text: "Proposez une date, ouvrez l'itinéraire et ajoutez le rendez-vous à votre calendrier.",
    icon: CalendarDays,
  },
];

const faqs = [
  {
    question: "Fooder est-il déjà disponible ?",
    answer:
      "Fooder est actuellement en phase de test. Inscrivez-vous à la liste d'attente pour être prévenu des premières ouvertures de la bêta.",
  },
  {
    question: "Mon partenaire voit-il mes choix ?",
    answer:
      "Non. Vos décisions individuelles restent privées. Fooder révèle uniquement les restaurants que vous avez tous les deux retenus.",
  },
  {
    question: "Peut-on utiliser Fooder seul ?",
    answer:
      "Oui. Le mode Solo permet de découvrir des restaurants, filtrer les résultats et conserver ses adresses favorites.",
  },
  {
    question: "Peut-on créer une Table à plus de deux ?",
    answer:
      "Pas encore. La première version est pensée pour les Duos. Les Tables de groupe font partie des pistes étudiées pour la suite.",
  },
  {
    question: "Sur quels téléphones Fooder sera disponible ?",
    answer:
      "L'application est développée pour iOS et Android. Les liens de téléchargement seront publiés après validation de la bêta.",
  },
];

export default function Home() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Fooder",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    inLanguage: "fr-FR",
    description:
      "Fooder aide les duos à choisir un restaurant en révélant uniquement leurs choix communs.",
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <a className="skip-link" href="#content">
        Aller au contenu
      </a>

      <header className="site-header">
        <div className="shell nav-inner">
          <Link aria-label="Fooder, accueil" href="/">
            <Brand />
          </Link>
          <nav aria-label="Navigation principale" className="desktop-nav">
            <a href="#fonctionnement">Comment ça marche</a>
            <a href="#fonctionnalites">Fonctionnalités</a>
            <a href="#questions">Questions</a>
          </nav>
          <a className="button button-small" href="#liste-attente">
            Rejoindre la bêta
          </a>
        </div>
      </header>

      <main id="content">
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Bientôt sur iOS et Android
            </div>
            <h1>
              Trouvez le restaurant qui vous met <em>enfin</em> d&apos;accord.
            </h1>
            <p className="hero-lead">
              Chacun choisit en privé. Fooder révèle seulement les adresses que
              vous avez tous les deux envie de découvrir.
            </p>
            <WaitlistForm location="hero" />
            <p className="form-reassurance">
              <LockKeyhole aria-hidden="true" size={14} />
              Uniquement des nouvelles de Fooder. Aucun spam.
            </p>
          </div>

          <div aria-label="Aperçu de l'application Fooder" className="hero-visual">
            <div className="sun-stamp" aria-hidden="true">
              <Star fill="currentColor" size={18} />
              <span>4,8</span>
              <small>vos goûts</small>
            </div>
            <PhoneMockup className="phone-main" screen="discover" />
            <PhoneMockup className="phone-match" screen="match" />
            <div className="scribble-note" aria-hidden="true">
              <span>Enfin un oui !</span>
              <ArrowDown size={22} />
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Les avantages de Fooder">
          <div>
            <span>Moins de débat</span><i>✦</i>
            <span>Plus de découvertes</span><i>✦</i>
            <span>Des choix vraiment privés</span><i>✦</i>
            <span>Plus vite à table</span><i>✦</i>
          </div>
        </section>

        <section className="problem-section shell">
          <div className="section-label">Le menu du soir</div>
          <div className="problem-grid">
            <h2>« Comme tu veux. »<br />Le début d&apos;une très longue discussion.</h2>
            <div className="problem-copy">
              <p>
                Vous avez faim, des centaines d&apos;adresses à portée de main, et
                toujours la même question : <strong>on mange où ?</strong>
              </p>
              <p>
                Fooder remplace les listes de liens et les compromis par une
                décision visuelle, légère et vraiment partagée.
              </p>
            </div>
          </div>
        </section>

        <section className="steps-section" id="fonctionnement">
          <div className="shell">
            <div className="section-heading centered">
              <span className="section-kicker">La recette Fooder</span>
              <h2>Trois étapes. Une table.</h2>
              <p>Pas d&apos;algorithme mystérieux entre vous. Juste vos envies communes.</p>
            </div>
            <div className="steps-grid">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article className="step-card" key={step.number}>
                    <div className="step-topline">
                      <span>{step.number}</span>
                      <Icon aria-hidden="true" size={25} strokeWidth={1.8} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="privacy-section shell">
          <div className="privacy-visual">
            <PhoneMockup screen="private" />
            <div className="privacy-badge">
              <LockKeyhole size={20} />
              <span>Choix privés</span>
            </div>
          </div>
          <div className="privacy-copy">
            <span className="section-kicker">Rien à justifier</span>
            <h2>Vos non restent à vous. Vos oui vous rapprochent.</h2>
            <p>
              Chaque membre du Duo choisit de son côté. Pas de score, pas de
              jugement et pas de liste de refus : Fooder ne célèbre que les
              accords.
            </p>
            <ul className="check-list">
              <li><Check size={17} /> Choix individuels invisibles</li>
              <li><Check size={17} /> Accords révélés en temps réel</li>
              <li><Check size={17} /> Localisation utilisée seulement sur demande</li>
            </ul>
          </div>
        </section>

        <section className="features-section" id="fonctionnalites">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <span className="section-kicker">Bien plus qu&apos;un swipe</span>
                <h2>De la première envie jusqu&apos;au rendez-vous.</h2>
              </div>
              <p>
                Fooder rassemble les petits détails qui transforment une idée de
                sortie en vraie bonne soirée.
              </p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <article className={`feature-card feature-${index + 1}`} key={feature.title}>
                    <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                    <span aria-hidden="true" className="feature-index">0{index + 1}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="finale-section shell">
          <div className="finale-copy">
            <span className="section-kicker">Tout le monde est d&apos;accord</span>
            <h2>La décision est prise.<br />Il ne reste qu&apos;à réserver.</h2>
            <p>
              Affinez vos accords, choisissez votre adresse finale et proposez
              une date sans quitter votre Table.
            </p>
            <a className="text-link" href="#liste-attente">
              Je veux tester Fooder <ArrowRight size={18} />
            </a>
          </div>
          <div className="finale-visual">
            <PhoneMockup screen="plan" />
          </div>
        </section>

        <section className="faq-section shell" id="questions">
          <div className="faq-heading">
            <span className="section-kicker">À la carte</span>
            <h2>Les questions avant de passer à table.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <ChevronDown aria-hidden="true" size={20} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="waitlist-section" id="liste-attente">
          <div className="shell waitlist-inner">
            <div className="waitlist-copy">
              <span className="section-kicker light">Premiers servis</span>
              <h2>Votre prochaine bonne adresse commence ici.</h2>
              <p>
                Rejoignez la liste d&apos;attente et soyez parmi les premiers Duos à
                essayer Fooder.
              </p>
            </div>
            <div className="waitlist-card">
              <WaitlistForm location="footer" />
              <p className="form-reassurance">
                En vous inscrivant, vous acceptez notre{" "}
                <Link href="/confidentialite">politique de confidentialité</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div>
            <Brand inverse />
            <p>Les bonnes décisions se prennent à table.</p>
          </div>
          <div className="footer-links">
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/conditions">Conditions</Link>
            {contactEmail ? <a href={`mailto:${contactEmail}`}>Contact</a> : null}
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Fooder</span>
          <span>Conçu avec appétit en France</span>
        </div>
      </footer>
    </>
  );
}
