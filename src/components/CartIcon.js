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
            <p>{cartContext.cartSize}</p>
        }
      </div>
    </Link>
  );
}

export default CartIcon;