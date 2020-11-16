import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CartContext} from '../context/cartContext';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const CartIcon = () => {
  const cartContext = useContext(CartContext);
  
  return (
    <Link to="/cart">
      <div className="carrito">
        <ShoppingCartOutlinedIcon className="icon-cart" />
        {
          cartContext.cartSize > 0 && 
            <p className="carrito-icon">{cartContext.cartSize}</p>
        }
        {
          cartContext.cartSize > 0 &&
            <ul className="cart__resumen">
              <li className="cart__resumen-title">Productos agregados</li>
            {
              cartContext.cart && cartContext.cart.map(product => (
                <li key={product.id} className="cart__resumen-container">
                  <p className="cart__resumen-name">{product.name}</p>
                  <p className="cart__resumen-price">{product.count} x ${product.price}</p>
                  <p className="cart__resumen-subtotal">${product.count * product.price}</p>
                </li>
              ))
            }
            <li className="cart__resumen-total">Total: <span>${cartContext.total}</span></li>
          </ul>
        }
      </div>
    </Link>
  );
}

export default CartIcon;