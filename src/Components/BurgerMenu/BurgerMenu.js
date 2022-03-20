import React from 'react';
import "./burgermenu.css";
import anonymous from "../Header/imgs/User_02.svg";
import {NavLink} from "react-router-dom";
import cartIMG from "../Header/imgs/Shopping_Cart_02.png";

const BurgerMenu = ({allSum, cart, user, setLog, language}) => {
    return (
        <div className="burgerMenu">


            <div className="useracc">
                <img onClick={() => setLog("opened")} src={anonymous} alt="anon"/>
                {user.length === 0
                    ? <button onClick={() => setLog("opened")} className="useracc__log">
                        {language === "ru"
                            ? "Вход"
                            : "Login"
                        }
                    </button>
                    : <NavLink to="/user" className="header__navbar-left_username">{user.login}</NavLink>}
            </div>

            <span className="hr">

            </span>

            <NavLink to="/shop" className="header__navbar-ul_li">
                {language === 'ru' ? "Биржа" : "Shop"}
            </NavLink>

            <span className="hr">

            </span>

            <NavLink to="/contacts" className="header__navbar-ul_li">
                {language === 'ru' ? "Контакты" : "Contacts"}
            </NavLink>

            <span className="hr">

            </span>

            <NavLink to="/case" className="header__navbar-ul_li">
                {language === 'ru' ? "Кейсы" : "Cases"}
            </NavLink>

            <span className="hr">

            </span>

            <NavLink to="/cart" className="burger_cart">

                            <span className="burger_cart-number">
                                {cart.length}
                            </span>

                <img src={cartIMG} alt="cartimg"/>

                <span className="burger_cart-cartPrice">
                                {language === "ru" ? `${allSum} Сом` : `${(allSum / 106).toFixed(2)}$`}
                            </span>

            </NavLink>

        </div>
    );
};

export default BurgerMenu;