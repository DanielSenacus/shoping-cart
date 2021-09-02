import React from 'react'
import Card from '../components/Card'

const Home = ({ data, addProduct, removeProduct, setPages }) => {

    if (data) {
        return (
            <main>
                {data.map((product) => {
                    const { product_id } = product;
                    return (
                        <Card key={product_id} removeProduct={removeProduct} addProduct={addProduct} product={product} />
                    );
                })}

                <div className="res_container">
                    <button onClick={() => setPages(2)} className="more_res">2</button>
                    <button onClick={() => setPages(3)} className="more_res">3</button>
                </div>


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
