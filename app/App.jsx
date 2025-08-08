import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./routes/Home";
import About from "./routes/About";
import Layout from "./components/Layout";
import PropertyDetails from "./routes/PropertyDetails";
import PropertyListings from "./components/PropertyListings/PropertyListings";
import AdminLayout from "./routes/admin/AdminLayout";
import CreateProperty from "./routes/admin/CreateProperty";
import EditProperty from "./routes/admin/EditProperty";

export default function App() {
  const [allProperties, setAllProperties] = useState([]);
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

  // Property Form

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
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
          <Route path="properties/:id" element={<PropertyDetails />} />
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
          <Route path="admin" element={<AdminLayout />}>
            <Route path="properties/new" element={<CreateProperty />} />
            <Route path="properties/:id/edit" element={<EditProperty />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
