import React from 'react'

const Cart = ({ cartItems }) => {

    if (cartItems.length === 0) {
        return (
            <section>
                <div className="banner">
                    <h1>Pobre de mierda</h1>
                    <h2>😢</h2>
                </div>
            </section>

        );
    } else {

        return (
            <section>
                <h1>holis</h1>
            </section>
        )
    }

}

export default Cart
