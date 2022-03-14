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
import axios from "axios";
import Preloader from "./Components/preloader/preloader";


function App() {

    const [language, setLanguage] = useState('ru');
    const [cart, setCart] = useState([]);
    const [csgoCards, setCsgoCards] = useState([]);

    const [preload, setPreload] = useState(true);
    const [bye, setBye] = useState(false);

    let allSum = 0;

    cart.reduce((acc, rec) => {
        return allSum = (acc += rec.price)
    }, 0);

    useEffect(() => {
        if (csgoCards.length === 0) {

            // axios("http://localhost:8080/csgo")
            //     .then(({data}) => setCsgoCards(data));


            axios.get('https://api.jsonbin.io/b/622dd4920618276743756686/4', {
                headers: {
                    "secret-key": "$2b$10$FZuYL8gwJW/Fr2C3mPfx2ewVtvWizZa92QbNKBI6TuxuYDmU0Qt6."
                }
            }).then(({data}) => setCsgoCards(data.csgo));

        }



        setInterval(()=>{
            setBye(true)
        }, 7000);



        setInterval(()=>{
            setPreload(false)
        }, 8000)




    }, []);

    return (
        <div className="App">
            {preload ? <Preloader bye={bye}/> : ""}
            <Header allSum={allSum} cart={cart} language={language} setLanguage={setLanguage}/>
            <Routes>
                <Route path="/" element={<StartScreen language={language}/>}/>
                <Route path="/shop" element={<ShopScreen csgoCards={csgoCards} setCsgoCards={setCsgoCards} cart={cart}
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
