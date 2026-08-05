"use client";

import { useActionState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { track } from "@vercel/analytics";

import { joinWaitlist } from "@/app/actions";
import { initialWaitlistState } from "@/lib/waitlist";

export function WaitlistForm({ location }: { location: "hero" | "footer" }) {
  const [state, action, pending] = useActionState(joinWaitlist, initialWaitlistState);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <span><Check size={18} /></span>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="waitlist-form"
      onSubmit={() => track("waitlist_submit", { location })}
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
        <span>{pending ? "Inscription..." : "Rejoindre la liste"}</span>
      </button>
      {state.status === "error" && <p className="form-error" role="alert">{state.message}</p>}
    </form>
  );
}
