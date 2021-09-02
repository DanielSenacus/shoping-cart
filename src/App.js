import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './assets/styles/style.scss';

// components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Inventory from './pages/Inventory'
import Sales from './pages/Sales';



const getSessionStorage = () => {
  let cart = sessionStorage.getItem('cart');
  if (cart) {
    return JSON.parse(sessionStorage.getItem('cart'))
  }
  else {
    return []
  }
}


function App() {

  const [data, setData] = React.useState(null);

  const [cartItems, setCartItems] = React.useState(getSessionStorage());

  const [pages, setPages] = React.useState(1);



  const addProduct = (product) => {
    const currentProduct = cartItems.find(item => item.product_id === product.product_id);
    if (currentProduct) {
      setCartItems(
        cartItems.map((item) => item.product_id === product.product_id ? { ...currentProduct, cantidad: currentProduct.cantidad + 1 } : item)
      );
    } else {
      setCartItems([...cartItems, { ...product, cantidad: 1 }])
    }
    console.log(cartItems);

  }

  const cleanCart = () => {
    setCartItems([])
  };

  const removeProduct = (product) => {
    const currentProduct = cartItems.find(item => item.product_id === product.product_id);
    if (currentProduct.cantidad === 1) {
      setCartItems(cartItems.filter((item) => item.product_id !== product.product_id));
    } else {
      setCartItems(
        cartItems.map((item) => item.product_id === product.product_id ? { ...currentProduct, cantidad: currentProduct.cantidad - 1 } : item)

      )
    }
  };


  const getApi = async () => {
    const request = new XMLHttpRequest();
    request.open('get', `http://localhost:5000/products?page=${pages}&limit=3`, true);


    request.onerror = function (err) {
      console.log(err);
    }
    request.onload = function () {
      if (request.status === 200) {
        const result = JSON.parse(request.responseText);
        console.log(request.responseText);
        setData(result);
      }
    }
    request.send();
  };




  React.useEffect(() => {
    getApi();
  }, [pages])

  React.useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home removeProduct={removeProduct} addProduct={addProduct} data={data}></Home>
          </Route>
          <Route path="/cart">
            <Cart cleanCart={cleanCart} removeProduct={removeProduct} addProduct={addProduct} cartItems={cartItems}></Cart>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route path="/sales">
            <Sales></Sales>
          </Route>
        </Switch>
      </Router>

      <div className="res_container">
        <button onClick={() => setPages(2)} className="more_res">2</button>
        <button onClick={() => setPages(3)} className="more_res">3</button>
      </div>
    </>
  );
}

export default App;
