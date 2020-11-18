import React from "react";
import "./Products.css"


function Products({id,title,image,price,rating}) {
    const addToBasket=()=>{
        console.log("add")
    }


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
