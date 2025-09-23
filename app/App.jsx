import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./routes/Home";
import About from "./routes/About";
import Layout from "./components/Layout";
import PropertyDetails from "./routes/PropertyDetails";
import PropertyListings from "./components/PropertyListings/PropertyListings";
import PropertyForm from "./components/PropertyForm";
import Login from "./routes/Login";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import SignUp from "./routes/SignUp";
import { useAuth } from "./auth-context";
import { useFavorites } from "./fav-context";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  const { user, ready } = useAuth();
  const { favIds } = useFavorites();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [favoritesCurrentPage, setFavoritesCurrentPage] = useState(1);
  const [favoritesItemsPerPage] = useState(6);

  // Properties and filters
  const [allProperties, setAllProperties] = useState([]);
  const [property, setProperty] = useState("");
  const [filters, setFilters] = useState({
    minBedrooms: "",
    minBathrooms: "",
    minSquareFootage: "",
  });

  const [favoritesFilters, setFavoritesFilters] = useState({
    minBedrooms: "",
    minBathrooms: "",
    minSquareFootage: "",
  });

  // Fetch Data
  useEffect(() => {
    if (!ready) return;

    if (user) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL || ""}/api/properties`,
            {
              credentials: "include",
              cache: "no-store",
            }
          );
          const data = await res.json();
          setAllProperties(data);
        } catch (err) {
          console.error("Failed to fetch properties:", err);
        }
      };
      fetchData();
    } else {
      setAllProperties([]);
    }
  }, [user, ready]);

  // Filter logic
  const handleFilter = (filterVals) => {
    setFilters(filterVals);
    setCurrentPage(1);
  };

  const handleFavoritesFilter = (filterVals) => {
    setFavoritesFilters(filterVals);
    setFavoritesCurrentPage(1);
  };

  const minBeds = Number(filters.minBedrooms) || 0;
  const minBaths = Number(filters.minBathrooms) || 0;
  const minSqft = Number(filters.minSquareFootage) || 0;

  const filtered = allProperties.filter((p) => {
    return (
      Number(p.bedrooms) >= minBeds &&
      Number(p.bathrooms) >= minBaths &&
      Number(p.squareFootage) >= minSqft
    );
  });

  const favoritesMinBeds = Number(favoritesFilters.minBedrooms) || 0;
  const favoritesMinBaths = Number(favoritesFilters.minBathrooms) || 0;
  const favoritesMinSqft = Number(favoritesFilters.minSquareFootage) || 0;

  const allFavorites = allProperties.filter((p) => favIds.has(p.id));
  const filteredFavorites = allFavorites.filter((p) => {
    return (
      Number(p.bedrooms) >= favoritesMinBeds &&
      Number(p.bathrooms) >= favoritesMinBaths &&
      Number(p.squareFootage) >= favoritesMinSqft
    );
  });

  // Pagination calcs
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filtered.slice(firstItemIndex, lastItemIndex);

  const favoritesTotalItems = filteredFavorites.length;
  const favoritesTotalPages = Math.ceil(
    favoritesTotalItems / favoritesItemsPerPage
  );
  const favoritesStartIndex =
    (favoritesCurrentPage - 1) * favoritesItemsPerPage;
  const favoritesEndIndex = favoritesStartIndex + favoritesItemsPerPage;
  const currentFavoritesItems = filteredFavorites.slice(
    favoritesStartIndex,
    favoritesEndIndex
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFavoritesPageChange = (page) => {
    setFavoritesCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route element={<PrivateRoute />}>
              <Route
                path="properties"
                element={
                  <PropertyListings
                    properties={currentItems}
                    onFilter={handleFilter}
                    onPageChange={handlePageChange}
                    pagination={{
                      currentPage,
                      itemsPerPage,
                      totalItems,
                      totalPages,
                    }}
                  />
                }
              />
              <Route
                path="properties/:id"
                element={
                  <PropertyDetails
                    allProperties={allProperties}
                    setAllProperties={setAllProperties}
                    property={property}
                    setProperty={setProperty}
                  />
                }
              />
              <Route
                path="favorites"
                element={
                  <PropertyListings
                    properties={currentFavoritesItems}
                    onFilter={handleFavoritesFilter}
                    onPageChange={handleFavoritesPageChange}
                    pagination={{
                      currentPage: favoritesCurrentPage,
                      itemsPerPage: favoritesItemsPerPage,
                      totalItems: favoritesTotalItems,
                      totalPages: favoritesTotalPages,
                    }}
                  />
                }
              />

              <Route path="admin" element={<AdminRoute />}>
                <Route
                  path="properties/new"
                  element={
                    <PropertyForm
                      mode="create"
                      setAllProperties={setAllProperties}
                      allProperties={allProperties}
                    />
                  }
                />
                <Route
                  path="properties/:id/edit"
                  element={
                    <PropertyForm
                      mode="edit"
                      initValues={property}
                      setAllProperties={setAllProperties}
                      allProperties={allProperties}
                    />
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}
