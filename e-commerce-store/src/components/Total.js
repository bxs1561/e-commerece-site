import React from "react";
import "./Total.css";
import CurrencyFormat from "react-currency-format";

function Total() {
    return(
        <>
            <div className="breakpoint">
            </div>
        <div className="total">

            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({2} items):                              <strong>{value}</strong>
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
                value={200}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}

            />
            <button>Proceed to Checkout</button>

        </div>
            </>
    )

}
export default Total
