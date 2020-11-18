import React from "react";
import "./Checkout.css"
import ProductCheckout from "./ProductCheckout";

function Checkout() {
    return(
        <div className="checkout">
            <div>
            <h2 className="checkout_title">
                Your Shopping basket
            </h2>
                <div className="checkout_left">

                <ProductCheckout title="Flying Machine Full Sleeve Solid Men Jacket"
                             price={20}
                             image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"/>
            <ProductCheckout title="Hello"
                             price={20}
                             image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"/>
            <ProductCheckout title="Hello"
                             price={20}
                             image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"/>
            {/*<div className="checkout_right">*/}
            {/*    <Subtotal />*/}
            {/*</div>*/}
            </div>
            </div>

        </div>

    )

}
export default Checkout
