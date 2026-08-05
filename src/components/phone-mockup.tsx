import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  LockKeyhole,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  Star,
  UsersRound,
  X,
} from "lucide-react";

type Screen = "discover" | "match" | "private" | "plan";

export function PhoneMockup({ screen, className = "" }: { screen: Screen; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span>● ◒ ▰</span></div>
        {screen === "discover" && <DiscoverScreen />}
        {screen === "match" && <MatchScreen />}
        {screen === "private" && <PrivateScreen />}
        {screen === "plan" && <PlanScreen />}
      </div>
    </div>
  );
}

function DiscoverScreen() {
  return (
    <div className="app-screen discover-screen">
      <div className="app-header-row">
        <div><small>CE SOIR, À</small><strong>Lyon 2e</strong></div>
        <button aria-label="Filtres"><SlidersHorizontal size={16} /></button>
      </div>
      <div className="restaurant-card">
        <div className="restaurant-photo">
          <Image alt="Assiette illustrée servie dans un restaurant" fill priority sizes="(max-width: 700px) 65vw, 330px" src="/food-pasta.svg" />
          <span className="cuisine-pill">Italien</span>
          <span className="choice-stamp">À TABLE !</span>
        </div>
        <div className="restaurant-info">
          <div className="restaurant-title"><strong>Casa Livia</strong><span><Star fill="currentColor" size={12} /> 4,7</span></div>
          <div className="restaurant-meta"><span>€€</span><span>1,2 km</span><span className="open">Ouvert</span></div>
          <small>18 rue de la Charité, Lyon</small>
        </div>
      </div>
      <div className="swipe-actions">
        <button aria-label="Pas maintenant"><X size={19} /></button>
        <button aria-label="Ajouter aux favoris"><Heart size={17} /></button>
        <button aria-label="À table"><Check size={21} /></button>
      </div>
      <div className="app-tabbar"><span>⌁<small>Découvrir</small></span><span>♡<small>Sélections</small></span><span>♧<small>Tables</small></span></div>
    </div>
  );
}

function MatchScreen() {
  return (
    <div className="app-screen match-screen">
      <div className="match-rays" />
      <div className="match-icon"><Sparkles size={24} /></div>
      <small>UN ACCORD !</small>
      <h3>Tout le monde<br />est d&apos;accord.</h3>
      <div className="match-photo"><Image alt="Plat méditerranéen illustré" fill sizes="210px" src="/food-bowl.svg" /></div>
      <strong>Yemma</strong>
      <span>Méditerranéen · €€</span>
      <button>Voir votre accord</button>
    </div>
  );
}

function PrivateScreen() {
  return (
    <div className="app-screen private-screen">
      <div className="app-back-row"><ArrowLeft size={17} /><span>Notre table</span></div>
      <div className="private-hero">
        <div className="lock-orbit"><LockKeyhole size={25} /></div>
        <small>TABLE DUO</small>
        <h3>Chacun choisit<br />de son côté.</h3>
        <p>Vos choix resteront privés.<br />Seuls vos accords seront révélés.</p>
      </div>
      <div className="participants-card">
        <div><span className="avatar avatar-a">A</span><span><strong>Antoine</strong><small>12 choix</small></span><Check size={14} /></div>
        <div><span className="avatar avatar-l">L</span><span><strong>Léa</strong><small>En train de choisir</small></span><span className="pulse" /></div>
      </div>
      <button className="app-primary">Continuer mes choix</button>
      <span className="secured"><LockKeyhole size={11} /> Décisions privées et sécurisées</span>
    </div>
  );
}

function PlanScreen() {
  return (
    <div className="app-screen plan-screen">
      <div className="app-back-row"><ArrowLeft size={17} /><span>Votre sortie</span></div>
      <div className="plan-photo"><Image alt="Table de restaurant illustrée" fill sizes="250px" src="/food-table.svg" /></div>
      <small className="plan-label">VOTRE CHOIX FINAL</small>
      <h3>Le Bistrot d&apos;Augustin</h3>
      <p><MapPin size={12} /> 15 rue d&apos;Austerlitz, Lyon</p>
      <div className="date-card">
        <div className="date-icon"><CalendarDays size={19} /></div>
        <div><small>VENDREDI 14 AOÛT</small><strong>20 h 00</strong></div>
        <ChevronRight size={16} />
      </div>
      <div className="plan-actions"><button><MapPin size={14} /> Itinéraire</button><button><Clock3 size={14} /> Calendrier</button></div>
      <div className="duo-confirmed"><UsersRound size={14} /><span>Confirmé par vous deux</span><Check size={13} /></div>
    </div>
  );
}
