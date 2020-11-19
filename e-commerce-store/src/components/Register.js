import React, {useState} from "react";
import "./Register.css";
import axios from "./axios"

function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState("");
    const[date, setDate] = useState(new Date())

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const user={
            name: name,
            email: email,
            password: password,
            date: Date.now()
        }
        await axios.post("users/register", user);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPass("")

    };

    return(
        <div className="register">
            <div className="register_container">
                <h1>Sign in to your account</h1>
                <form>
                    <h5>Name</h5>
                    <input type="text" placeholder="Name" value={name} onChange={event => setName(event.target.value)}/>
                    <h5>E-mail</h5>
                    <input type="text" placeholder="Email address"  value={email} onChange={event => setEmail(event.target.value)}/>
                    <h5>Password</h5>
                    <input type="password"  placeholder="created password" value={password} onChange={event => setPassword(event.target.value)}/>
                    <h5>Password</h5>
                    <input type="password"  placeholder="confirmed password" value={confirmPass} onChange={event => setConfirmPass(event.target.value)} />
                    <button className='login_registerButton' type="submit" onClick={handleSubmit}>Register</button>

                </form>
                <h5>Already have an account?</h5>
                <button type="submit"  className="login_signInButton">Sign In</button>
            </div>
        </div>
    )
}
export default Register
