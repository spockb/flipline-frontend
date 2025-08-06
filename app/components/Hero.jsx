import { Link } from "react-router-dom";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-6xl px-6 py-24 mx-auto text-center">
        <p className="mb-4 text-sm font-medium tracking-widest uppercase text-primary-500">
          Exclusive Deals. Zero Noise.
        </p>

        <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          LA's Best Flip Opportunities
          <br />
          Curated for Investors
        </h1>

        <p className="max-w-2xl mx-auto mb-8 text-base text-gray-600 md:text-xl md:leading-relaxed">
          Get access to high-ROI single-family homes in Los Angeles, handpicked
          for their flip potential. No endless browsing—just the best
          opportunities sourced by a licensed agent who works exclusively with
          serious investors.
        </p>

        <div className="flex justify-center">
          <Link to="/properties">
            <Button size="lg" variant="fill">
              View Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
