import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Contact from './components/Contact';
import Cart from './components/Cart';
import ItemDetail from './components/ItemDetail';

function App() {  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/item/:id" component={ItemDetail} />
      </Switch>
    </Router>
  );
}

export default App;
