import React, {useState, useEffect} from 'react';
import "./casepage.css";
import axios from "axios";

const CasePage = ({csgoCards, language}) => {

    const [click, setClick] = useState("none");
    const [number, setNumber] = useState(20);

    const func = () => {
        if (click === "none") {
            setClick("first")
        }
        if (click === "first") {
            setClick("second")
        }
        if (click === "second") {
            setClick("first")
        }
        setNumber(number - 1);

    };


    let rand;


    if (number === 0) {
        rand = csgoCards[Math.floor(Math.random() * csgoCards.length)];
        rand.price = 0;
    }

    return (
        <main className="casePage">

            <div className="container">

                <div className="casePage__row">

                    <h2 className="numbersCase">100% Скидка на случайный скин</h2>

                    <h2 className="numbersCase">{language === "ru" ? `Кликните ${number} раз чтобы открыть кейс` : `Click ${number} times for open box`}</h2>

                    {number > 0 ?
                        <div onClick={() => func()}
                             className={click === "first" ? "casePage__caseImg rot" : click === "second" ? "casePage__caseImg rotRev" : "casePage__caseImg"}>

                        </div>
                        : <div
                            className={rand.rare === 1 ? "itemFromCase legend" : rand.rare === 2 ? "itemFromCase megaRare" : rand.rare === 3 ? "itemFromCase rare" : rand.rare === 4 ? "itemFromCase raree" : rand.rare === 5 ? "itemFromCase default" : ""}>
                            <img src={rand.url} alt={rand.name}/>
                            <h4 className="itemName">{rand.gun} | {rand.name}</h4>
                        </div>
                    }


                </div>

            </div>

        </main>
    );
};

export default CasePage;