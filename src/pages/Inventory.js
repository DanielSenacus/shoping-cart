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
            <section className="inventory_section">

                {stock.map((item) => {

                    const { product_name, stock_amount, stock_id, img } = item;
                    return (
                        <div className="stock_card" key={stock_id}>
                            <div className="content">
                                <div className="front">
                                    <img src={img} alt={product_name} />
                                </div>
                                <div className="back">
                                    {stock_amount}
                                </div>
                            </div>
                        </div>
                    );
                })}

            </section>
        );
    } else {
        return (
            <section className={"inventory_section"}>
                <h1>holis </h1>
            </section>
        );
    }
}

export default Inventory
