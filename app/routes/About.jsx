import SideBySide from "../components/SideBySide";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import { useAuth } from "../auth-context";

const About = () => {
  const { user } = useAuth();
  return (
    <div>
      {/* Hero Section */}
      <section className="w-full px-4 py-24 bg-base-100">
        <div className="container mx-auto text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary">
            About FlipLine
          </p>
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-base-content md:text-5xl">
            Your Trusted Partner in
            <br />
            Real Estate Investment
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-base text-base-content/70 md:text-xl md:leading-relaxed">
            We specialize in connecting serious investors with high-potential
            flip opportunities in Los Angeles. Our curated approach ensures you
            only see properties that meet our strict investment criteria.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <SideBySide
        heading="Our Story"
        subheading="Built by Investors, for Investors"
        body="FlipLine was born from a simple observation: too many investors waste time sifting through endless listings of mediocre properties. As experienced real estate professionals and investors ourselves, we knew there had to be a better way. We created FlipLine to provide curated, high-potential investment opportunities that serious investors can trust and act on quickly."
        imageSrc="/images/5/exterior.webp"
        imageAlt="Modern real estate investment property"
        ctaText="View Our Properties"
        ctaLink="/properties"
        backgroundClass="bg-base-200"
      />

      {/* Our Mission Section */}
      <SideBySide
        heading="Our Mission"
        subheading="Quality Over Quantity"
        body="We believe that successful real estate investing isn't about seeing the most properties—it's about seeing the RIGHT properties. Our mission is to save you time and maximize your returns by pre-screening every listing for flip potential, location desirability, and investment viability. Every property on our platform has been carefully evaluated by licensed professionals who understand what makes a property worth your investment."
        imageSrc="/images/2/exterior.webp"
        imageAlt="Professional real estate evaluation"
        reverse={true}
        backgroundClass="bg-base-100"
      />

      {/* Our Process Section */}
      <SideBySide
        heading="Our Process"
        subheading="Rigorous Selection Standards"
        body="Every property on FlipLine goes through our comprehensive evaluation process. We analyze market trends, neighborhood growth potential, renovation costs, and comparable sales to ensure each listing meets our high standards. Our team of licensed real estate agents and investment specialists personally visit and assess each property before it appears on our platform. This hands-on approach means you can trust that every listing is a genuine opportunity worth your consideration."
        imageSrc="/images/3/exterior.webp"
        imageAlt="Real estate evaluation process"
        ctaText="Learn More"
        ctaLink="/properties"
        backgroundClass="bg-base-200"
      />

      {/* FAQ Section */}
      <FAQ
        imageSrc="/images/1/exterior.webp"
        imageAlt="Frequently asked questions about real estate investing"
        reverse={false}
      />

      {/* CTA Section */}
      {!user && <CTA />}
    </div>
  );
};

export default About;
