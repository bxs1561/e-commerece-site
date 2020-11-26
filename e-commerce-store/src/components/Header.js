import React from "react"
import "./Header.css"
import L from "../picture/L.png"
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
    const log=()=>{
        if(user){
            return(
                <div className="header_option" style={{paddingBottom: 20}}>
                    {/*//goes to user info*/}
                    <PersonOutlineOutlinedIcon className="login__avatar" style={{marginTop:10}}/>
                    <span className="header_optionTwo">
                    {user?.name}
                </span>
                </div>
            )
        }
    }

    return(
        <div className="header">
            <Link to="/">

            <div className="header__logo">
                <img src={L} alt="NepKart Logo"/>
            </div>
            </Link>

            <div className="header__search">
                <input className="header__inputSearch" type="text"/>
                <SearchIcon className="searchIcon"/>
            </div>
            <div className="header__login">
                    <div className="header_option" style={{paddingBottom: 20}}>
                        <Link to={user && "/user/address"} style={{textDecoration: "none"}}>
                        {/*go to the user information*/}
                        {user ? (
                            <PersonOutlineOutlinedIcon className="login__avatar" style={{marginTop:10}}/>
                        ) : (
                            ""
                        )}


                        {/*<PersonOutlineOutlinedIcon className="login__avatar" style={{marginTop:10}}/>*/}
                <span className="header_optionTwo">
                    {!user ? "": user.name}
                </span>
                        </Link>

                        <Link to={!user && "/login"} style={{ textDecoration: 'none' }}>

                    <span className="header_optionTwo" onClick={logout}>
                        {user? "Logout" : "Login"}

                    </span>
                        </Link>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                        <span className="header_optionTwo" onClick={logout}>
                        {!user && "Register"}

                    </span>
                        </Link>

                    </div>
                <div className="header__option">
                    <span className="header_optionTwo">
                        {/*{user && "/order"}*/}
                        {user? "Orders": ""}
                    </span>
                </div>
            {/*</div>*/}
                <Link to={user && "/checkout"}>

                <div className="header_Basket">
                {user?(
                    <ShoppingCartIcon/>

                ):(
                    ""
                )}
                <span className="header_optionLineTwo header_basketCount">
                    {user && cart.length}
                    {/*{cart.length}*/}
                    </span>
            </div>
                </Link>
            </div>
        </div>
        )
}
export default Header
