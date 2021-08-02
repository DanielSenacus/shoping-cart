import React from 'react'

const Bill = ({ factura, pedidos }) => {


    const { factura_id, fecha, subtotal, total_factura } = factura;
    const currentPedido = pedidos.filter((item) => item.factura_id === factura_id);
    console.log(currentPedido);
    console.log(pedidos);
    return (
        <div className="sales_section_products_active">
            <div key={factura_id} className="bill_active">

                <table id="myTable">
                    <tr>
                        <td>factura id</td>
                        <td>{factura_id}</td>
                    </tr>
                    <tr>
                        <td>fecha</td>
                        <td>{fecha}</td>
                    </tr>
                    {currentPedido.map((product) => {
                        const { cantidad, precio_unidad, product_id, product_name, subtotal_producto } = product;
                        return (
                            <tr className="product_list">
                                <td>{product_id} {product_name} ${precio_unidad} X {cantidad} = </td>
                                <td>{subtotal_producto}</td>
                            </tr>
                        );

                    })}
                    <tr>
                        <td>subtotal</td>
                        <td>{subtotal}</td>
                    </tr>
                    <tr>
                        <td>Total factura</td>
                        <td>{total_factura}</td>
                    </tr>

                </table>
            </div>
        </div>
    );

}



export default Bill


