import React from 'react'
import Bill from '../components/Bill';

const Sales = ({ sales, pedidos }) => {

    const [showBill, setShowBill] = React.useState(false)

    const showHideBill = () => {
        setShowBill(!showBill)
    };

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
