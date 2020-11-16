import React from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';


const Footer = () => {
  const year = new Date().getFullYear();

  return ( 
    <>
      <div className="container">
        <footer className="navbar">
          <Navigation />

          <Link to='/'><h1>Logo Aquí</h1></Link>
        </footer>
      </div>
      <p className="copyrigth">Ecommerce. Todos los derechos reservados. {year} &copy; </p>
    </>
  );
}
 
export default Footer;