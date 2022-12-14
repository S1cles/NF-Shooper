import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Router from './Router';
import { CartProvider } from './components/CartProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);

