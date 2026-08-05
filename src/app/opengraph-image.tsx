import { ImageResponse } from "next/og";

export const alt = "Fooder, trouvez le restaurant qui vous met enfin d'accord";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#F6F0E7", color: "#211A17", display: "flex", height: "100%", padding: 70, position: "relative", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "70%" }}>
        <div style={{ alignItems: "center", display: "flex", fontSize: 38, fontWeight: 800, gap: 15 }}>
          <div style={{ alignItems: "center", background: "#211A17", borderRadius: 18, color: "#F6F0E7", display: "flex", height: 58, justifyContent: "center", width: 58 }}>F</div>
          Fooder
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#6B3A64", fontSize: 22, fontWeight: 700, letterSpacing: 2, marginBottom: 20 }}>CHOISISSEZ À DEUX</div>
          <div style={{ fontSize: 65, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02 }}>Le restaurant qui vous met enfin d&apos;accord.</div>
        </div>
      </div>
      <div style={{ background: "#6B3A64", border: "12px solid #211A17", borderRadius: 60, bottom: -60, display: "flex", height: 550, position: "absolute", right: 75, transform: "rotate(7deg)", width: 270 }} />
      <div style={{ alignItems: "center", background: "#E6A23C", borderRadius: 60, display: "flex", fontSize: 25, fontWeight: 900, height: 120, justifyContent: "center", position: "absolute", right: 275, top: 90, transform: "rotate(-8deg)", width: 120 }}>À TABLE !</div>
    </div>,
    size,
  );
}
