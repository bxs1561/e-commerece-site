import React, {useEffect, useState} from "react"
import "./Order.css"
import {useStateValue} from "../ReactContextApi/StateProvider";
import axios from "./axios"
import moment from "moment";
import ProductCheckout from "./ProductCheckout";
import CurrencyFormat from "react-currency-format"



function Order(){
    const [{user, cart},dispatch] = useStateValue();
    const [order, setOrder] = useState([]);
    const [count, setCount] = useState([]);
    // const [dates, setDates] = []

    const getOrders=()=>{
        axios.get(`orders/user/${user?._id}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(result=>{
            if(result.data.Count>0){
                setOrder(result.data.Order)
                setCount(result.data.Count)
            }
        })
    }
    useEffect(()=>{
        getOrders()
    },[])

    return(
        <div className="order">
            <h5>Total Order: {count}</h5>

            {order?.map(order=>(
                <>
                <h2>Order</h2>
                <p>{moment(order.createdAt).format("MMMM Do YYYY, h:mma")}</p>
                    <ProductCheckout
                        id={order.product._id}
                        title={order.product.title}
                        image={order.product.image}
                        price={order.product.price}
                        buttonHide={true}
                        hideIncrease={true}
                        />
                        </>
            ))}
        </div>
    )

}
export default Order
