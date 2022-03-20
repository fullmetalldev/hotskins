import {NavLink} from "react-router-dom";
import "./footer.css"
import "./FooterAdaptive.css"

const Footer = ({language}) => {
    return (
        <footer className="footer">
            <div className="container">

                <div className="footer__row">

                    <ul className="footer__left">
                        Copyright @ Skincash.ru
                    </ul>

                    <ul className="footer__right">
                        <NavLink to="/help" className="footer__right-li">
                            {language === 'ru' ? "Помощь" : "Help"}
                        </NavLink>
                        <NavLink to="/contacts" className="footer__right-li">
                            {language === 'ru' ? "Контакты" : "Contacts"}
                        </NavLink>
                        <NavLink to="/agreement" className="footer__right-li">
                            {language === 'ru' ? "Пользвательское соглашение" : "Users agreement"}
                        </NavLink>
                    </ul>

                </div>


            </div>
        </footer>
    );
};

export default Footer;