import React from 'react';
import "./footer.css"

const Footer = ({language}) => {
    return (
        <footer className="footer">
            <div className="container">

                <div className="footer__row">

                    <ul className="footer__left">
                        Copyright @ Skincash.ru
                    </ul>

                    <ul className="footer__right">
                        <li className="footer__right-li">
                            {language === 'ru' ? "Помощь" : "Help"}
                        </li>
                        <li className="footer__right-li">
                            {language === 'ru' ? "Контакты" : "Contacts"}
                        </li>
                        <li className="footer__right-li">
                            {language === 'ru' ? "Пользвательское соглашение" : "Users agreement"}
                        </li>
                    </ul>

                </div>


            </div>
        </footer>
    );
};

export default Footer;