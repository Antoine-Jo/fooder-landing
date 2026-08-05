import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fooder",
    short_name: "Fooder",
    description: "Trouvez le restaurant qui vous met enfin d'accord.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F0E7",
    theme_color: "#6B3A64",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
