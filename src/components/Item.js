import React from 'react';
import { NavLink } from 'react-router-dom';

const Item = (props) => {
  return (
    <li className="producto__detalle">
      <img 
        src={props.product.image}
        alt="imagen de producto"
      />
      <div>
        <p className="producto__titulo">{props.product.name}</p>
        <p className="producto__descripcion">{props.product.description}</p>
        <p className="producto__precio">$ {props.product.price}</p>
        <NavLink 
          to= {!props.isDetail ? `/item/${props.product.id}` : '/'}
        >
          <button
            className="producto__detalle-btn"
          > {!props.isDetail ? 'Ver Detalle' : 'Listado de Productos'}</button>
        </NavLink>
      </div>
  </li> 
   );
}
 
export default Item;