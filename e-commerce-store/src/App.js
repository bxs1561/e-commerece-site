import React from "react"
import './App.css';
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductCheckout from "./components/ProductCheckout";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Login from "./components/Login";
import Register from "./components/Register";


const stripePromise = loadStripe("")
function App() {
  return (
    <div className="App">
      <Header/>
      {/*<ProductList/>*/}
      {/*<Checkout/>*/}
      {/*  <Elements stripe={stripePromise}>*/}
      {/*      <Payment/>*/}
      {/*  </Elements>*/}
      {/*<Login/>*/}
      <Register/>



    </div>

  );
}

export default App;
