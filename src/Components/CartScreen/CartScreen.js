import React, {useState} from 'react';
import "./Cts.css"

const CartScreen = ({language, csgoCards, cart, setCart}) => {

    const [cartState, setCartState] = useState(false);

    return (
        <div className={cartState ? "cartScreen CartHide" : "cartScreen"}>

            <div className={cartState ? "cartScreen__arrow down" : "cartScreen__arrow"}
                 onClick={(e) => setCartState(!cartState)}>
                <svg className="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.29289 15.2929C3.90237 15.6834 3.90237 16.3166 4.29289 16.7071C4.68342 17.0976 5.31658 17.0976 5.70711 16.7071L4.29289 15.2929ZM12 9L12.7071 8.29289C12.3166 7.90237 11.6834 7.90237 11.2929 8.29289L12 9ZM18.2929 16.7071C18.6834 17.0976 19.3166 17.0976 19.7071 16.7071C20.0976 16.3166 20.0976 15.6834 19.7071 15.2929L18.2929 16.7071ZM5.70711 16.7071L12.7071 9.70711L11.2929 8.29289L4.29289 15.2929L5.70711 16.7071ZM11.2929 9.70711L18.2929 16.7071L19.7071 15.2929L12.7071 8.29289L11.2929 9.70711Z"
                        fill="white"/>
                </svg>
            </div>

            <div className="container">

                <div className={cartState ? "cartScreen__itemsRow hide" : "cartScreen__itemsRow"}>

                    {cart.map((item) =>
                        <div style={{border: "2px solid #fff"}} onClick={() => {
                            setCart(cart.filter((el) => item.id !== el.id));
                            (csgoCards.map((element) => element.id === item.id ? element.checked = !element.checked : ""));
                            localStorage.setItem("cards", csgoCards);
                            localStorage.setItem("carts", cart)
                        }}
                             data-name={`${item.gun} ${item.name}`.toLowerCase()} key={item.id}
                             data-price={item.price}
                             className={item.rare === 1 ? "cartItem legend" : item.rare === 2 ? "cartItem megaRare" : item.rare === 3 ? "cartItem rare" : item.rare === 4 ? "cartItem raree" : item.rare === 5 ? "cartItem default" : ""}>
                            <img src={item.url} alt={item.name}/>
                            <h4>{item.gun} |<br/> {item.name}</h4>
                            <h4 className="itemPrice">{language === "ru" ? `${item.price} сом` : `${item.price} som`}</h4>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default CartScreen;