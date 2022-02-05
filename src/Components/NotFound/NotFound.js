import React from 'react';
import './notfound.css';
import chicken from "./notFoundChicken.png"

const NotFound = ({language}) => {
    return (
        <main className="notFoundPage">

            <div className="container">

                <div className="notFoundPage-row">
                    <img className="notFoundPage-chicken" src={chicken} alt="chicken"/>
                    <h2 className="notFoundPage-error">
                        {language === 'ru' ? "Извините, но, страница не найдена:(" : "Sorry, but page isn't found:("}
                    </h2>
                </div>

            </div>
        </main>
    );
};

export default NotFound;