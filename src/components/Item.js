import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({product, cart, isDetail}) => {
  return (
    <li className="producto__detalle">
      <img 
        src={product.image}
        alt="imagen de producto"
      />
      <div className="producto__info">
        <p className="producto__titulo">{product.name}</p>
        <p className="producto__descripcion">{product.description}</p>
        {
          cart 
            ? <>
                <p className="producto_cuenta">{product.count} x ${product.price}</p>
                <h2 className="producto__precio">Total:  $ {product.price * product.count}</h2>
              </>
            : <div className="producto__data"> 
                <p className="producto__precio">$ {product.price}</p> 
                <Link 
                  to= {!isDetail ? `/item/${product.id}` : '/'}
                >
                  <button
                    className="producto__detalle-btn"
                  > {!isDetail ? 'Ver Detalle' : 'Listado de Productos'}</button>
                </Link>
              </div>
          }
      </div>
  </li> 
   );
}
 
export default Item;