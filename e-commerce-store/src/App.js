import React from "react"
import './App.css';
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductCheckout from "./components/ProductCheckout";
import Checkout from "./components/Checkout";

function App({id, image,title,price,rating, hideButton}) {
  return (
    <div className="App">
      <Header/>
      {/*<ProductList/>*/}
      <Checkout/>



    </div>

  );
}

export default App;
