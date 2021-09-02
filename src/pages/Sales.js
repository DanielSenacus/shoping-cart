import React from 'react'
import Bill from '../components/Bill';

const Sales = () => {

    const [showBill, setShowBill] = React.useState(false)
    const [sales, setSales] = React.useState([]);

    const [pedidos, setPedidos] = React.useState([]);


    const showHideBill = () => {
        setShowBill(!showBill)
    };

    const getSales = async () => {
        const request = new XMLHttpRequest();
        request.open('get', 'http://localhost:5000/bills', true);


        request.onerror = function (err) {
            console.log(err);
        }
        request.onload = function () {
            if (request.status === 200) {
                const result = JSON.parse(request.responseText);
                setSales(result);
            }
        }
        request.send();
    };

    const getPedidos = async () => {
        const request = new XMLHttpRequest();
        request.open('get', 'http://localhost:5000/pedidos', true);


        request.onerror = function (err) {
            console.log(err);
        }
        request.onload = function () {
            if (request.status === 200) {
                const result = JSON.parse(request.responseText);
                setPedidos(result);
            }
        }
        request.send();
    };

    React.useEffect(() => {

        getSales();
        getPedidos();
    }, [])


    console.log(sales);


    return (
        <section>
            <div className="banner">
                <h1>VENTAS</h1>
                {sales.length === 0 && <h1>No hay Ventas todavia 😢</h1>}
            </div>
            <div className="sales_section">
                <div className="sales_section_products">
                    {sales.map((item) => {
                        const { factura_id, fecha, subtotal, total_factura } = item
                        return (
                            <div key={factura_id} className={showBill ? "bill_active" : "bill"} onClick={showHideBill}>
                                <div className="description">
                                    <h1>{factura_id}</h1>
                                </div>
                                <img src="https://storage.googleapis.com/isometriclove.appspot.com/coinUSD_S.png" alt="" />

                                <div className="prices">
                                    <h2>Total factura: ${total_factura}</h2>

                                </div>
                                {showBill && <Bill pedidos={pedidos} factura={item} ></Bill>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Sales
