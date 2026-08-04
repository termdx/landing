import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

// Toggle from the design's `showServices` prop. Off also drops the nav's
// #services anchor, so flip both if this ever changes.
const SHOW_SERVICES = true;

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Products />
      {SHOW_SERVICES && <Services />}
      <Newsletter />
      <Footer />
    </>
  );
}
