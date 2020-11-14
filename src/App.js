import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CartProvider from './context/cartContext';
import Home from './components/Home';
import Category from './components/Category';
import Contact from './components/Contact';
import Cart from './components/Cart';
import ItemDetail from './components/ItemDetail';


function App() {  
  return (
    <CartProvider> 
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/category" component={Category} />
          <Route path="/cart" component={Cart} />
          <Route path="/item/:id" component={ItemDetail} />
        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;
