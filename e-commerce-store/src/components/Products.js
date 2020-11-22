import React from "react";
import "./Products.css"
import {useStateValue} from "../ReactContextApi/StateProvider";
import {actionTypes} from "../ReactContextApi/reducer";


function Products({id,title,image,price}) {
    const [{cart}, dispatch] = useStateValue();

    //add item to basket
    const addToBasket=()=>{
        dispatch({
            type: actionTypes.ADD_TO_CART,
            item:{
                id: id,
                title: title,
                image: image,
                price: price
            }
        })
    }
    console.log(cart)


    return(
        <div className="products">
            <img src={image} alt=""/>

            <div className="products_info">
                <p>{title}</p>
                <p className="products_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

            </div>
            {/*<img src={image} alt=""/>*/}
            <button onClick={addToBasket}>Add to Cart</button>
        </div>
    )
}
export default Products
