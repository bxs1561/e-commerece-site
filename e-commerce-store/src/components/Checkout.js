import React, {useEffect} from "react";
import "./Checkout.css"
import ProductCheckout from "./ProductCheckout";
import Total from "./Total";
import {useHistory} from "react-router-dom"
import {useStateValue} from "../ReactContextApi/StateProvider";
import {actionTypes} from "../ReactContextApi/reducer";

function Checkout() {
    const [{cart, user, addr},dispatch]=useStateValue();
    const history = useHistory()

    useEffect(()=> {
        const address = JSON.parse(localStorage.getItem("Address"))
        address.map(result => {
            dispatch({
                type: actionTypes.ADD_TO_ADDRESS,
                item: {
                    addres: result.address,
                    City: result.city,
                    State: result.state,
                    Zip_Code: result.zipCode,
                    Phone: result.phone,


                }
            })
        })
    },[])

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
                        hideProduct={false}
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
