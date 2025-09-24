import Filter from "./Filter.jsx";
import PropertyCard from "./PropertyCard.jsx";
import { useFavorites } from "../../fav-context.jsx";
import Pagination from "./Pagination.jsx";

const PropertyListings = ({
  properties = [],
  onFilter,
  onPageChange,
  pagination = null,
}) => {
  const { has, toggle } = useFavorites();
  const { currentPage = 1, totalPages = 1 } = pagination || {};

  return (
    <div className="p-4">
      <Filter onFilter={onFilter} />
      {properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorited={has(property.id)}
                onFavoriteClick={() => toggle(property.id)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </>
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
