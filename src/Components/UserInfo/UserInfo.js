import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import "./user.css";
import axios from "axios";

const UserInfo = ({user, setUser, language}) => {

    const exitAcc = () => {
        setUser("");
        localStorage.removeItem("userName");
        localStorage.removeItem("userPas");
    };

    const [delForm, setDelForm] = useState(false);

    const deleteUser = () => {
        axios.delete(`http://localhost:8080/users/${user.id}`);
        exitAcc()
    };

    return (
        <div className="UserPage">

            {delForm
                ? <div className="deleteAccForm">
                    <h2 className="deleteAccForm__title">
                        {language === "ru"
                            ? "Вы действительно хотите удалить аккаунт?"
                            : "Do you really want to delete your account?"
                        }
                    </h2>
                    <div className="deleteAccForm__buttons">
                        <NavLink to="/" onClick={()=> deleteUser()} className="button">
                            {language === "ru"
                                ? "Да"
                                : "Yes"
                            }
                        </NavLink>
                        <button onClick={() => setDelForm(!delForm)} className="button">
                            {language === "ru"
                                ? "Нет"
                                : "No"
                            }
                        </button>
                    </div>

                </div>
                : ""
            }

            <div className="container">


                <div className="UserPage__row">

                    <div className="UserPage__row_top">
                        <div className="UserPage__row_left">
                            <img className="UserPage__avatar" src={user.img} alt="avatar"/>
                        </div>

                        <div className="UserPage__row_right">
                            <div className="UserPage__usernameInfo">
                                <span>
                                      {language === "ru"
                                          ? "Имя пользователя:"
                                          : "Username:"
                                      }
                                </span>
                                <div className="UserPage__username">
                                    {user.login}
                                </div>
                            </div>


                            <div className="UserPage__userPasswordInfo">
                                <span>
                                    {language === "ru"
                                        ? "Ваш пароль:"
                                        : "Your password:"
                                    }
                                </span>
                                <div className="UserPage__userPassword">
                                    {user.password.replace(/./g, "*")}
                                </div>
                            </div>

                            <div className="UserPage__dateInfo">
                                <span>
                                    {language === "ru"
                                        ? "Дата регистрации:"
                                        : "Date of registration:"
                                    }
                                </span>
                                <div className="UserPage__userPassword">
                                    {user.date}
                                </div>
                            </div>

                        </div>


                    </div>


                    <div className="UserPage__buttons">
                        <NavLink className="UserPage__btn" to="/" onClick={() => exitAcc()}>
                            {language === "ru" ? "Выйти с аккаунта" : "Exit from account"}
                        </NavLink>
                        <button onClick={() => {
                            setDelForm(!delForm)
                        }} className="UserPage__btn">
                            {language === "ru" ? "Удалить аккаунт" : "Delete account"}
                        </button>
                    </div>

                </div>


            </div>

        </div>
    );
};

export default UserInfo;