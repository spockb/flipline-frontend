import { properties } from "../assets/properties.js";
import PropertyCard from "../components/PropertyCard";

const propertyListings = properties.listings.map((property) => {
  return (
    <PropertyCard
      key={property.id}
      id={property.id}
      img={property.images[0]}
      location={property.location}
      cost={property.cost}
      address={property.address}
      bed={property.bedrooms}
      bath={property.bathrooms}
      sqf={property.squareFootage}
    />
  );
});

export default function PropertyListings() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
      {propertyListings}
    </div>
  );
}
