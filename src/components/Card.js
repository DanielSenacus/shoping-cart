import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { MdClear } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';


const Card = ({ data }) => {

    const [clicked, setCliked] = React.useState(false);

    const [cart, setCart] = React.useState([]);


    return (
        <>
            {data.map((card) => {
                const { id, product_name, img, price, product_description, stock } = card;
                return (
                    <div className="card" key={id}>
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
                                        <div onClick={() => setCliked(!clicked)} className="buy">
                                            <i className="material-icons"><AiOutlineShoppingCart></AiOutlineShoppingCart></i>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="done">
                                            <i className="material-icons"><MdDone></MdDone></i>
                                        </div>
                                        <div className="details">
                                            <button className="button_remove">-</button>
                                            <input type="number" />
                                            <button className="button_add">+</button>
                                        </div>
                                        <div onClick={() => setCliked(!clicked)} className="remove">
                                            <i className="material-icons"><MdClear></MdClear></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inside">
                                {product_description && <div className="icon"><i className="material-icons"><AiOutlineInfoCircle /></i></div>}
                                <div className="contents">
                                    <p>{product_description}</p>
                                    <h3>Disponibles:{stock}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default Card
