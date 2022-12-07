import React, { useState, useEffect, useReducer, useContext } from "react";
// import data from "../data/products.js";
import axios from "axios";
import "../scss/Home.scss";
import MyButton from "../components/MyButton";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import logger from "use-reducer-logger";
import { Rating } from "@mui/material";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Cart } from "../components/Cart";

const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  const { state, dispatch: ctxDispatch } = useContext(Cart);
  function addToCart() {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...products, quantity: 1 },
    });
  }
  // const addCart =(product)=>{

  //   dispatch({type: 'ADD_PRODUCT'})
  // }

  // const [products, setProducts] = useState([]);
  function reducer(state, action) {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, products: action.payload, loading: false };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }
  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetch();
    console.log(products);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container">
        <div className=" flex justify-start items-center font-bold ">
          <h3 className="text-animation"> Our Products</h3>
          <Search />
        </div>

        <div className="products flex">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message err={error} />
          ) : (
            products.map((product, index) => (
              <div className="product_item" key={index}>
                <Link to={`/product/${product.slug}`}>
                  <img
                    className=" p-2 "
                    src={product.image}
                    alt={product.slug}
                  />
                </Link>
                <div className=" text-center">
                  <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </Link>

                  <Rating
                    name="customized-color"
                    defaultValue={product.rating}
                    style={{ color: "#5200FF" }}
                  />

                  <p>
                    <strong>Price ${product.price}</strong>
                  </p>
                  <MyButton btn={addToCart}>Add to cart</MyButton>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
