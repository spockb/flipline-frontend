import Hero from "../components/Hero";
import SideBySide from "../components/SideBySide";

const Home = () => {
  return (
    <>
      <Hero />
      <SideBySide
        heading="Handpicked. High ROI. No Guesswork."
        subheading="We don't send every listing. Just the ones that make sense."
        body="Our team filters through hundreds of properties across LA each week. You get only the homes with real flip potential — solid comps, realistic rehab scope, and high resale value. Every deal is vetted by an agent who works exclusively with investors and understands your bottom line."
        imageSrc="/images/1/exterior.webp"
        imageAlt="Modern LA home ready for flip"
        ctaText="View Our Properties"
        ctaLink="/properties"
        reverse={true}
      />
      <SideBySide
        heading="Expert Support from Start to Sale"
        subheading="Investor-focused agent. Hands-on guidance."
        body="From acquisition to close, you'll have a licensed agent in your corner who specializes in flips. We walk every property, help estimate rehab, run comps, and guide you through offers, inspections, and resale strategy — all aligned with your ROI goals."
        imageSrc="/images/10/exterior.webp"
        imageAlt="Modern LA home ready for flip"
        ctaText="About Us"
        ctaLink="/about"
      />
    </>
  );
};

export default Home;
