import React, {useState} from 'react';
import "./cartPage.css";
import cartIcon from "./Shopping_Cart_01.svg";
import searchIcon from "./search.png";


const CartPage = ({cart, allSum, language, setCart}) => {

    const [search, setSearch] = useState('');

    return (
        <main className="cartPage">

            <div className="container">

                <div className="cartPage__row">

                    <h2 className="cartPage__pageName">
                        {language === "ru" ? "Корзина:" : "Cart:"}
                    </h2>

                    <div className="cartPage__infoRow">
                        <h2>{
                            language === "ru" ? `Количество предметов: ${cart.length}`
                                : `Items count: ${cart.length}`
                        }</h2>

                        <h2>
                            {language === "ru"
                                ? `Общая сумма: ${allSum} сом`
                                : `All price: ${(allSum / 106).toFixed(2)}$`
                            }
                        </h2>

                    </div>

                    <div className="cartPage__btnAndSearch">
                        <button className="cartPage__btnAndSearch_buyBtn">
                            {language === "ru" ? "Оформить покупку" : "purchase"}
                        </button>
                        <div className="cartPage__btnAndSearch_search">
                            <img src={searchIcon} alt="search icon"/>
                            <input onChange={(e) => setSearch(e.target.value)} type="text"
                                   className="cartPage__search_input"/>
                        </div>
                    </div>


                    <div className="cartPage__items">
                        {
                            cart.length !== 0 ?
                                cart.filter((item) => item.name.toLowerCase() + item.gun.toLowerCase().includes(search.toLowerCase())).map((item) => (
                                    `${item.gun} ${item.name}`.toLowerCase().includes(search.toLowerCase()) ?
                                        <div style={{
                                            border: item.checked ? "#fff 2px solid" : "",
                                            backgroundColor: item.checked ? "#ffffff30" : ""
                                        }} onDoubleClick={() => {
                                            item.checked = !item.checked;
                                            setCart(!cart.includes(item) ? [...cart, item] : [...cart.filter((el) => el !== item)])
                                        }}
                                             data-filter={item.rare === 1 ? "legend" : item.rare === 2 ? "megaRare" : item.rare === 3 ? "rare" : item.rare === 4 ? "raree" : item.rare === 5 ? "default" : ""}
                                             data-name={`${item.gun} ${item.name}`.toLowerCase()} key={item.id}
                                             data-price={item.price}
                                             className={item.rare === 1 ? "cartItem legend" : item.rare === 2 ? "cartItem megaRare" : item.rare === 3 ? "cartItem rare" : item.rare === 4 ? "cartItem raree" : item.rare === 5 ? "cartItem default" : ""
                                             }>
                                            <img src={item.url} alt={item.name}/>
                                            <h4>{item.gun} |<br/> {item.name}</h4>
                                            <h4 className="itemPrice">{language === "ru" ? `${item.price} сом` : `${(item.price / 106).toFixed(2)} $`}</h4>
                                        </div>
                                        : ""
                                ))
                                : <div className="cartEmpty">
                                    <h2>
                                        {language === "ru" ? "Корзина пуста :(" : "Cart is empty :("}
                                    </h2>
                                    <img src={cartIcon} alt="cart icon"/>
                                </div>
                        }

                    </div>

                </div>

            </div>

        </main>
    );
};

export default CartPage;