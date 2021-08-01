import React from 'react'
import Card from '../components/Card'

const Home = ({ data, addProduct, removeProduct }) => {

    if (data) {
        return (
            <main>
                {data.map((product) => {
                    const { id } = product;
                    return (
                        <Card key={id} removeProduct={removeProduct} addProduct={addProduct} product={product} />
                    );
                })}
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
