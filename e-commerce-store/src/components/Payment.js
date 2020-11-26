import React, {useEffect, useState} from "react";
import "./Payment.css"
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useStateValue} from "../ReactContextApi/StateProvider";
import axios from "./axios";
import {totalCartAmount} from "../ReactContextApi/reducer";
import ProductCheckout from "./ProductCheckout";
import {Link, useHistory} from "react-router-dom";
import CurrencyFormat from "react-currency-format"
import Address from "./Address";



function Payment() {
    const [{cart, user}, dispatch] = useStateValue()
    const stripe = useStripe()
    const elements = useElements()
    const history = useHistory()

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const [id, setId] = useState([])





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
        console.log(order)
    }


    // useEffect(()=>{
    //     cart.map((doc)=>{
    //         orderPost(doc.id)
    //
    //     })
    //
    // },[])




    const handleSubmit=async (event)=>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            cart.map((doc)=>{
                orderPost(doc.id)
            })
            setSucceeded(true);
            setError(null)
            setProcessing(false)
            history.push('/')
        })
        dispatch({
            type: 'EMPTY_BASKET'
        })

    }
    const handleChange=(event)=>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }


    return(

        <div className="payment">

            <div className="payment_container">
                <h1>
                    Checkout (<Link to="/>payment">{cart?.length}items</Link>)
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>114 lysander dr</p>
                        <p>Rochester, NY</p>
                    </div>

                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {cart.map(item=>(
                            <ProductCheckout
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
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


                                <CardElement onChange={handleChange}/>

                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={totalCartAmount(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button  disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>
                            {/*errors*/}
                            {error && <di>{error}</di>}
                        </form>

                    </div>

                </div>
            </div>
            {/*{cart.map(doc=>(*/}
            {/*    console.log(doc.id)*/}
            {/*    // <button onClick={orderPost(doc.id)}>Order</button>*/}
            {/*    ))}*/}

        </div>
    )

}
export default Payment
