import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { properties } from "./assets/properties";

import Home from "./routes/Home";
import About from "./routes/About";
import Layout from "./components/Layout";
import Listings from "./routes/Listings";
import PropertyDetails from "./routes/PropertyDetails";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import PropertyListings from "./components/PropertyListings/PropertyListings";

export default function App() {
  const [allProperties, setAllProperties] = useState(properties.listings);
  const [filteredProperties, setFilteredProperties] = useState(
    properties.listings
  );
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
