import React from 'react';
import "./Contacts.css";
import tg from "./tg.svg"
import em from "./email.svg"

const Contacts = ({language}) => {
    return (
        <main className="contacts">

            <div className="container">

                <div className="contacts__row">
                    <h2 className="contacts__mainTitle">{language === "ru" ? "Контакты" : "Contacts"}</h2>

                    <div className="contacts__telegram">

                        <a target="_blank" href="https:/t.me/hotskins" className="contacts__telegram_row">

                            <img src={tg} alt="telegram icon"/>

                            <div className="contacts__telegram_titles">
                                <h2>@hotskins</h2>
                                <span>
                                    {language === "ru"
                                        ? "Технические анонсы и новости"
                                        : "For news and announcements"
                                    }
                                    </span>
                            </div>

                        </a>

                        <a target="_blank" href="https:/t.me/hotskinshelp" className="contacts__telegram_row">

                            <img src={tg} alt="telegram icon"/>

                            <div className="contacts__telegram_titles">
                                <h2>@hotskins-help</h2>
                                <span>
                                    {language === "ru"
                                        ? "Поддержка пользователей сервиса"
                                        : "Support for service users"
                                    }
                                    </span>
                            </div>

                        </a>

                        <a target="_blank" href="malito:hello@hotskins.ru" className="contacts__telegram_row">

                            <img src={em} alt="email icon"/>

                            <div className="contacts__telegram_titles">
                                <h2>hello@hotskins.ru</h2>
                                <span>
                                      {language === "ru"
                                          ? "Для любых ваших вопросов"
                                          : "For all your questions"
                                      }
                                   </span>
                            </div>

                        </a>

                    </div>


                    <span className="contacts__line">

                    </span>

                    <div className="contacts__endRow">
                        <div className="contacts__endRow_column">
                            <span className="left">Beneficiary</span>
                            <span className="left">Reg. number</span>
                            <span className="left">Beneficiary’s address</span>
                        </div>
                        <div className="contacts__endRow_column">
                            <span className="right">Green Sequoia Square LTD</span>
                            <span className="right">HE 405171</span>
                            <span className="right">S35, Achaios Street, 5-th Floor, Office 17, P.C. 1101, Nicosia, Cyprus</span>
                        </div>
                    </div>

                </div>

            </div>

        </main>
    );
};

export default Contacts;