import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { MdClear } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';


const Card = ({ product, addProduct, removeProduct }) => {

    const [clicked, setCliked] = React.useState(false);
    const { product_id, product_name, img, price, product_description, stock_amount } = product;


    const handleClick = (product) => {
        setCliked(!clicked);
        addProduct(product)
    };

    const handleRemove = (product) => {
        setCliked(!clicked);
        removeProduct(product)
    };


    return (
        <div className="card" key={product_id}>
            <div className="wrapper">
                <div className="container">
                    <div className="top">
                        <img src={img} alt={product_name} />
                    </div>
                    <div className={clicked ? "bottom clicked" : "bottom"}>
                        <div className="left">
                            <div className="details">
                                <h1>{product_name}</h1>
                                <p>{price}</p>
                            </div>
                            <div onClick={() => handleClick(product)} className="buy">
                                <i className="material-icons"><AiOutlineShoppingCart></AiOutlineShoppingCart></i>
                            </div>
                        </div>
                        <div className="right">
                            <div className="done">
                                <i className="material-icons"><MdDone></MdDone></i>
                            </div>
                            <div className="details">
                                <button className="button_remove">-</button>
                                <button onClick={() => addProduct(product)} className="button_add">+</button>
                            </div>
                            <div onClick={() => handleRemove(product)} className="remove">
                                <i className="material-icons"><MdClear></MdClear></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inside">
                    {product_description && <div className="icon"><i className="material-icons"><AiOutlineInfoCircle /></i></div>}
                    <div className="contents">
                        <p>{product_description}</p>
                        <h3>Disponibles:{stock_amount}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card
