import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import Layout from "./Layout.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import Sellers from "./pages/Sellers.jsx";
import Home from "./pages//Home.jsx";
import Product from './pages/Product';
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/product/:slug" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default Router;
