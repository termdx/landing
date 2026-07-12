import type { ReactNode } from "react";

export type Product = {
  name: string;
  stars?: number;
  badge: string;
  description: ReactNode;
  repoLabel: string;
  repoUrl: string;
  /** GitHub social-preview (Open Graph) image for the repo. */
  ogImage: string;
};

export const products: Product[] = [
  {
    name: "piper",
    stars: 22,
    badge: "TypeScript",
    description:
      "Never leave your terminal to test your API again. Postman can keep the mouse.",
    repoLabel: "→ github.com/termdx/piper",
    repoUrl: "https://github.com/termdx/piper",
    ogImage:
      "https://repository-images.githubusercontent.com/1026284063/4ba3053b-39af-49ff-b45b-cc689dc4b830",
  },
  {
    name: "codrop",
    badge: "Rust · MIT",
    description: (
      <>
        A Dropbox for devs: code, environments, and .envs auto-synced across
        every machine.{" "}
        <span className="font-mono text-[13.5px]">git pull</span> is now
        decorative.
      </>
    ),
    repoLabel: "→ github.com/termdx/Codrop",
    repoUrl: "https://github.com/termdx/Codrop",
    ogImage:
      "https://repository-images.githubusercontent.com/1281539138/e503672e-6acc-4a45-b031-7f3a3d05a3b5",
  },
];
