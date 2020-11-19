import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../firebase';
import Navigation from './Navigation';
import CartIcon from './CartIcon';

const Header = () => {
  const {user, firebase} = useContext(FirebaseContext);

  const logout = () => {
    firebase.logout();
  }

  return ( 
    <header className="navbar">
      <div className="container container__header">
        <Link to='/'><h1>TuLugar</h1></Link>

        <Navigation />

        <div>
          {
            user ? (
              <div className="header__user">
                <p>Hola: {user.displayName}</p>
                <CartIcon />
                <button
                  onClick={logout}
                >Cerrrar Sesión</button>
              </div>
            ) : (
              <div className="header__user">
                <CartIcon />
                <Link to="/login">
                  <button className="header__login">Login</button>
                </Link>
                <Link to="/register">
                  <button className="header__register">Crear Cuenta</button>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </header>
  );
}
 
export default Header;