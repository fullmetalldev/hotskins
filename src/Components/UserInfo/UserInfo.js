import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import "./user.css";
import axios from "axios";
import edit from "./edit.svg";
import search from "./search.png";
import "./userAdaptive.css";

const UserInfo = ({user, setUser, language}) => {

        const [delForm, setDelForm] = useState(false);

        const [editAcc, setEditAcc] = useState(false);

        const [searchFr, setSearchFr] = useState('');

        const [usersData, setUsersData] = useState('');

        const exitAcc = () => {
            setUser("");
            localStorage.removeItem("userName");
            localStorage.removeItem("userPas");
        };

        const deleteUser = () => {
            axios.delete(`http://localhost:8080/users/${user.id}`);
            exitAcc()
        };

        // useEffect(() => {
        //     axios("http://localhost:8080/users")
        //         .then(({data}) => setUsersData(data));
        // }, []);

        useEffect(() => {
            axios("https://api.jsonbin.io/b/622dd4920618276743756686/4", {
                headers: {
                    "secret-key": "$2b$10$FZuYL8gwJW/Fr2C3mPfx2ewVtvWizZa92QbNKBI6TuxuYDmU0Qt6."
                }
            })
                .then(({data}) => setUsersData(data.users));
            console.log(usersData)
        }, []);


// Function for change User data
        const changeUserData = (e) => {

            e.preventDefault();


            let imgUser = e.target[0].value;
            let newLogin = e.target[1].value;
            let oldPass = e.target[2].value;
            let newPass = e.target[3].value;

            if (newLogin === "") {
                newLogin = user.login
            }
            if (newPass === "") {
                newPass = user.password
            }
            if (imgUser === "") {
                imgUser = user.img
            }

            // Check user login used or not function
            function checkIs(elem) {
                return elem.login === newLogin
            }


            if (imgUser !== "") {
                const trueFalse = () => {
                    try {
                        new URL(imgUser);
                        return true
                    } catch {
                        language === "ru"
                            ? alert("Введите ссылку на изображение или оставьте строку пустой!")
                            : alert("Enter the link to the image or leave the line blank!");
                        return false
                    }
                };
                if (trueFalse()) {
                    axios("http://localhost:8080/users")
                        .then(({data}) => {
                            if (data.some(checkIs) && newLogin !== user.login) {
                                language === "ru"
                                    ? alert("Логин используется!")
                                    : alert("Login used!")
                            } else {

                                if (oldPass === user.password) {
                                    axios.patch(`http://localhost:8080/users/${user.id}`, {
                                        login: newLogin,
                                        password: newPass,
                                        img: imgUser
                                    });
                                    localStorage.setItem("userName", newLogin);
                                    localStorage.setItem("userPas", newPass);
                                    window.location.href = "/"

                                } else {
                                    language === "ru"
                                        ? alert("Введенный пароль не совпадает со старым")
                                        : alert("The entered password does not match the old one")
                                }
                            }
                        })
                }

            }
        };

        if (user === "") {
            window.location.href = "/"
        }

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
                            <NavLink to="/" onClick={() => deleteUser()} className="button">
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
                                    <img onClick={() => {
                                        setEditAcc(!editAcc)
                                    }} className="UserPage__editBtn" src={edit} alt="edit icon"/>
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

                        <div className="searchAccounts" style={{display: editAcc ? "none" : "flex"}}>

                            <div className="searchAccounts__inputAndImage">
                                <h2 className="searchAccounts__inputAndImage_title">
                                    {language === "ru"
                                        ? "Поиск пользователей"
                                        : "Search for users"
                                    }
                                </h2>
                                <img className="searchAccounts__inputAndImage_img" src={search} alt="searchImg"/>
                            </div>

                            <input onChange={(e) => setSearchFr(e.target.value)} className="searchAccounts__input"
                                   type="text"/>

                            <div className="searchAccounts__accountsDiv">

                                {
                                    searchFr !== ""
                                        ?
                                        usersData !== ""
                                            ? usersData.filter((element) => element.login !== user.login).filter((item) => item.login.toLowerCase().includes(searchFr.toLowerCase())).map((item) => (
                                                <div key={item.id} className="searchAccounts__accountsDiv_userCard">
                                                    <img src={item.img} alt={item.login}/>
                                                    <div>
                                                        <h4>{item.login}</h4>
                                                        <span>{item.date}</span>
                                                    </div>

                                                </div>
                                            ))
                                            : ""
                                        : ""
                                }


                            </div>

                        </div>

                        {editAcc
                            ? <form onSubmit={(e) => {
                                changeUserData(e)
                            }} className="changeUserSettings">
                                <h2>
                                    {language === "ru"
                                        ? "Фото профиля:"
                                        : "Profile picture:"}
                                </h2>
                                <input placeholder={language === "ru" ? "Ссылка на изображение:" : "url to picture:"}
                                       type="text"/>
                                <h2>
                                    {language === "ru"
                                        ? "Введите новое имя пользователя"
                                        : "Enter a new username:"}
                                </h2>
                                <input type="text"/>
                                <h2>
                                    {language === "ru"
                                        ? "Подтвердите ваш старый пароль:"
                                        : "Confirm your old password:"}
                                </h2>
                                <input required type="text"/>
                                <h2>
                                    {language === "ru"
                                        ? "Введите ваш новый пароль:"
                                        : "Enter your new password:"}
                                </h2>
                                <input type="text"/>

                                <div className="changeUserSettings__btnsRow">
                                    <button className="confirmBtn">
                                        {language === "ru" ? "Сохранить" : "Confirm"}
                                    </button>
                                    <button type="button" onClick={() => setEditAcc(!editAcc)} className="confirmBtn">
                                        {language === "ru" ? "Отменить" : "Cancel"}
                                    </button>
                                </div>

                            </form>
                            : ""
                        }


                        <div className="UserPage__buttons">
                            <NavLink className="UserPage__btn" to="/" onClick={() => exitAcc()}>
                                {language === "ru" ? "Выйти с аккаунта" : "Exit from account"}
                            </NavLink>
                            <button style={{display: editAcc ? "flex" : "none"}} onClick={() => {
                                setDelForm(!delForm)
                            }} className="UserPage__btn">
                                {language === "ru" ? "Удалить аккаунт" : "Delete account"}
                            </button>
                        </div>

                    </div>


                </div>

            </div>
        );
    }
;

export default UserInfo;