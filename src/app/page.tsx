import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

// Toggle from the design's `showServices` prop.
const SHOW_SERVICES = true;

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Products />
      {SHOW_SERVICES && <Services />}
      <Footer />
    </>
  );
}
