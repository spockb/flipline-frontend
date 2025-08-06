import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import About from "./routes/About";
import Layout from "./components/Layout";
import PropertyListings from "./routes/PropertyListings";
import PropertyDetails from "./routes/PropertyDetails";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="properties" element={<PropertyListings />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
