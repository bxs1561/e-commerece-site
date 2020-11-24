import React, {useEffect} from "react"
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
    useHistory,
    Link
} from "react-router-dom";
import Total from "./components/Total";
import {useStateValue} from "./ReactContextApi/StateProvider";
import {actionTypes} from "./ReactContextApi/reducer";

const stripePromise = loadStripe("")
function ContextReactUser() {
    const history = useHistory()
    const [{state}, dispatch] = useStateValue();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        // console.log(typeof user, user)
        if (user) {
            dispatch({
                type: actionTypes.SET_USER,
                user: user,
            })
            history.push("/")
        } else {
            dispatch({
                type: actionTypes.SET_USER,
                user: null,
            });

            // history.push("/")
        }
    }, [])
    return(
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
            <Route path="/payment">
                <Header/>
                <Elements stripe={stripePromise}>
                    <Payment/>
                </Elements>
            </Route>
            <Route path="/">
                <Header/>
                <ProductList/>
            </Route>
        </Switch>
    )


}

function App() {
    return (
    <div className="App">
      <Router>
          {/*<Header/>*/}
          <ContextReactUser/>
      </Router>
    </div>

  );
}

export default App;
