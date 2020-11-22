import React, {useState} from "react";
import "./ProductCheckout.css"
import {useStateValue} from "../ReactContextApi/StateProvider";
import {actionTypes, minusCartAmount, totalCartAmount} from "../ReactContextApi/reducer";

function ProductCheckout({title,price,image,id}) {
    const [increase, setIncrease] = useState(1)
    const [{cart}, dispatch] = useStateValue();
    const [hide, setHide] = useStateValue(true)

    //this will increase the amount and add up to cart
    //increase the price and items
    const increases=()=>{
        setIncrease(increase+1)
        // totalCartAmount(cart)
        dispatch({
            type: actionTypes.ADD_TO_CART,
            item:{
                id: id,
                title: title,
                image: image,
                price: price
            }
        })
        setHide(false)
    }

    //remove from cart
    const removeFromCart=()=>{
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            id: id
        })

    }

    //remove item when click on minus button
    const decrease = ()=>{
        setHide(false)
        if(increase<=0){
            setIncrease(1)
        }
        else {
            setIncrease(increase-1)
            removeFromCart()
        }
    }
    return(
        <div className="productCheckouts">
            <div className="productCheckout">
                <img className="productCheckout_image" src={image} alt=""/>
                <div className="buttons">
                    <button onClick={decrease}>-</button>
                    <input type="text" value={increase}/>
                    <button onClick={increases}>+</button>

                </div>
            </div>



            <div className="productCheckout_info">

                    <p className='productCheckout_title'>{title}</p>
                <br/>

                <p className="productCheckout_price">
                        <small>$</small>
                        <strong>{price}</strong>
                    </p>
                <br/>

                <button onClick={removeFromCart}>Remove</button>



                </div>
            <p className="productCheckout_delivery">2-day delivery</p>




            {/*</div>*/}

        </div>
    )

}
export default ProductCheckout
