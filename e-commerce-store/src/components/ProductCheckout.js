import React from "react";
import "./ProductCheckout.css"

function ProductCheckout({title,price,image,id}) {
    return(
        <div className="productCheckouts">
            <div className="productCheckout">
                <img className="productCheckout_image" src={image} alt=""/>
                <div className="buttons">
                    <button>-</button>
                    <input type="text"/>
                    <button>+</button>
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

                <button>Remove</button>



                </div>
            <p className="productCheckout_delivery">2-day delivery</p>




            {/*</div>*/}

        </div>
    )

}
export default ProductCheckout
