import React, {useEffect, useState} from "react";
import "./Login.css"
import {useStateValue} from "../ReactContextApi/StateProvider";
import axios from "./axios"
import {Link,useHistory} from "react-router-dom"
import {toast} from "react-toastify";
import {actionTypes} from "../ReactContextApi/reducer";

function Login() {
    const history = useHistory();
    const [{user ,addr}, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginHandle= (event)=>{
        event.preventDefault()
        let user={
            email: email,
            password: password,
        }

         axios.post("users/signin", user, {
                headers: {
                    "accept": "application/json"
                }
            }
        ).then(res => {
            // console.log(res)
             //store token and user data in local storage
            localStorage.setItem("jwt",res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
             dispatch({
                 type: actionTypes.SET_USER,
                 user: res.data.user
             })

            history.push("/product")

            // console.log(res)
        }).catch(err => (
            toast.error(err.response?.data?.error, {
                position: "top-center",
                autoClose: false,
            })

        ))
        setPassword('')
    }



    return(
        <div className="login">

            <div className="login_container">
                <h1>Sign in to your account</h1>
                <form>
                    <h5>E-mail</h5>
                    {/*e.target.value is what the user type in*/}
                    <input type="text" placeholder="Email address"  value={email} onChange={event => setEmail(event.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)} />

                    <button type="submit" onClick={loginHandle} className="login_signInButton">Sign In</button>

                </form>
                <h5>Don't have an account?</h5>
                <Link to="/register">
                <button type="submit" className='login_registerButton'>Register</button>
                </Link>


            </div>
        </div>
    )

}
export default Login
