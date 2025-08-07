import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./routes/Home";
import About from "./routes/About";
import Layout from "./components/Layout";
import PropertyDetails from "./routes/PropertyDetails";
import PropertyListings from "./components/PropertyListings/PropertyListings";

export default function App() {
  const [allProperties, setAllProperties] = useState("");
  const [filteredProperties, setFilteredProperties] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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

  const handleFilter = (filterValues) => {
    const { minBedrooms, minBathrooms, minSquareFootage } = filterValues;
    const filtered = allProperties.filter((property) => {
      if (
        property.bedrooms >= minBedrooms &&
        property.bathrooms >= minBathrooms &&
        property.squareFootage >= minSquareFootage
      ) {
        return property;
      }
    });
    setFilteredProperties(filtered);
  };

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
                properties={filteredProperties}
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
                properties={filteredProperties.filter((p) =>
                  favorites.includes(p.id)
                )}
                favorites={favorites}
                setFavorites={setFavorites}
                onFilter={handleFilter}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
