import React from 'react'

const Inventory = () => {

    const [stock, setStock] = React.useState(null);

    const getStock = async () => {
        const request = new XMLHttpRequest();
        request.open('get', 'http://localhost:5000/stock', true);


        request.onerror = function (err) {
            console.log(err);
        }
        request.onload = function () {
            if (request.status === 200) {
                const result = JSON.parse(request.responseText);
                console.log(result);
                setStock(result);
            }
        }
        request.send();
    };

    React.useEffect(() => {
        getStock();
    }, [])
    console.log(stock);

    if (stock) {
        return (
            <section>
                <div className="Inventory">
                    {stock.map((item) => {

                        const { product_name, stock } = item;
                        return (
                            <div className="Inventory_based">
                                <h1>{product_name}</h1>
                                <h2>{stock}</h2>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    } else {
        return (
            <section>
                <h1>holis </h1>
            </section>
        );
    }
}

export default Inventory
