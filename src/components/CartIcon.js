import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {CartContext} from '../context/cartContext';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const Cart = styled.div`
  display: flex;
  position: relative;
  padding: 1rem;
  @media(min-width: 768px){
    margin-right: 5rem;
    &:hover{
      .cart__resumen{
        visibility: visible;
        opacity: 1;
      }
    }
  }
  svg{
    font-size: 3rem;
  }
  .carrito-icon{
    margin: 0;
    position: absolute;
    bottom: -1rem;
    left: 2.5rem;
    border-radius: 50%;
    background-color: red;
    width: 2rem;
    text-align: center;
    font-size: 1.5rem;
    z-index: 50;
  }
  .cart__resumen{
    position: absolute;
    background-color: #212c37;
    transition: opacity 1.5s;
    top: 47px;
    left: -11rem;
    visibility: hidden;
    opacity: 0;
    border-bottom-left-radius: 5rem;
    border-bottom-right-radius: 5rem;
  }
  .cart__resumen-container{
    display: flex;
    width: 30rem;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
  }
  .cart__resumen-title{
    text-align: center;
    margin: 1rem auto;
    border-bottom: 1px solid #FFF;
    border-top: 1px solid #FFF;
    font-size: 1.5rem;
  }
  .cart__resumen-container p{
    margin: .5rem;
    font-size: 1.3rem;
  }
`;

const CartIcon = () => {
  const cartContext = useContext(CartContext);
  
  return (
    <Link to="/cart">
      <Cart>
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
      </Cart>
    </Link>
  );
}

export default CartIcon;