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

export default function App() {
  const [allProperties, setAllProperties] = useState([]);
  const [property, setProperty] = useState("");
  const [filters, setFilters] = useState({
    minBedrooms: "",
    minBathrooms: "",
    minSquareFootage: "",
  });
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/properties");
        const data = await res.json();
        setAllProperties(data);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      }
    };
    fetchData();
  }, []);

  // Filter logic
  const handleFilter = (filterVals) => setFilters(filterVals);
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route
              path="properties"
              element={
                <PropertyListings
                  properties={filtered}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  onFilter={handleFilter}
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
                  properties={filtered.filter((p) => favorites.includes(p.id))}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  onFilter={handleFilter}
                />
              }
            />
          </Route>
          <Route path={<AdminRoute />}>
            <Route path="admin">
              <Route
                path="properties/new"
                element={<PropertyForm mode="create" />}
              />
              <Route
                path="properties/:id/edit"
                element={<PropertyForm mode="edit" initValues={property} />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
