import React from "react";
import "./Register.css";

function Register() {
    return(
        <div className="register">
            <div className="register_container">
                <h1>Sign in to your account</h1>
                <form>
                    <h5>Name</h5>
                    <input type="text" placeholder="Name" />
                    <h5>E-mail</h5>
                    {/*e.target.value is what the user type in*/}
                    <input type="text" placeholder="Email address" />
                    <h5>Password</h5>
                    <input type="password"  placeholder="created password"/>
                    <h5>Password</h5>
                    <input type="password"  placeholder="confirmed password"/>
                    <button className='login_registerButton'>Register</button>

                </form>
                <h5>Already have an account?</h5>
                <button type="submit"  className="login_signInButton">Sign In</button>
            </div>
        </div>
    )
}
export default Register
