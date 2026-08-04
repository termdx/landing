import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import ProductPage from "@/components/ProductPage";
import { getProduct, productMetadata } from "@/lib/products";

// The route stays capital-R: it is the canonical URL in the metadata below,
// and src/proxy.ts 308s the lowercase alias to it.
const product = getProduct("Relay");

// Manrope: rounder and softer than the CLI pages' grotesques — Relay is the
// product a client sees, not just the one you run. 500/700 only; those are the
// weights the template uses.
const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = productMetadata(product);

export default function RelayPage() {
  return <ProductPage product={product} displayFont={display.className} />;
}
