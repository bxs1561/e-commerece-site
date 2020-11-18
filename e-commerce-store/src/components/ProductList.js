import React, {useState} from "react";
import "./ProductList.css"
import Products from "./Products";
import Ads from "../picture/5deec9de42fc0401.jpg"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Adsq from "../picture/ads.jpg"
function ProductList() {
    const image0=Ads
    const image1= Adsq
    // const image1="https://images-na.ssl-images-amazon.com/images/G/01/Audible/en_US/images/creative/amazon/Minerva-Holiday-2020-GW-HeroDesktop_x2_3000x1200_Plus_V03._CB402929219_.jpg"
    const[image,setImage] = useState([image0,image1])
    const [count, setCount] = useState(0);

    const next=()=>{
       if(image.length-1===count){
           setCount(0);
       }
       else{
           setCount(count+1)
       }
    }
    console.log(count)
    return(
        <div className="productList">
            <div className="product_container">
                <div className="nav">
                    <p>Groceries & gifts delivered from our store as soon as today</p>
                </div>
                <img src={image[count]}/>
                <div className="navigate">
                    <NavigateBeforeIcon onClick={next}/>
                    <NavigateNextIcon  onClick={next} />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <div className="home_row">
                    <Products
                        id="12321341"
                        title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
                        price={11.96}
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
                    />
                    <Products
                        id="49538094"
                        title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
                        price={239.0}
                        image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
                    />
                    <Products
                        id="49538094"
                        title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
                        price={239.0}
                        image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
                    />
                    <Products
                        id="12321341"
                        title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
                        price={11.96}
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
                    />

                </div>
                <div className="home_row">
                    <Products
                        id="12321341"
                        title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
                        price={11.96}
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
                    />
                    <Products
                        id="49538094"
                        title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
                        price={239.0}
                        image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
                    />
                </div>

            </div>
        </div>
    )
}
export default ProductList
