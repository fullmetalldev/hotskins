import React, {useState, useEffect} from "react";
import Header from "./Components/Header/Header";
import {Routes, Route} from "react-router-dom";
import "./style.css";
import Footer from "./Components/Footer/Footer";
import StartScreen from "./Components/StartScreen/StartScreen";
import NotFound from "./Components/NotFound/NotFound";
import ShopScreen from "./Components/ShopScreen/ShopScreen";
import CartPage from "./Components/CartPage/CartPage";
import Contacts from "./Components/Contacts/Contacts";
import CasePage from "./Components/CasePage/CasePage";
import Preloader from "./Components/preloader/preloader";
import Login from "./Components/LoginForm/Login";
import UserInfo from "./Components/UserInfo/UserInfo";
import listSkins from './db.json'


function App() {

    const [language, setLanguage] = useState('ru');
    const [cart, setCart] = useState([]);
    const [csgoCards, setCsgoCards] = useState(listSkins.csgo);

    const [preload, setPreload] = useState(true);
    const [bye, setBye] = useState(false);


    const [log, setLog] = useState("neutral");

    const [user, setUser] = useState("");

    let allSum = 0;

    cart.reduce((acc, rec) => {
        return allSum = (acc += rec.price)
    }, 0);


    useEffect(() => {

        // if (csgoCards.length === 0) {
        //
        //     // axios("http://localhost:8080/csgo")
        //     //     .then(({data}) => setCsgoCards(data));
        //
        //     // axios.get('https://api.jsonbin.io/b/622dd4920618276743756686/4', {
        //     //     headers: {
        //     //         "secret-key": "$2b$10$FZuYL8gwJW/Fr2C3mPfx2ewVtvWizZa92QbNKBI6TuxuYDmU0Qt6."
        //     //     }
        //     // }).then(({data}) => setCsgoCards(data.csgo));
        //
        // }

        // if (localStorage.getItem("userName") !== "") {
        //     if (localStorage.getItem("userPas") !== "") {
        //         axios("http://localhost:8080/users")
        //             .then(({data}) => data.forEach((item) => {
        //                 if (item.login === localStorage.getItem("userName")) {
        //                     if (item.password === localStorage.getItem("userPas")) {
        //                         setUser(item);
        //                     }
        //                 }
        //             }))
        //     }
        // }

        // Online json server version

        // if (localStorage.getItem("userName") !== "") {
        //     if (localStorage.getItem("userPas") !== "") {
        //         axios("https://api.jsonbin.io/b/622dd4920618276743756686/4", {
        //             headers: {
        //                 "secret-key": "$2b$10$FZuYL8gwJW/Fr2C3mPfx2ewVtvWizZa92QbNKBI6TuxuYDmU0Qt6."
        //             }
        //         })
        //             .then(({data}) => data.users.forEach((item) => {
        //                 if (item.login === localStorage.getItem("userName")) {
        //                     if (item.password === localStorage.getItem("userPas")) {
        //                         setUser(item);
        //                     }
        //                 }
        //             }))
        //     }
        // }


        setInterval(() => {
            setBye(true)
        }, 4000);


        setInterval(() => {
            setPreload(false)
        }, 5000);


    }, []);

    // useEffect(() => {
    //     if (user !== "") {
    //         axios(`http://localhost:8080/users`)
    //             .then(({data}) => {
    //                 data.forEach((item) => {
    //                     if (item.login === user.login) {
    //                         if (item.password === user.password) {
    //                             axios.put(`http://localhost:8080/users/${item.id}`, {
    //                                 "login": item.login,
    //                                 "password": item.password,
    //                                 "cart": [...cart],
    //                                 "date": item.date,
    //                                 "img": item.img
    //                             });
    //                         }
    //                     }
    //
    //                 });
    //
    //             })
    //
    //     }
    // }, [cart]);

    return (
        <div className="App">
            {log === "opened" ?
                <Login csgoCards={csgoCards} cart={cart} setCart={setCart} log={log} user={user} setLog={setLog}
                       setUser={setUser}
                       language={language}/> : ""}
            {preload ? <Preloader bye={bye}/> : ""}
            <Header user={user} setLog={setLog} allSum={allSum} cart={cart} language={language}
                    setUser={setUser} setLanguage={setLanguage}/>
            <Routes>
                <Route path="/user" element={<UserInfo language={language} user={user} setUser={setUser}/>}/>
                <Route path="/" element={<StartScreen language={language}/>}/>
                <Route user={user} path="/shop"
                       element={<ShopScreen csgoCards={csgoCards} setCsgoCards={setCsgoCards} cart={cart}
                                            setCart={setCart} language={language}/>}/>
                <Route path="/*" element={<NotFound language={language}/>}/>
                <Route path="/cart"
                       element={<CartPage setCart={setCart} cart={cart} allSum={allSum} language={language}/>}/>
                <Route path="/contacts" element={<Contacts language={language}/>}/>
                <Route path="/case"
                       element={<CasePage setCart={setCart} cart={cart} csgoCards={csgoCards} language={language}/>}/>
            </Routes>
            <Footer language={language}/>
        </div>
    );
}

export default App;
