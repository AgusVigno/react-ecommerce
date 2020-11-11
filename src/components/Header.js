import React from 'react';
import {Link} from 'react-router-dom';
import Navegation from './Navegation';
import CartIcon from './CartIcon';

const Header = () => {
  return ( 
    <div className="container">
      <header className="navbar">
        <Link to='/'><h1>Logo Aquí</h1></Link>

        <Navegation />

        <CartIcon />
      </header>
    </div>
  );
}
 
export default Header;