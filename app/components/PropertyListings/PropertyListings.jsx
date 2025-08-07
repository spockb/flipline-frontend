import { useState, useEffect } from "react";
import { properties } from "../../assets/properties.js";
import PropertyCard from "./PropertyCard.jsx";
import Filter from "./Filter.jsx";

const PropertyListings = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavoritesClick = (propertyId) => {
    const isFavorited = favorites.includes(propertyId);
    const updatedFavorites = isFavorited
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
      {filteredProperties.listings.map((property) => {
        return (
          <PropertyCard
            id={property.id}
            property={property}
            isFavorited={favorites.includes(property.id)}
            onFavoriteClick={() => {
              handleFavoritesClick(property.id);
            }}
          />
        );
      })}
    </div>
  );
};

export default PropertyListings;
