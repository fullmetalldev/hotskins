import React, {useState, useEffect} from 'react';
import "./shopscreen.css"
import csgoIcon from '../../images/icons8-counter-strike-global-offensive-64.png';
import dotaIcon from '../../images/icons8-dota-2-58.png';
import axios from "axios";
import searchPNG from "./search.png";
import refreshPNG from "./refresh.png";

const ShopScreen = ({language, cart, setCart}) => {

    const [game, setGame] = useState(localStorage.getItem('game'));
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        setGame(localStorage.getItem('game'));
        loadItems();
    }, []);

    const loadItems = () => {
        axios(`http://localhost:8080/${game}`)
            .then(({data}) => setCards(data));
    };

    const rel = () => {
        document.querySelector('.rowForItems').style.display = 'none';
        axios(`http://localhost:8080/${game}`)
            .then(({data}) => setCards(data));
        setTimeout(() => {
            document.querySelector('.rowForItems').style.display = 'flex';
        }, 100);


        document.querySelector('.reloadArrows').classList.toggle('rotate');
        setTimeout(() => {

            document.querySelector('.reloadArrows').classList.toggle('rotate');
        }, 300);
    };


    const setCSGO = () => {
        setGame('csgo');
        let cards = document.querySelectorAll(".shopCard");
        cards.forEach((card) => {
            card.style.display = 'flex'
        });
        localStorage.setItem('game', 'csgo');
        axios(`http://localhost:8080/csgo`)
            .then(({data}) => setCards(data));
        document.querySelectorAll('.shopScreen__items-checkbox').forEach((item) => {
            item.checked = false
        })
    };

    const setDota = () => {
        setGame('dota2');
        let cards = document.querySelectorAll(".shopCard");
        cards.forEach((card) => {
            card.style.display = 'flex'
        });
        localStorage.setItem('game', 'dota2');
        axios(`http://localhost:8080/dota2`)
            .then(({data}) => setCards(data));
        document.querySelectorAll('.shopScreen__items-checkbox').forEach((item) => {
            item.checked = false
        })

    };

    const setRare = (e) => {
        let cards = document.querySelectorAll(".shopCard");
        cards.forEach((card) => {
            card.dataset.filter === e ? card.style.display = 'flex' : card.style.display = "none"
        })
    };

    const unsetRare = (e) => {
        e.target.checked = false;
        let cards = document.querySelectorAll(".shopCard");
        cards.forEach((card) => {
            card.style.display = 'flex'
        })

    };

    return (
        <main className="shopScreen">
            <section className="shopScreen__gameSectionBack">
                <div className="container">
                    <div className="shopScreen__games">
                        <h2 className="shopScreen__games-title">
                            {language === 'ru' ? 'Торговая площадка' : "Trading place"}
                        </h2>
                        <div data-test='csgo' className="shopScreen__games-select">
                            <div className="shopScreen__games-select_csgo" onClick={() => setCSGO()}>
                                <img src={csgoIcon} alt="cs:go icon"/>
                                <h2>CS:GO</h2>
                            </div>
                            <div data-test='dota2' className="shopScreen__games-select_dota"
                                 onClick={() => setDota()}>
                                <img src={dotaIcon} alt="csgo icon"/>
                                <h2>Dota 2</h2>
                            </div>
                            <div
                                className={game === 'csgo' ? "shopScreen__games-select_selector" : "shopScreen__games-select_selector selectorActive"}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shopScreen__items">
                <div className="container">

                    <div className="shopScreen__items-searchAndTitle">
                        <h2 className='shopScreen__items-title'>
                            {language === 'ru' ? 'Каталог товаров' : "Catalog of items"}
                        </h2>
                        <div className="shopScreen__items-search">
                            <img src={searchPNG} alt="search icon"/>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text"
                                   placeholder={language === 'ru' ? "Введите название" : "Enter the name"}/>
                        </div>
                    </div>

                    <div className="shopScreen__items-rareOfItems">
                        <div className="flex_for-checkboxes">
                            <h2 className="shopScreen__items-rareOfItems-title">
                                {language === 'ru' ? 'Редкость' : "Rare"}
                            </h2>
                            <input onDoubleClick={(e) => unsetRare(e)} data-filter='legend'
                                   onChange={(e) => setRare(e.target.dataset.filter)}
                                   className="shopScreen__items-checkbox legend" name="rare" type="radio"/>
                            <input onDoubleClick={(e) => unsetRare(e)}
                                   onChange={(e) => setRare(e.target.dataset.filter)} data-filter='megaRare'
                                   className="shopScreen__items-checkbox megaRare" name="rare"
                                   type="radio"/>
                            <input onDoubleClick={(e) => unsetRare(e)}
                                   onChange={(e) => setRare(e.target.dataset.filter)} data-filter='rare'
                                   className="shopScreen__items-checkbox rare" name="rare"
                                   type="radio"/>
                            <input onDoubleClick={(e) => unsetRare(e)}
                                   onChange={(e) => setRare(e.target.dataset.filter)} data-filter='raree'
                                   className="shopScreen__items-checkbox raree" name="rare"
                                   type="radio"/>
                            <input onDoubleClick={(e) => unsetRare(e)}
                                   onChange={(e) => setRare(e.target.dataset.filter)} data-filter='default'
                                   className="shopScreen__items-checkbox default" name="rare"
                                   type="radio"/>
                        </div>

                        <div className="reloadButton">
                            <img className="reloadArrows" src={refreshPNG} alt="refresh icon"/>
                            <h3 onClick={() => rel()}>
                                {language === 'ru' ? 'Обновить' : "Refresh"}
                            </h3>
                        </div>

                    </div>


                </div>

            </section>

            <section className="itemsSection">
                <div className="container">

                    <div className="rowForItems">

                        {

                            cards.filter((item) => item.name.toLowerCase() + item.gun.toLowerCase().includes(search.toLowerCase())).map((item) => (
                                `${item.gun} ${item.name}`.toLowerCase().includes(search.toLowerCase()) ?
                                    <div style={{border: item.checked ? "white 1px solid" : "", backgroundColor: item.checked ? "#272E3B" : ""}} onClick={() => {
                                        item.checked = !item.checked;
                                        setCart(!cart.includes(item) ? [...cart, item] : [...cart])
                                    }}
                                         data-filter={item.rare === 1 ? "legend" : item.rare === 2 ? "megaRare" : item.rare === 3 ? "rare" : item.rare === 4 ? "raree" : item.rare === 5 ? "default" : ""}
                                         data-name={`${item.gun} ${item.name}`.toLowerCase()} key={item.id}
                                         data-price={item.price}
                                         className={item.rare === 1 ? "shopCard legend" : item.rare === 2 ? "shopCard megaRare" : item.rare === 3 ? "shopCard rare" : item.rare === 4 ? "shopCard raree" : item.rare === 5 ? "shopCard default" : ""
                                         }>
                                        <span className="shopCard__take" style={{display: item.checked ? "flex" : "none"}}>✔</span>
                                        <img src={item.url} alt={item.name}/>
                                        <h4>{item.gun} |<br/> {item.name}</h4>
                                        <h4 className="itemPrice">{item.price + " сом"}</h4>
                                    </div>
                                    : ""
                            ))

                        }

                    </div>

                </div>
            </section>


        </main>
    );
};

export default ShopScreen;