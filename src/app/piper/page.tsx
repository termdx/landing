import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import ProductPage from "@/components/ProductPage";
import { getProduct, productMetadata } from "@/lib/products";

const product = getProduct("piper");

// Space Grotesk: flat terminals and a near-monospaced rhythm, so headings read
// as a continuation of the command line rather than a marketing voice. Only
// 500 and 700 are loaded — those are the only weight utilities the template
// applies, and an unlisted weight would come back synthesised.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = productMetadata(product);

export default function PiperPage() {
  return <ProductPage product={product} displayFont={display.className} />;
}
