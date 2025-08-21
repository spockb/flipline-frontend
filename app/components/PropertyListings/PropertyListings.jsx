import Filter from "./Filter.jsx";
import PropertyCard from "./PropertyCard.jsx";

const PropertyListings = ({
  properties,
  favorites,
  setFavorites,
  onFilter,
}) => {
  const handleFavoritesClick = (propertyId) => {
    const isFavorited = favorites.includes(propertyId);
    const updatedFavorites = isFavorited
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="p-4">
      <Filter onFilter={onFilter} />
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorited={favorites.includes(property.id)}
              onFavoriteClick={() => handleFavoritesClick(property.id)}
            />
          ))}
        </div>
      ) : (
        <p className="p-4 text-sm text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-md">
          No properties match your current filters. Try adjusting the search
          criteria to see more results.
        </p>
      )}
    </div>
  );
};

export default PropertyListings;
