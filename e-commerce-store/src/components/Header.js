import React from "react"
import "./Header.css"
import L from "../picture/L.png"
import Logo from "../picture/Logo.png"
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Button from "@material-ui/core/Button/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link
} from "react-router-dom";
import {useStateValue} from "../ReactContextApi/StateProvider";
import {actionTypes} from "../ReactContextApi/reducer";


function Header() {
    const [{user, cart},dispatch] = useStateValue()
    const history = useHistory()

    const logout=()=>{
        localStorage.clear()
        dispatch({
            type: actionTypes.SET_USER,
            user: null
        })
        history.push("/")
    }

    return(
        <div className="header">
            <Link to="/">
                <img  className="header_logo"
                      src={Logo}
                      alt=""
                />

            </Link>

            <div className="header_search">
                <input className="header_inputSearch" type="text"/>
                <SearchIcon className="header_searchIcon"/>
            </div>

            <div className="header_login">

                {/*<Link to={!user &&"/login"}>*/}
                    <div  className="header_option">
                        <Link to={user && "/user/address"} style={{textDecoration: "none"}}>
                            {user ?(
                            <PersonOutlineOutlinedIcon className="login_avatar"/>
                                ):(
                                    ""
                            )}
                    <span className="header_optionOne" >
                        {!user ? "": user.name }
                    </span>
                        </Link>
                        <Link to={!user && "/login"} style={{ textDecoration: 'none' }}>
                        <span className="header_optionTwo" onClick={logout} style={{textDecoration: "none"}}>
                        {user ? "Logout" : "Login"}
                    </span>
                        </Link>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                        <span className="header_optionTwo" onClick={logout}>
                        {!user && "Register"}
                    </span>
                        </Link>
                    </div>
                {/*</Link>*/}
                    <div className="header_option" style={{marginBottom:5}}>
                        <Link to = {user && "/order"} style={{textDecoration: "none"}}>

                        <span className="header_optionTwo">
                            {user && "Orders"}

                    </span>
                        </Link>

                    </div>
                <Link to={user && "/checkout"} style={{textDecoration: "none"}} >
                    <div className="header_Basket">
                        {user?(
                            <ShoppingCartIcon/>

                        ):(
                            null
                        )}
                        <span className="header_optionTwo header_basketCount">
                    {user && cart.length}
                    </span>
                    </div>
                </Link>
            </div>

        </div>
        )
}
export default Header
