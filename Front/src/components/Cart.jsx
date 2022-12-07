import { createContext } from "react";
import { useReducer } from "react";

const initialState = {
  cart: {
    cartItems:[],
  }
}

const reducer = (state, action) =>{
switch (action.type) {
  case 'CART_ADD_ITEM':
    return {...state, cart: {...state.cart, cartItems:[...state.cart.cartItems, action.payload]}}
    

  default: return state;
    
}
}

export const Cart = createContext();


export function CartProvider(props) {
  const [state, dispatch]= useReducer(reducer , initialState);
  const value = {state , dispatch}
  return <Cart.Provider value={value}> {props.children}</Cart.Provider> 
}