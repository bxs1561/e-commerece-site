import React, {useEffect, useState} from "react";
import "./Payment.css"
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useStateValue} from "../ReactContextApi/StateProvider";
import axios from "./axios";
import {totalCartAmount} from "../ReactContextApi/reducer";
import ProductCheckout from "./ProductCheckout";
import {Link, useHistory} from "react-router-dom";
import CurrencyFormat from "react-currency-format"



function Payment() {
    const [{cart, user, addr}, dispatch] = useStateValue()
    const stripe = useStripe()
    const elements = useElements()
    const history = useHistory()

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        const clientSecrets = async()=>{
            const response = await axios.post(`payment/create/${totalCartAmount(cart)*100}`)
            setClientSecret(response.data.clientSecret)
        }
        clientSecrets()
    },[cart])




    //post request the order from cart
    const orderPost=(id)=>{
        const order={
            user,
            product: id
        }
                 axios.post("/orders/add",order,{
                     headers:{
                         "Content-type": "application/json",
                         "Authorization": "Bearer "+localStorage.getItem("jwt")
                     }
                 })
    }


    const handleSubmit=async (event)=>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }


        }).then(({ paymentIntent }) => {
            if(!error) {
                cart.map((doc) => {
                    orderPost(doc.id)
                })
                history.push('/')
                dispatch({
                    type: 'EMPTY_BASKET'
                })

            }

            setSucceeded(true);
            setError(null)
            setProcessing(false)
        })


    }
    const handleChange=(event)=>{
        setProcessing(false);
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
        setSucceeded(false);
        setProcessing(false)


    }

    return(

        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout ({cart?.length} items)
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        {addr.map(address=>(
                            <>
                            <p>{user?.email}</p>
                            <p>{address.addres}</p>
                            <p>{address.City}, {address.State}</p>
                            </>
                        ))}
                    </div>

                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Items to be delivery</h3>
                    </div>
                    <div className="payment_items">
                        {cart.map(item=>(
                            <ProductCheckout
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                hideIncrease={true}
                            />
                        ))}
                    </div>

                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment_details">
                        {/*payment stripe*/}
                        {/*payment details here*/}
                            <form onSubmit={handleSubmit}>
                                <CardElement
                                    onChange={handleChange}/>
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3 style={{marginTop:20}}>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={totalCartAmount(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button  disabled={processing || disabled || succeeded}>
                                    <span>{processing? <p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>
                            {/*errors*/}
                            {error && <di>{error}</di>}
                        </form>

                    </div>

                </div>
            </div>


        </div>
    )

}
export default Payment
