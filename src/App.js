import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import firebase, {FirebaseContext} from './firebase';
import CartProvider from './context/cartContext';
import CategoryProvider from './context/categoryContext';
import useAutentication from './hoooks/useAutentication';

import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import Category from './screens/Category';
import Contact from './screens/Contact';
import Products from './screens/Products';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import ItemDetail from './components/ItemDetail';

function App() { 
  const user = useAutentication();
 
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user
      }}
    >
      <CartProvider>
        <CategoryProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/contact" component={Contact} />
              <Route path="/category/:key" component={Category} />
              <Route exact path="/cart" component={Cart} />
              <Route path="/cart/checkout" component={Checkout} />
              <Route path="/item/:id" component={ItemDetail} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/products" component={Products} />
            </Switch>
          </Router>
        </CategoryProvider> 
      </CartProvider>
    </FirebaseContext.Provider>
  );
}

export default App;
