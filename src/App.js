import React, {useState} from "react";
import Header from "./Components/Header/Header";
import {Routes, Route} from "react-router-dom";
import "./style.css";
import Footer from "./Components/Footer/Footer";
import StartScreen from "./Components/StartScreen/StartScreen";
import NotFound from "./Components/NotFound/NotFound";
import ShopScreen from "./Components/ShopScreen/ShopScreen";


function App() {

    const [language, setLanguage] = useState('ru');

    return (
        <div className="App">
            <Header language={language} setLanguage={setLanguage}/>
            <Routes>
                <Route path="/" element={<StartScreen language={language}/>}/>
                <Route path="/shop" element={<ShopScreen language={language}/>}/>
                <Route path="/*" element={<NotFound language={language}/>}/>
            </Routes>
            <Footer language={language}/>
        </div>
    );
}

export default App;
