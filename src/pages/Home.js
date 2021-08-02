import React from 'react'
import Card from '../components/Card'

const Home = ({ data, addProduct, removeProduct }) => {

    if (data) {
        return (
            <main>
                {data.map((product) => {
                    const { product_id } = product;
                    return (
                        <Card key={product_id} removeProduct={removeProduct} addProduct={addProduct} product={product} />
                    );
                })}
                <button className="more_res">1</button>
                <button className="more_res">2</button>

            </main>
        )
    } else

        return (
            <main>
                <h1>loading...</h1>
            </main>
        )


}

export default Home
