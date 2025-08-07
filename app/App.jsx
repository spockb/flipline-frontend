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
                properties={allProperties.filter((p) =>
                  favorites.includes(p.id)
                )}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="properties"
            element={
              <PropertyListings
                properties={allProperties}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="properties/:id" element={<PropertyDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
