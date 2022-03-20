import React, {useEffect, useState} from 'react';
import "./header.css";
import icon from "../../images/icon/favicon.png";
import ruIcon from "../../images/language/Russia.png";
import engIcon from "../../images/language/English.png";
import {NavLink} from "react-router-dom";
import cartIMG from "./imgs/Shopping_Cart_02.png";
import anonymous from "./imgs/User_02.svg"
import "./HeaderAdaptive.css";
import burgerLine from "./imgs/lineburger.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = ({setUser, user, setLog, allSum, cart, language, setLanguage}) => {

    useEffect(() => {
        setLanguage(localStorage.getItem('language'));
    }, []);

    const [burger, setBurger] = useState(false);

    const setLang = (e) => {
        setLanguage(e.target.value);
        localStorage.setItem('language', e.target.value);
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="header__navbar">


                    <div className="header__navbar-right">

                        <NavLink to="/" className="header__navbar-logo">
                            <img src={icon} alt="icon"/>
                            <h2 className="header__navbar-logo_title">Hot<span>Skins</span></h2>
                        </NavLink>

                        <div className="header__navbar-ul">
                            <NavLink to="/shop" className="header__navbar-ul_li">
                                {language === 'ru' ? "Биржа" : "Shop"}
                            </NavLink>
                            <NavLink to="/contacts" className="header__navbar-ul_li">
                                {language === 'ru' ? "Контакты" : "Contacts"}
                            </NavLink>
                            <NavLink to="/case" className="header__navbar-ul_li">
                                {language === 'ru' ? "Кейсы" : "Cases"}
                            </NavLink>

                        </div>

                    </div>

                    <div className="header__navbar-left">

                        <NavLink to="/cart" className="header__navbar_cart">

                            <span className="header__navbar_cart-number">
                                {cart.length}
                            </span>

                            <img src={cartIMG} alt="cartimg"/>

                            <span className="header__navbar-left-cartPrice">
                                {language === "ru" ? `${allSum} Сом` : `${(allSum / 106).toFixed(2)}$`}
                            </span>

                        </NavLink>

                        <div className="selectLanguage">
                            <img src={language === 'ru' ? `${ruIcon}` : `${engIcon}`} alt="test"/>
                            <select value={language} onChange={(e) => setLang(e)}>
                                <option className="selectLanguage__optionRU" value="ru">Ru</option>
                                <option className="selectLanguage__optionENG" value="eng">Eng</option>
                            </select>
                        </div>

                        <div className="useracc">
                            <img onClick={() => setLog("opened")} src={anonymous} alt="anon"/>
                            {user.length === 0
                                ? ""
                                : <NavLink to="/user" className="header__navbar-left_username">{user.login}</NavLink>}
                        </div>

                        <div onClick={() => {
                            setBurger(!burger)
                        }} className={burger ? "burgerButton burgerButton-active" : "burgerButton"}>
                            <img className="burgerButton__up" src={burgerLine} alt=""/>
                            <img className="burgerButton__down" src={burgerLine} alt=""/>
                        </div>

                    </div>
                </nav>
            </div>

            {burger
                ? <BurgerMenu allSum={allSum} cart={cart} language={language} setLog={setLog} user={user}/>
                : ""
            }

        </header>
    );
};

export default Header;