import { Link } from "react-router-dom";
import { useAuth } from "../auth-context";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="bg-base-200">
      <div className="max-w-6xl px-6 py-24 mx-auto text-center">
        <p className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary">
          Exclusive Deals. Zero Noise.
        </p>

        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-base-content md:text-5xl">
          LA's Best Flip Opportunities
          <br />
          Curated for Investors
        </h1>

        <p className="max-w-2xl mx-auto mb-8 text-base text-base-content/70 md:text-xl md:leading-relaxed">
          Get access to high-ROI single-family homes in Los Angeles, handpicked
          for their flip potential. No endless browsing—just the best
          opportunities sourced by a licensed agent who works exclusively with
          serious investors.
        </p>

        <div className="flex justify-center">
          <Link
            to={user ? "/properties" : "/login"}
            className="btn btn-primary btn-lg"
          >
            {user ? "View Properties" : "Log in to View Properties"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
