import LandingHero from "@/components/LandingHero";
import TrustStrip from "@/components/TrustStrip";
import ProblemSolving from "@/components/ProblemSolving";
import ServicesGrid from "@/components/ServicesGrid";
import SuccessStories from "@/components/SuccessStories";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LandingHero />
      <TrustStrip />
      <ProblemSolving />
      <ServicesGrid />
      <SuccessStories />
      <FinalCTA />
    </main>
  );
}
