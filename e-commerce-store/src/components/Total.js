import React from "react";
import "./Total.css";
import CurrencyFormat from "react-currency-format";
import {useStateValue} from "../ReactContextApi/StateProvider";
import {totalCartAmount} from "../ReactContextApi/reducer";

function Total() {
    const [{cart, user},dispatch]=useStateValue();

    return(
        <>
            <div className="breakpoint">
            </div>
            {cart.length>=1?(

        <div className="total">

            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({cart.length} items):                              <strong>{value}</strong>
                        </p>
                        <p>Delivery Charges:                                <strong>Free</strong></p>
                        <p>Taxes and fees:                                    <strong>-----</strong></p>
                        <div className="horizontal">
                        </div>
                        <div className="estimate_total">
                            <p>Total Amount:                                <strong>{value}</strong></p>
                        </div>
                    </>

                )}
                value={totalCartAmount(cart)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
            />
            <button>Proceed to Checkout</button>

        </div>
            ):(
                <p>You have nothing in cart</p>
            )}

        </>
    )

}
export default Total
