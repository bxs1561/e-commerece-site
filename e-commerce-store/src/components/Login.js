import React from "react";
import "./Login.css"
import {useStateValue} from "../ReactContextApi/StateProvider";

function Login() {
    const [{}, dispatch] = useStateValue();

    return(
        <div className="login">

            <div className="login_container">
                <h1>Sign in to your account</h1>
                <form>
                    <h5>E-mail</h5>
                    {/*e.target.value is what the user type in*/}
                    <input type="text" placeholder="Email address" />
                    <h5>Password</h5>
                    <input type="password" />

                    <button type="submit" className="login_signInButton">Sign In</button>

                </form>
                <h5>Don't have an account?</h5>
                <button type="submit" className='login_registerButton'>Register</button>


            </div>
        </div>
    )

}
export default Login
