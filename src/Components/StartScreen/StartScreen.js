import React from 'react';
import "./startscreen.css";
import {Link} from "react-router-dom";

const StartScreen = ({language}) => {
    return (
        <main className="startScreen">
            <div className="container">
                <section className="startScreen__row">

                    <h2 className="startScreen__row-title">
                        {language === 'ru' ? "Торговая площадка для покупки/продаж скинов по Dota 2 и CS GO" : "Trading platform for\n" +
                            "purchases/sales of Dota 2 skins\n" +
                            "and CS GO"}
                    </h2>

                    <Link to='/shop' className="startScreen__row-btn">
                        {language === 'ru' ? "Перейти к площадке" : "Go to platform"}
                    </Link>

                </section>

            </div>
        </main>
    );
};

export default StartScreen;