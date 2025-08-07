import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Badge from "../components/Badge";

export default function PropertyDetails() {
  const params = useParams();
  const [property, setProperty] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/properties/${params.id}`
        );
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error("Failed to fetch property details:", err);
      }
    };
    fetchData();
  }, [params.id]);

  function formatNum(val) {
    return (val ?? 0).toLocaleString("en-US");
  }

  const {
    id,
    address,
    city,
    state,
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
        <h1 className="text-3xl font-bold text-base-content">{address}</h1>
        <p className="text-lg text-neutral">
          {city}, {state}
        </p>
      </div>

      {/* Price and Valuation */}
      <div className="flex flex-wrap items-center gap-6 mb-6">
        <p className="text-2xl font-bold text-primary">${formatNum(cost)}</p>
        <p className="text-md text-neutral">
          Valued at:{" "}
          <span className="font-medium text-base-content">
            ${formatNum(valuedAt)}
          </span>
        </p>
      </div>

      {/* Stats Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Badge type="bed">{bedrooms} Bed</Badge>
        <Badge type="bath">{bathrooms} Bath</Badge>
        <Badge type="sqf">{formatNum(squareFootage)}ft²</Badge>
        {lotSize && <Badge type="lot">{lotSize} acres</Badge>}
        {yearBuilt && <Badge type="year">Built {yearBuilt}</Badge>}
      </div>

      {/* Description */}
      <div className="mb-12">
        <h2 className="mb-2 text-xl font-semibold text-base-content">
          About this property
        </h2>
        <p className="leading-relaxed text-base-content">{bio}</p>
      </div>

      {/* Gallery (if more images) */}
      {images?.length > 1 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.slice(1).map((img, idx) => (
            <div key={idx} className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`Property image ${idx + 2}`}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
