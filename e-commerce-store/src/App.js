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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Total from "./components/Total";


const stripePromise = loadStripe("")
function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route path="/login">
                  <Login/>
              </Route>
              <Route path="/register">
                  <Register/>
              </Route>
              <Route path="/product">
                  <Header/>
                  <ProductList/>
              </Route>
              <Route path="/checkout">
                  <Header/>
                  <Checkout/>
              </Route>
              <Route path="/">
                  <Header/>
                  <ProductList/>
              </Route>
          </Switch>
      </Router>
    </div>

  );
}

export default App;
