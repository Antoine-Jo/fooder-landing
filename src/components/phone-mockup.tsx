import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  LockKeyhole,
  MapPin,
  UsersRound,
} from "lucide-react";

type Screen = "discover" | "match" | "private" | "plan";

export function PhoneMockup({ screen, className = "" }: { screen: Screen; className?: string }) {
  const labels: Record<Screen, string> = {
    discover: "Écran Fooder présentant une carte de restaurant à choisir.",
    match: "Écran Fooder annonçant un restaurant choisi par les deux membres du Duo.",
    private: "Écran Fooder indiquant que les choix des deux membres restent privés.",
    plan: "Écran Fooder présentant le restaurant final et la date de sortie proposée.",
  };

  if (screen === "discover" || screen === "match") {
    return (
      <div aria-label={labels[screen]} className={`phone phone-captured captured-${screen} ${className}`} role="img">
        <Image alt="" className="capture-image capture-light" fill priority={screen === "discover"} sizes="(max-width: 700px) 55vw, 280px" src={`/mockups/expo-${screen}-light.png`} />
        <Image alt="" className="capture-image capture-dark" fill priority={screen === "discover"} sizes="(max-width: 700px) 55vw, 280px" src={`/mockups/expo-${screen}-dark.png`} />
      </div>
    );
  }

  return (
    <div aria-label={labels[screen]} className={`phone ${className}`} role="img">
      <div aria-hidden="true">
        <div className="phone-speaker" />
        <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span>● ◒ ▰</span></div>
        {screen === "private" && <PrivateScreen />}
        {screen === "plan" && <PlanScreen />}
        </div>
      </div>
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
      <span className="app-primary">Continuer mes choix</span>
      <span className="secured"><LockKeyhole size={11} /> Décisions privées et sécurisées</span>
    </div>
  );
}

function PlanScreen() {
  return (
    <div className="app-screen plan-screen">
      <div className="app-back-row"><ArrowLeft size={17} /><span>Votre sortie</span></div>
      <div className="plan-photo"><Image alt="" fill sizes="250px" src="/food-table.svg" /></div>
      <small className="plan-label">VOTRE CHOIX FINAL</small>
      <h3>Le Bistrot d&apos;Augustin</h3>
      <p><MapPin size={12} /> 15 rue d&apos;Austerlitz, Lyon</p>
      <div className="date-card">
        <div className="date-icon"><CalendarDays size={19} /></div>
        <div><small>VENDREDI 14 AOÛT</small><strong>20 h 00</strong></div>
        <ChevronRight size={16} />
      </div>
      <div className="plan-actions"><span><MapPin size={14} /> Itinéraire</span><span><Clock3 size={14} /> Calendrier</span></div>
      <div className="duo-confirmed"><UsersRound size={14} /><span>Confirmé par vous deux</span><Check size={13} /></div>
    </div>
  );
}
