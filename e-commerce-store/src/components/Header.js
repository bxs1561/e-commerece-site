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
    Link
} from "react-router-dom";


function Header() {
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
                <PersonOutlineOutlinedIcon className="login__avatar"/>
                <span className="header_optionTwo">
                        Login
                </span>
                <div className="header__option">
                    <span className="header_optionOne">
                        Orders
                    </span>
                </div>
            </div>
            <div className="header_Basket">
                <ShoppingCartIcon/>
                <span className="header_optionLineTwo header_basketCount">
                    </span>
            </div>
        </div>
        )
}
export default Header
