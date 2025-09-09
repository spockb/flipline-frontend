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
    <section className={`w-full ${backgroundClass} py-16 px-4`}>
      <div
        className={`container mx-auto flex flex-col-reverse items-center gap-12 md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Text */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <h2 className="mb-4 text-3xl font-bold text-base-content">
            {heading}
          </h2>
          {subheading && (
            <h3 className="mb-4 text-xl font-semibold text-primary">
              {subheading}
            </h3>
          )}
          <p className="mb-6 leading-relaxed text-base-content/70">{body}</p>
          {ctaText && ctaLink && (
            <Link to={ctaLink} className="btn btn-primary">
              {ctaText}
            </Link>
          )}
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imageSrc}
            alt={imageAlt || heading}
            className="w-full h-auto shadow rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default SideBySide;
