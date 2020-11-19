import React from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';

const Footer = () => {
  const year = new Date().getFullYear();

  return ( 
    <div className="footer">
      <div className="navbar">
        <footer className="container container__footer">
          <Navigation />

          <Link to='/'><h1>TuLugar</h1></Link>
        </footer>
      </div>
      <p className="copyrigth">Todos los derechos reservados. &copy; TuLugar {year} </p>
    </div>
  );
}
 
export default Footer;