import { Link } from "react-router-dom";

const SideBySide = ({
  heading,
  subheading,
  body,
  imageSrc,
  imageAlt,
  ctaText,
  ctaLink,
  reverse = false,
  backgroundClass = "bg-base-100",
}) => {
  return (
    <section className={`w-full ${backgroundClass} py-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex flex-col-reverse items-center gap-16 md:flex-row ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Text */}
          <div className="w-full md:w-1/2">
            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {heading}
            </h2>
            {subheading && (
              <h3 className="mb-6 text-xl font-medium text-blue-500">
                {subheading}
              </h3>
            )}
            <p className="mb-8 text-lg leading-relaxed text-gray-600">{body}</p>
            {ctaText && ctaLink && (
              <Link
                to={ctaLink}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                {ctaText}
              </Link>
            )}
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={imageSrc}
                alt={imageAlt || heading}
                className="w-full h-auto transition-all duration-300 hover:shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBySide;
