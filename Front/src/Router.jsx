import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import Layout from "./Layout.jsx";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile.jsx";
import Sellers from "./pages/Sellers.jsx";
import Home from "./pages/Home";
import Product from './pages/Product';
import NF from './pages/NF.jsx'
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="*" element={<NF />} />
      </Route>
    </Routes>
  );
}

export default Router;
