import React from 'react'
import PagoRealizado from '../components/PagoRealizado';
import axios from 'axios'

const Cart = ({ cartItems, addProduct, removeProduct, cleanCart }) => {

    const [play, setPlay] = React.useState(false)

    const animacionPlay = () => {
        setPlay(true)
        setTimeout(() => {
            setPlay(false)
        }, 2000)
    };



    const IVA = 19;

    const productsPrice = cartItems.reduce((a, c) => a + c.price * c.cantidad, 0);
    const taxPrice = productsPrice * (IVA / 100);
    const totalPrice = productsPrice + taxPrice;
    console.log(IVA);

    const createDate = () => {
        const date = new Date();
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        const fecha = `${year}/${month}/${day}`
        return fecha;
    };




    const addFactura = () => {

        const article = { "subtotal": productsPrice, "totalPrice": totalPrice, cartItems, "fecha": createDate() };
        axios.post('http://localhost:5000/add', article)
            .then(response => console.log(response.data));

        const inventary = axios.put('http://localhost:5000/update', { cartItems });
        animacionPlay();
        cleanCart();


    }


    return (
        <section>
            <div className="banner">
                <h1>Cart items</h1>
                {cartItems.length === 0 && <h1>No hay productos 😢</h1>}
            </div>
            <div className="cart_section">
                <div className="cart_section_products">
                    {cartItems.map((item) => {
                        const { product_id, img, price, product_name, cantidad } = item
                        return (
                            <div key={product_id} className="cartItem">
                                <div className="description">
                                    <img src={img} alt={product_name} />
                                    <h1>{product_name}</h1>
                                </div>

                                <div className="buttons">
                                    <button onClick={() => removeProduct(item)} className="button_remove">-</button>
                                    <label>{cantidad}</label>
                                    <button onClick={() => addProduct(item)} className="button_add">+</button>
                                </div>
                                <div className="prices">
                                    <h2>{cantidad} x ${price * cantidad}</h2>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {cartItems.length !== 0 &&
                    <div className="total">
                        <h1>Totales</h1>
                        <div className="total_results">
                            <h3>Products Price:</h3>
                            <h4>{productsPrice}</h4>
                        </div>
                        <div className="total_results">
                            <h3>IVA Price:</h3>
                            <h4>{IVA}</h4>
                        </div>
                        <div className="total_results">
                            <h3>Total Price:</h3>
                            <h4>{totalPrice.toFixed(2)}</h4>
                        </div>
                        <button onClick={addFactura}>Checkout</button>
                    </div>

                }
                {play && <PagoRealizado></PagoRealizado>}
            </div>
        </section>
    );

}

export default Cart
