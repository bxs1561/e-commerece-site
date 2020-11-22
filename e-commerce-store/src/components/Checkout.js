import React from "react";
import "./Checkout.css"
import ProductCheckout from "./ProductCheckout";
import Total from "./Total";
import {useHistory} from "react-router-dom"
import {useStateValue} from "../ReactContextApi/StateProvider";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Checkout() {
    const [{cart, user},dispatch]=useStateValue();
    const history = useHistory()

    return(
        <>
        {user?(

        <div className="checkout">
            <div>
            <h2 className="checkout_title">
                Your Cart
            </h2>
                {/*<div className="checkout_left">*/}
                {cart.map(carts=>(
                    <ProductCheckout
                        id={carts?.id}
                        title={carts?.title}
                        price={carts?.price}
                        image={carts?.image}
                    />
                ))}
            </div>
            <div className="checkout_right">
                <Total/>
            </div>


        </div>
        ):(
            history.push("/")
        )}
        </>

    )

}
export default Checkout
