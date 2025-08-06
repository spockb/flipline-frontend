import { properties } from "../assets/properties.js";
import PropertyCard from "../components/PropertyCard";

const propertyListings = properties.listings.map((property) => {
  return <PropertyCard key={property.id}></PropertyCard>;
});

export default function PropertyListings() {
  return <div className="flex gap-8">{propertyListings}</div>;
}
