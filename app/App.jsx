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

export default function App() {
  const { user, ready } = useAuth();
  const { favIds } = useFavorites();
  const [allProperties, setAllProperties] = useState([]);
  const [property, setProperty] = useState("");
  const [filters, setFilters] = useState({
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
            `${
              import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
            }/api/properties`,
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

  const favorites = filtered.filter((p) => favIds.has(p.id));

  // DEBUG
  // in a module that runs on load (e.g., main.jsx)
  window.__API_BASE__ = import.meta.env.VITE_API_URL;
  console.log("[debug] __API_BASE__ =", window.__API_BASE__);

  return (
    <BrowserRouter>
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
                  properties={filtered}
                  // favorites={favorites}
                  // setFavorites={setFavorites}
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
                  properties={favorites}
                  onFilter={handleFilter}
                />
              }
            />

            <Route path="admin" element={<AdminRoute />}>
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
