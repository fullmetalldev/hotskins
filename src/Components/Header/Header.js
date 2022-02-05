import React, {useEffect} from 'react';
import "./header.css";
import icon from "../../images/icon/favicon.png";
import ruIcon from "../../images/language/Russia.png";
import engIcon from "../../images/language/English.png";

const Header = ({language, setLanguage}) => {

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

                        <div className="header__navbar-logo">
                            <img src={icon} alt="icon"/>
                            <h2 className="header__navbar-logo_title">Hot<span>Skins</span></h2>
                        </div>

                        <div className="header__navbar-ul">
                            <a className="header__navbar-ul_li">
                                {language === 'ru' ? "Помощь" : "Help"}
                            </a>
                            <a className="header__navbar-ul_li">
                                {language === 'ru' ? "Контакты" : "Contacts"}
                            </a>
                        </div>

                    </div>

                    <div className="header__navbar-left">

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