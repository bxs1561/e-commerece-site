import React, {useState} from "react";
import "./ProductCheckout.css"
import {useStateValue} from "../ReactContextApi/StateProvider";
import {actionTypes, minusCartAmount, totalCartAmount} from "../ReactContextApi/reducer";

function ProductCheckout({title,price,image,id,buttonHide, hideIncrease}) {
    const [increase, setIncrease] = useState(1)
    const [{cart}, dispatch] = useStateValue();
    const [hide, setHide] = useStateValue(true)

    //this will increase the amount and add up to cart
    //increase the price and items
    const increases=()=>{
        // totalCartAmount(cart)
            setIncrease(increase+1)
            dispatch({
                type: actionTypes.ADD_TO_CART,
                item: {
                    id: id,
                    title: title,
                    image: image,
                    price: price
                }
            })


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
        if(increase<=1){
            removeFromCart()
            setIncrease(1)
        }
        else {
            removeFromCart()
            setIncrease(increase-1)
        }
    }
        return (

            <div className="productCheckouts">
                <div className="productCheckout">


                    <img className="productCheckout_image" src={image} alt=""/>
                    {!hideIncrease && (<div className="buttons">
                        {<button onClick={decrease}>-</button>}
                        <input type="text" value={increase}/>
                        <button onClick={increases}>+</button>
                    </div>)}
                </div>


                <div className="productCheckout_info">

                    <p className='productCheckout_title'>{title}</p>
                    <br/>

                    <p className="productCheckout_price">
                        <small>$</small>
                        <strong>{price}</strong>
                    </p>
                    <br/>

                    {!buttonHide && (<button onClick={removeFromCart}>Remove</button>)}


                </div>
                <p className="productCheckout_delivery">2-day delivery</p>
                {/*</div>*/}

            </div>


        )

}
export default ProductCheckout
