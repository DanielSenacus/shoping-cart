import React from 'react'

const Cart = ({ cartItems, addProduct, removeProduct }) => {

    const IVA = 19;

    const productsPrice = cartItems.reduce((a, c) => a + c.price * c.cantidad, 0);
    const taxPrice = productsPrice * (IVA / 100);
    const totalPrice = productsPrice + taxPrice;
    console.log(IVA);

    return (
        <section>
            <div className="banner">
                <h1>Cart items</h1>
                {cartItems.length === 0 && <h1>No hay productos 😢</h1>}
            </div>
            <div className="cart_section">
                <div className="cart_section_products">
                    {cartItems.map((item) => {
                        const { id, img, price, product_name, cantidad } = item
                        return (
                            <div key={id} className="cartItem">
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
                                    <h2>{cantidad} x ${price}</h2>
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
                        <button>Checkout</button>
                    </div>

                }
            </div>
        </section>
    );
}

export default Cart
