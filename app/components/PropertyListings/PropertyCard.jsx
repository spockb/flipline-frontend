import Badge from "../Badge";
import { Link } from "react-router-dom";
import { MdStarBorder, MdStar } from "react-icons/md";

export default function PropertyCard({
  property,
  isFavorited,
  onFavoriteClick,
}) {
  function formatPrice(cost) {
    return Number(cost).toLocaleString("en-US");
  }

  const {
    id,
    images,
    location,
    cost,
    address,
    bedrooms,
    bathrooms,
    squareFootage,
  } = property;

  return (
    <div
      key={id}
      className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
    >
      <button
        onClick={onFavoriteClick}
        className="absolute z-10 top-4 right-4 btn btn-circle"
      >
        {isFavorited ? (
          <MdStar size="1.5rem" />
        ) : (
          <MdStarBorder size="1.5rem" />
        )}
      </button>
      <Link to={`/properties/${id}`}>
        <div className="w-full overflow-hidden h-60">
          <img
            src={images[0]}
            alt="house"
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">{location}</p>
            <p className="text-xl font-bold text-primary-600">
              ${formatPrice(cost)}
            </p>
          </div>

          <h3 className="mb-4 text-lg font-semibold leading-tight text-gray-900">
            {address}
          </h3>

          <div className="flex gap-3">
            <Badge type="bed">{bedrooms} Bed</Badge>
            <Badge type="bath">{bathrooms} Bath</Badge>
            <Badge type="sqf">{formatPrice(squareFootage)}ft²</Badge>
          </div>
        </div>
      </Link>
    </div>
  );
}
