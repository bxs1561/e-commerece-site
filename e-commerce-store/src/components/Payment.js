import React from "react";
import "./Payment.css"
import {CardElement, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';


function Payment() {
    // const stripe = useStripe();
    // const elements = useElements();

    return(
        // <div className="payment">
            <form>
                <CardElement/>
            </form>

        // </div>
    )

}
export default Payment
