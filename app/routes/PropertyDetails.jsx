import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { properties } from "../assets/properties";
import Badge from "../components/Badge";

export default function PropertyDetails() {
  const params = useParams();
  const [property, setProperty] = useState("");

  useEffect(() => {
    const propertyMatch = properties.listings.filter(
      (item) => params.id === item.id
    );
    setProperty(propertyMatch[0]);
  }, [params.id]);

  function formatPrice(cost) {
    return Number(cost).toLocaleString("en-US");
  }

  const {
    id,
    address,
    location,
    images,
    yearBuilt,
    cost,
    squareFootage,
    bedrooms,
    bathrooms,
    valuedAt,
    bio,
    lotSize,
  } = property;

  return (
    <div className="max-w-6xl px-4 mx-auto my-10">
      {/* Hero Image */}
      <div className="w-full h-[400px] overflow-hidden rounded-xl mb-8">
        <img
          src={images?.[0]}
          alt={`Property at ${address}`}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Address and Location */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{address}</h1>
        <p className="text-lg text-gray-600">{location}</p>
      </div>

      {/* Price and Valuation */}
      <div className="flex items-center gap-6 mb-6">
        <p className="text-2xl font-semibold text-primary-600">
          ${formatPrice(cost)}
        </p>
        <p className="text-gray-500 text-md">
          Valued at:{" "}
          <span className="font-medium text-gray-800">
            ${formatPrice(valuedAt)}
          </span>
        </p>
      </div>

      {/* Stats Badges */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Badge type="bed">{bedrooms} Bed</Badge>
        <Badge type="bath">{bathrooms} Bath</Badge>
        <Badge type="sqf">{formatPrice(squareFootage)} SqFt</Badge>
        {lotSize && <Badge type="lot">{lotSize} acres</Badge>}
        {yearBuilt && <Badge type="year">Built {yearBuilt}</Badge>}
      </div>

      {/* Description */}
      <div className="mb-12">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          About this property
        </h2>
        <p className="leading-relaxed text-gray-700">{bio}</p>
      </div>

      {/* Gallery (if more images) */}
      {images?.length > 1 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.slice(1).map((img, idx) => (
            <div key={idx} className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`Property image ${idx + 2}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
