import React, {useEffect, useState} from "react";
import axios from "./axios"
import {useStateValue} from "../ReactContextApi/StateProvider";
import "./DisplayAddress.css"
import {Link} from "react-router-dom";


function DisplayAddress() {
    const[{user, addr},dispatch] = useStateValue()
    const[data, setData] = useState([])

    const getUser=()=>{
        axios.get(`/user/user/${user?._id}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
            }
        ).then(usr=>{
            setData(usr.data)
        })

    }

    useEffect(()=>{
        getUser()

    },[])




    return(
        <div className="displayAddress">
            <div className="displayAddress_container">

            {data?.Address?.map(addr=>(
                <>
                <div className="show_address">
                    <h5> Address</h5>
                    {addr.address}
                </div>
                    <hr/>

                    <div className="City">
                    <h5> City</h5>
                    {addr.city}
                    </div>
                    <hr/>

                    <div className="state">
                    <h5> State</h5>
                    {addr.state}
                    </div>
                    <hr/>

                    <div className="zipCode">
                    <h5> Zip Code</h5>
                    {addr.zipCode}
                    </div>
                    <hr/>

                    <div className="phoneNumber">
                    <h5> Phone Number</h5>
                    {addr.phone}
                    </div>
                    <hr/>

                </>
                ))}
                <Link to="/user/new/address">
                <button className="new_addressButton">New Address</button>
                </Link>
                <Link to="/user/edit/address">
                <button className="addressEditButton">Edit </button>
                </Link>
            </div>
        </div>





    )

}
export default DisplayAddress
