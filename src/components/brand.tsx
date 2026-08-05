import { Utensils } from "lucide-react";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand ${inverse ? "brand-inverse" : ""}`}>
      <span className="brand-mark">
        <Utensils aria-hidden="true" size={19} strokeWidth={2.25} />
      </span>
      <span className="brand-word">Fooder</span>
    </span>
  );
}
