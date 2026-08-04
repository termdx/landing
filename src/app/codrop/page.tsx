import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import ProductPage from "@/components/ProductPage";
import { getProduct, productMetadata } from "@/lib/products";

const product = getProduct("codrop");

// IBM Plex Sans: the systems-software voice, and a sibling of the mono family
// this whole site already speaks in — right for a daemon that runs where
// nobody is looking. 500/700 only; those are the weights the template uses.
const display = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = productMetadata(product);

export default function CodropPage() {
  return <ProductPage product={product} displayFont={display.className} />;
}
