import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import About from "./routes/About";
import Layout from "./components/Layout";
import Listings from "./routes/Listings";
import ListingDetails from "./routes/ListingDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="listings" element={<Listings />} />
          <Route path="listings/:id" element={<ListingDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
