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

  const onAdd = (product) => {
    const exist
  }

  const getApi = () => {
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
            <Home data={data}></Home>
          </Route>
          <Route path="/cart">
            <Cart cartItems={cartItems}></Cart>
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
