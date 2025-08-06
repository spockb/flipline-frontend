import Button from "./Button";
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
  backgroundClass = "bg-primary-50",
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
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{heading}</h2>
          {subheading && (
            <h3 className="mb-4 text-xl font-semibold text-primary-500">
              {subheading}
            </h3>
          )}
          <p className="mb-6 leading-relaxed text-gray-700">{body}</p>
          {ctaText && ctaLink && (
            <Link to={ctaLink}>
              <Button>{ctaText}</Button>
            </Link>
          )}
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imageSrc}
            alt={imageAlt || heading}
            className="w-full h-auto shadow-md rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default SideBySide;
