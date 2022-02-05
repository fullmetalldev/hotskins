import React, {useState, useEffect} from 'react';
import "./shopscreen.css"
import csgoIcon from '../../images/icons8-counter-strike-global-offensive-64.png';
import dotaIcon from '../../images/icons8-dota-2-58.png';
import axios from "axios";
import searchPNG from "./search.png";
import refreshPNG from "./refresh.png";

const ShopScreen = ({language}) => {

    const [game, setGame] = useState(localStorage.getItem('game'));
    const [Items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');


    useEffect(() => {
        setGame(localStorage.getItem('game'));
        loadItems();
    }, []);

    const loadItems = () => {
        axios(`http://localhost:8080/${game}`)
            .then(({data}) => setItems(data));
    };

    const rel = ()=>{
        axios(`http://localhost:8080/${game}`)
            .then(({data}) => setItems(data));
        document.querySelectorAll('.shopCard').forEach((item)=>{
            item.style.display = 'none'
        });
        document.querySelector('.reloadArrows').classList.toggle('rotate');
        setTimeout(()=>{
            document.querySelectorAll('.shopCard').forEach((item)=>{
                item.style.display = 'flex'
            });
            document.querySelector('.reloadArrows').classList.toggle('rotate');
        }, 300);
    };

    if (filter !== ''){
        document.querySelectorAll('.shopCard').forEach((item)=>{
            if (item.dataset.filter === filter){
                item.style.display = 'flex';
            } else {
                item.style.display = 'none'
            }
        })
    } else {
        document.querySelectorAll('.shopCard').forEach((item)=>{
            item.style.display = 'flex'
        })
    }

    const setCSGO = () => {
        setGame('csgo');
        localStorage.setItem('game', 'csgo');
        axios(`http://localhost:8080/csgo`)
            .then(({data}) => setItems(data));
    };

    const setDota = () => {
        setGame('dota2');
        localStorage.setItem('game', 'dota2');
        axios(`http://localhost:8080/dota2`)
            .then(({data}) => setItems(data));

    };

    const removeFilter = (e)=>{
        e.target.checked = false;
        setFilter('');

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
                            <input onDoubleClick={(e)=> (filter === e.target.dataset.filter ? removeFilter(e) : "")} data-filter='legend'
                                   onChange={(e)=> !e.checked ? setFilter(e.target.dataset.filter) : ""}
                                className="shopScreen__items-checkbox legend" name="rare" type="radio"/>
                            <input onDoubleClick={(e)=> (filter === e.target.dataset.filter ? removeFilter(e) : "")} data-filter='megaRare' onChange={(e)=> !e.checked ? setFilter(e.target.dataset.filter) : ""}
                                className="shopScreen__items-checkbox megaRare" name="rare" type="radio"/>
                            <input onDoubleClick={(e)=> (filter === e.target.dataset.filter ? removeFilter(e) : "")} data-filter='rare' onChange={(e)=> !e.checked ? setFilter(e.target.dataset.filter) : ""}
                                className="shopScreen__items-checkbox rare" name="rare" type="radio"/>
                            <input onDoubleClick={(e)=> (filter === e.target.dataset.filter ? removeFilter(e) : "")} data-filter='raree' onChange={(e)=> !e.checked ? setFilter(e.target.dataset.filter) : ""}
                                className="shopScreen__items-checkbox raree" name="rare" type="radio"/>
                            <input onDoubleClick={(e)=> (filter === e.target.dataset.filter ? removeFilter(e) : "")} data-filter='default' onChange={(e)=> !e.checked ? setFilter(e.target.dataset.filter) : ""}
                                className="shopScreen__items-checkbox default" name="rare" type="radio"/>
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

                        {search === '' ? Items.map((item) => (
                                <div data-filter={item.rare === 1 ? "legend" : item.rare === 2 ? "megaRare" : item.rare === 3 ? "rare" : item.rare === 4 ? "raree" : item.rare === 5 ? "default" : ""} data-name={`${item.gun} ${item.name}`.toLowerCase()} key={item.id}
                                     data-price={item.price}
                                     className={item.rare === 1 ? "shopCard legend" : item.rare === 2 ? "shopCard megaRare" : item.rare === 3 ? "shopCard rare" : item.rare === 4 ? "shopCard raree" : item.rare === 5 ? "shopCard default" : ""}>
                                    <img src={item.url} alt={item.name}/>
                                    <h4>{item.gun} |</h4>
                                    <h4>{item.name}</h4>
                                    <h4 className="itemPrice">{item.price + " сом"}</h4>
                                </div>
                            ))
                            : Items.map((item) => (
                                `${item.gun} ${item.name}`.toLowerCase().includes(search.toLowerCase()) ?
                                    <div data-filter={item.rare === 1 ? "legend" : item.rare === 2 ? "megaRare" : item.rare === 3 ? "rare" : item.rare === 4 ? "raree" : item.rare === 5 ? "default" : ""} data-name={`${item.gun} ${item.name}`.toLowerCase()} key={item.id}
                                         data-price={item.price}
                                         className={item.rare === 1 ? "shopCard legend" : item.rare === 2 ? "shopCard megaRare" : item.rare === 3 ? "shopCard rare" : item.rare === 4 ? "shopCard raree" : item.rare === 5 ? "shopCard default" : ""}>
                                        <img src={item.url} alt={item.name}/>
                                        <h4>{item.gun} |</h4>
                                        <h4>{item.name}</h4>
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