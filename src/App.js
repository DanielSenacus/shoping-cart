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

  const [sales, setSales] = React.useState([]);

  const [pedidos, setPedidos] = React.useState([]);


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
    request.open('get', 'http://localhost:5000/products/2', true);


    request.onerror = function (err) {
      console.log(err);
    }
    request.onload = function () {
      if (request.status === 200) {
        const result = JSON.parse(request.responseText);
        console.log(result);
        setData(result);
      }
    }
    request.send();
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
    getApi();
    getSales();
    getPedidos();
  }, [])

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
            <Sales pedidos={pedidos} sales={sales}></Sales>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
