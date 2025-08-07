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
    <>
      <Filter onFilter={onFilter} />
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              property={property}
              isFavorited={favorites.includes(property.id)}
              onFavoriteClick={() => handleFavoritesClick(property.id)}
            />
          ))}
        </div>
      ) : (
        <p>No properties found</p>
      )}
    </>
  );
};

export default PropertyListings;
