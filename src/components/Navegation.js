import React from 'react';
import {NavLink} from 'react-router-dom';

const Navegacion = () => {
  return ( 
    <nav className="navegacion">
      <NavLink 
        to={'/'}
        // activeClassName="pagina-actual"
      >Inicio</NavLink>
      <NavLink 
        to={'/category'}
        activeClassName="pagina-actual"
      >Categorías</NavLink>
      <NavLink 
        to={'/contact'}
        activeClassName="pagina-actual"
      >Contacto</NavLink>
    </nav>
  );
}
 
export default Navegacion;