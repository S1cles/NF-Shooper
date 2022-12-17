import React, { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyButton from "./../components/MyButton";
import { Box } from "@mui/material";
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Cart} from "../components/CartProvider";



const Product = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, product: action.payload, loading: false };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  const { state, dispatch: ctxDispatch } = useContext(Cart);
  const {cart}= state
  const addToCart = async()=> {
    const existItem = cart.cartItems.find((x)=>x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`)
    if ( data.countInStoke < quantity ){
      window.alert('Sorry product out of stock')
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  }

  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      // setProducts(result.data);
    };
    fetch();
  }, [slug]);

  console.log(product);

  return ( loading ? (
    <Loader/>
  ) : error ? (
    <Message err = {error}/>
  ) : (
    <div>
      <h3 className="text-center">{product.name}</h3>
      <div className="flex justify-center">
        <Box className="bg-gradient-to-r from-indigo-500 rounded-3xl ">
          <img
            style={{ maxHeight: "780px", opacity: "1" , padding:'30px' }}
            src={product.image}
            alt={product.slug}
          />
        </Box>

        <Box
          sx={{ "& > :not(style)": { m: 1 } }}
          className="navigation items-center flex flex-col text-center justify-center bg-gradient-to-r from-transparent to-indigo-500 rounded-3xl"
          style={{ maxWidth: "30vw" }}
        >
          <h4>{product.description}</h4>
          <div className="flex">
          <h5 className=" mt-8">Category: {product.category}</h5>
          <h5 className=" ml-4 mt-8"> <b> {product.countInStoke > 0 ? <div className="text-lime-500">Status: Avilable</div> : <div  className="text-red-600">Status: Not avilable</div>}</b></h5>
          </div>

          <h4>Price: {product.price}$</h4>

          <MyButton btn={addToCart}>Add to cart</MyButton>
        </Box>
      </div>
    </div>
  ) 
  )
};

export default Product;
