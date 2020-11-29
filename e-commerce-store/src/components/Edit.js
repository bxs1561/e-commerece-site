import React, {useEffect, useState} from "react";
import "./Address.css"
import {useStateValue} from "../ReactContextApi/StateProvider";
import {useHistory} from "react-router-dom"
import axios from "./axios"
import {toast} from "react-toastify";

function Edit() {
    const[{user},dispatch] = useStateValue()
    const history = useHistory()

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [phone, setPhone] = useState("")
    const [data, setData] = useState([])




    useEffect(()=>{
        axios.get(`/user/user/${user?._id}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
            }
        ).then(usr=>{
            // console.log(usr)
            usr.data.Address.map(result=>{
                setAddress(result.address)
                setCity(result.city)
                setState(result.state)
                setZipCode(result.zipCode)
                setPhone(result.phone)
            })
        })

    },[])



    const handleSubmitAddress=(event)=>{
        event.preventDefault();
        const addressPost={
            address,
            city,
            state,
            zipCode,
            phone,
        }
        axios.put(`/user/edit/${user?._id}`,addressPost,{
            headers:{
                "Content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(result=>{
            history.push("/user/address")
        }).catch(err=>{
            toast.error(err.response?.data?.error, {
                position: "top-center",
                autoClose: false,
            })

        })

    }
    return(
        <>
            {user ? (
                <div className="address">
                    <div className="address_container">
                        <h1>Your address</h1>

                        <form>
                            <h5>Address</h5>
                            <input type="text"  value={address} onChange={(event => setAddress(event.target.value))}/>
                            <h5>City</h5>
                            <input type="text"  value={city} onChange={(event => setCity(event.target.value))}/>
                            <h5>State</h5>
                            <input type="text"  value={state} onChange={(event => setState(event.target.value))}/>
                            <h5>Zip Code</h5>
                            <input type="text"  value={zipCode} onChange={(event => setZipCode(event.target.value))}/>
                            <h5>Phone Number</h5>
                            <input type="text"  value={phone} onChange={(event => setPhone(event.target.value))}/>
                            <button type="submit" className="address_submit" onClick={handleSubmitAddress}>Submit</button>
                        </form>
                    </div>

                </div>

            ):(
                history.push("/login")

            )
            }

        </>
    )

}
export default Edit
