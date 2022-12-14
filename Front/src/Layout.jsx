import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./scss/Layout.scss";
import OtherHousesTwoToneIcon from "@mui/icons-material/OtherHousesTwoTone";
import LocalMallTwoToneIcon from "@mui/icons-material/LocalMallTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SellTwoToneIcon from "@mui/icons-material/SellTwoTone";
import Fab from "@mui/material/Fab";
import { Cart } from "./components/CartProvider";


// import SearchIcon from '@mui/material/Icon/Icon';

const Layout = () => {
  const shouldRedirect = <NavLink to="/" />;
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/home");
    }
  }, []);

  const fabStyle = {
    position: "fixed",
    bottom: "50%",
    right: 16,
  };

  
  const { state } = useContext(Cart);
  const {cart }= state

  return (
    <div className="bg">
      <div className="header_container">
        <NavLink to="/home" className="logo_container flex items-center m-4">
          <img className="logo" src={logo} alt="logo" />
          <h4 className="logo_text">Shoopper</h4>
        </NavLink>

        <nav>
          <NavLink to="/home">
            {" "}
            <OtherHousesTwoToneIcon sx={{ fontSize: 40 }} />{" "}
          </NavLink>
          <NavLink to="/sellers">
            <SellTwoToneIcon sx={{ fontSize: 40 }} />
          </NavLink>
          <NavLink to="/profile">
            <AccountCircleTwoToneIcon sx={{ fontSize: 40 }} />
          </NavLink>
        </nav>
      </div>

      <div className="content">
        <Outlet />
        <NavLink to="/cart">
          <Fab size="large" style={fabStyle} color="secondary" aria-label="add">
            <LocalMallTwoToneIcon sx={{ fontSize: 35 }} />
          </Fab>
          <Fab className="dn" size="small" style={{ color:'black',background:'#ff5858', position:"fixed",bottom: "45%",right: '25px', display: (cart.cartItems<=0)? 'none' : 'block' }}  color="secondary" aria-label="add">
            {cart.cartItems.reduce((a,c)=> a + c.quantity ,0)}
          </Fab>
        </NavLink>
      </div>
    </div>
  );
};

export default Layout;
