import { Link } from "react-router-dom";
import { useAuth } from "../auth-context";

const Hero = ({ topper, heading, subheading, body }) => {
  const { user } = useAuth();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-medium tracking-wider uppercase text-blue-500">
            {topper}
          </p>

          <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            {heading}
            <br />
            <span className="text-blue-500">{subheading}</span>
          </h1>

          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            {body}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={user ? "/properties" : "/login"}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              {user ? "View Properties" : "Log in to View Properties"}
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-900 bg-white border-2 border-gray-900 rounded-lg shadow-sm hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
