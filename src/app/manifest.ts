import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TermDX: Sharp tools for sharp developers",
    short_name: "TermDX",
    description:
      "Terminal-native developer tools. No Electron wrappers, no context switching, no leaving the command line.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf8",
    theme_color: "#fafaf8",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
