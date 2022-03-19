import React, {useState} from 'react';
import axios from "axios";
import "./loginform.css";


const Login = ({csgoCards, setLog, language, setUser}) => {

    const [loginInp, setLoginInp] = useState("");
    const [passInp, setPassInp] = useState("");


    const loginFunc = (e) => {
        e.preventDefault();

        let login = loginInp;
        let pass = passInp;

        function checkIs(elem) {
            return elem.login === login
        }

        axios("http://localhost:8080/users")
            .then(({data}) => {
                if (data.some(checkIs)) {
                    data.forEach((item) => {
                        if (item.login === login) {
                            if (item.password === pass) {
                                setUser({
                                    login: item.login,
                                    password: item.password,
                                    img: item.img,
                                    date: item.date,
                                    cart: [],
                                    id: item.id
                                });
                                localStorage.setItem("userName", item.login);
                                localStorage.setItem("userPas", item.password);
                                setLog("logged");
                            } else {
                                language === "ru"
                                    ? alert("Вы ввели не правильный пароль!")
                                    : alert("Wrong password!")
                            }

                        }

                    })

                } else {
                    language === "ru"
                        ? alert("Логин не найден!")
                        : alert("Login isn't found!")

                }

            });


    };

    const registerFunc = (e) => {
        e.preventDefault();

        let login = loginInp;
        let pass = passInp;

        let registerDate = new Date();

        let day = registerDate.getDay();
        let month = registerDate.getMonth();
        let year = registerDate.getFullYear();
        let minutes = registerDate.getMinutes();
        let hours = registerDate.getHours();

        if (day <= 9) {
            day = "0" + day
        }
        if (minutes <= 9) {
            minutes = "0" + minutes
        }
        if (hours <= 9) {
            hours = "0" + hours
        }
        if (month <= 9) {
            month = "0" + month
        }

        function checkIs(elem) {
            return elem.login === login
        }

        axios("http://localhost:8080/users")
            .then(({data}) => {
                if (data.some(checkIs)) {
                    language === "ru"
                        ? alert("Аккаунт существует!")
                        : alert("Account exists!")

                } else {
                    axios.post("http://localhost:8080/users", {
                        "login": login,
                        "password": pass,
                        "cart": [],
                        "id": data.length + 1,
                        "date": `${hours}:${minutes} / ${day}-${month}-${year}`,
                        "img": "https://konplan.com/wp-content/uploads/2021/07/avatar-mann_shutterstock_518740741-scaled-e1627298799822.jpg"
                    });
                    setLog("logged");
                    if (language === "ru") {
                        alert("Аккаунт успешно создан!")
                    } else {
                        alert("Account successfully created!")
                    }
                }

            })


    };


    return (
        <div className="Login__screen">

            <form className="Login__form">
                <input onChange={(e) => setLoginInp(e.target.value)} type="text"
                       placeholder={language === "ru" ? "Логин:" : "Login:"}/>
                <input onChange={(e) => setPassInp(e.target.value)} type="password"
                       placeholder={language === "ru" ? "Пароль:" : "Password:"}/>
                <button onClick={(e) => loginFunc(e)}>
                    Login
                </button>
                <button onClick={(e) => registerFunc(e)}>
                    Register
                </button>
            </form>

            <span onClick={() => setLog("neutral")} className="Login__screen_close">x</span>

        </div>
    );
};

export default Login;