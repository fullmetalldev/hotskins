import React, {useEffect} from 'react';
import "./header.css";
import icon from "../../images/icon/favicon.png";
import ruIcon from "../../images/language/Russia.png";
import engIcon from "../../images/language/English.png";
import {NavLink} from "react-router-dom";

const Header = ({cart, language, setLanguage}) => {

    useEffect(()=>{
        setLanguage(localStorage.getItem('language'));
    }, []);

    const setLang = (e)=>{
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
                            <NavLink to="/help" className="header__navbar-ul_li">
                                {language === 'ru' ? "Помощь" : "Help"}
                            </NavLink>
                            <NavLink to="/contacts" className="header__navbar-ul_li">
                                {language === 'ru' ? "Контакты" : "Contacts"}
                            </NavLink>
                            <NavLink to="/cases" className="header__navbar-ul_li">
                                {language === 'ru' ? "Кейсы" : "Cases"}
                            </NavLink>
                        </div>

                    </div>

                    <div className="header__navbar-left">

                        <NavLink to="/cart" className="header__navbar_cart">

                            <span className="header__navbar_cart-number">
                                {cart.length}
                            </span>

                            <svg className="header__navbar_cart-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3 3H3.76772C4.24998 3 4.66354 3.3442 4.7511 3.81845L7 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.5 6H19.7429C20.386 6 20.8619 6.59824 20.7173 7.22486L18.8712 15.2249C18.7665 15.6786 18.3625 16 17.8968 16H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </NavLink>

                        <div className="selectLanguage">
                            <img src={language==='ru' ? `${ruIcon}` : `${engIcon}`} alt="test"/>
                            <select value={language} onChange={(e) => setLang(e)}>
                                <option className="selectLanguage__optionRU" value="ru">Ru</option>
                                <option className="selectLanguage__optionENG" value="eng">Eng</option>
                            </select>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;