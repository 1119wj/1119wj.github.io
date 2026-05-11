import { Hero } from "@/components/Hero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      <Hero />
    </>
  );
}
