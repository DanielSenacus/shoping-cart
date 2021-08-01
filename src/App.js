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

function App() {

  const [data, setData] = React.useState(null);

  const [cartItems, setCartItems] = React.useState([]);


  const addProduct = (product) => {
    const currentProduct = cartItems.find(item => item.id === product.id);
    if (currentProduct) {
      setCartItems(
        cartItems.map((item) => item.id === product.id ? { ...currentProduct, cantidad: currentProduct.cantidad + 1 } : item)
      );
    } else {
      setCartItems([...cartItems, { ...product, cantidad: 1 }])
    }
    console.log(cartItems);

  }

  const removeProduct = (product) => {
    const currentProduct = cartItems.find(item => item.id === product.id);
    if (currentProduct.cantidad === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) => item.id === product.id ? { ...currentProduct, cantidad: currentProduct.cantidad - 1 } : item)

      )
    }
  };


  const getApi = async () => {
    const request = new XMLHttpRequest();
    request.open('get', 'http://localhost:5000/products', true);


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



  React.useEffect(() => {
    getApi();
  }, [])
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home removeProduct={removeProduct} addProduct={addProduct} data={data}></Home>
          </Route>
          <Route path="/cart">
            <Cart removeProduct={removeProduct} addProduct={addProduct} cartItems={cartItems}></Cart>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route path="/sales">
            <Sales></Sales>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
