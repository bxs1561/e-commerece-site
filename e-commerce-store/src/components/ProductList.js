import React, {useEffect, useState} from "react";
import "./ProductList.css"
import Products from "./Products";
import Ads from "../picture/5deec9de42fc0401.jpg"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Adsq from "../picture/ads.jpg"
import axios from "./axios"
function ProductList() {
    const image0=Ads
    const image1= Adsq
    const[image,setImage] = useState([image0,image1])
    const [count, setCount] = useState(0);
    const[product, setProduct] = useState([])

    const next=()=>{
       if(image.length-1===count){
           setCount(0);
       }
       else{
           setCount(count+1)
       }
    }
    useEffect(()=>{
        axios.get("/product",{
            headers:{
                "Content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(result=>{
            setProduct(result.data)

        })
    },[])
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
                    {/*{product.map(products=>(*/}
                        <Products
                            id={product[0]?._id}
                            title={product[0]?.title}
                            price={product[0]?.price}
                            image={product[0]?.image}
                        />
                    <Products
                        id={product[1]?._id}
                        title={product[1]?.title}
                        price={product[1]?.price}
                        image={product[1]?.image}
                    />
                    <Products
                        id={product[2]?._id}
                        title={product[2]?.title}
                        price={product[2]?.price}
                        image={product[2]?.image}
                    />
                    <Products
                        id={product[3]?._id}
                        title={product[3]?.title}
                        price={product[3]?.price}
                        image={product[3]?.image}
                    />
                </div>



                <div className="home_row">
                    <Products
                        id={product[4]?._id}
                        title={product[4]?.title}
                        price={product[4]?.price}
                        image={product[4]?.image}
                    />
                    <Products
                        id={product[5]?._id}
                        title={product[5]?.title}
                        price={product[5]?.price}
                        image={product[5]?.image}
                    />
                </div>

            </div>
        </div>
    )
}
export default ProductList
