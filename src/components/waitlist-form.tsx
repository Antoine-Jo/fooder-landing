"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { track } from "@vercel/analytics";

import { joinWaitlist } from "@/app/actions";
import { initialWaitlistState } from "@/lib/waitlist";

type WaitlistFormProps = {
  location: "hero" | "footer";
  enabled: boolean;
  contactEmail?: string;
};

export function WaitlistForm({ location, enabled, contactEmail }: WaitlistFormProps) {
  const [state, action, pending] = useActionState(joinWaitlist, initialWaitlistState);
  const trackedState = useRef(state);

  useEffect(() => {
    if (state === trackedState.current) return;
    trackedState.current = state;
    if (state.status === "success") track("waitlist_success", { location });
    if (state.status === "error") {
      track(state.reason === "rate_limited" ? "waitlist_rate_limited" : "waitlist_error", {
        location,
        reason: state.reason ?? "unknown",
      });
    }
  }, [location, state]);

  if (!enabled) {
    return (
      <div className="waitlist-disabled" role="status">
        <span>Bêta privée</span>
        <p>La liste d&apos;attente ouvrira avec la preview publique de Fooder.</p>
      </div>
    );
  }

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <span><Check size={18} /></span>
        <p>
          {state.message}
          {contactEmail ? <> Pour vous retirer, écrivez à {contactEmail}.</> : null}
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="waitlist-form"
      onSubmit={() => track("waitlist_attempt", { location })}
    >
      <label className="sr-only" htmlFor={`email-${location}`}>Votre adresse email</label>
      <input
        autoComplete="email"
        id={`email-${location}`}
        inputMode="email"
        name="email"
        placeholder="vous@exemple.fr"
        required
        type="email"
      />
      <input name="source" type="hidden" value={location} />
      <div aria-hidden="true" className="honeypot">
        <label htmlFor={`website-${location}`}>Votre site web</label>
        <input autoComplete="off" id={`website-${location}`} name="website" tabIndex={-1} />
      </div>
      <button disabled={pending} type="submit">
        {pending ? <LoaderCircle className="spinner" size={18} /> : <ArrowRight size={18} />}
        <span>{pending ? "Inscription..." : "Être prévenu de la bêta"}</span>
      </button>
      {state.status === "error" && <p className="form-error" role="alert">{state.message}</p>}
    </form>
  );
}
