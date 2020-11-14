import React from 'react';
import { Link } from 'react-router-dom';

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
        {
          props.cart ?
            <>
              <p className="producto_cuenta">{props.product.count} x ${props.product.price}</p>
              <h2 className="producto__precio">Total:  $ {props.product.price * props.product.count}</h2>
            </>
          :
          <Link 
            to= {!props.isDetail ? `/item/${props.product.id}` : '/'}
          >
            <p className="producto__precio">$ {props.product.price}</p>
            <button
              className="producto__detalle-btn"
            > {!props.isDetail ? 'Ver Detalle' : 'Listado de Productos'}</button>
          </Link>
        }
      </div>
  </li> 
   );
}
 
export default Item;