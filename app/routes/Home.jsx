import Hero from "../components/Hero";
import SideBySide from "../components/SideBySide";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import { useAuth } from "../auth-context";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Hero
        topper="Exclusive Deals. Zero Noise."
        heading="LA's Best Flip Opportunities"
        subheading="Curated for Investors"
        body="Get access to high-ROI single-family homes in Los Angeles, handpicked for their flip potential. No endless browsing—just the best opportunities sourced by a licensed agent who works exclusively with serious investors."
      />
      <SideBySide
        heading="Handpicked. High ROI. No Guesswork."
        subheading="We don't send every listing. Just the ones that make sense."
        body="Our team filters through hundreds of properties across LA each week. You get only the homes with real flip potential — solid comps, realistic rehab scope, and high resale value. Every deal is vetted by an agent who works exclusively with investors and understands your bottom line."
        imageSrc="/images/10/exterior.webp"
        imageAlt="Modern LA home ready for flip"
        ctaText={user ? "View Our Properties" : "Log in to View Properties"}
        ctaLink="/properties"
        reverse={true}
      />
      <SideBySide
        heading="Expert Support from Start to Sale"
        subheading="Investor-focused agent. Hands-on guidance."
        body="From acquisition to close, you'll have a licensed agent in your corner who specializes in flips. We walk every property, help estimate rehab, run comps, and guide you through offers, inspections, and resale strategy — all aligned with your ROI goals."
        imageSrc="/images/2/exterior.webp"
        imageAlt="Modern LA home ready for flip"
        ctaText="About Us"
        ctaLink="/about"
      />
      <FAQ imageSrc="/images/1/exterior.webp" imageAlt="Modern LA Home" />
      {!user && <CTA />}
    </>
  );
};

export default Home;
