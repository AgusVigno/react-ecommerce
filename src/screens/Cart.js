import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {CartContext} from '../context/cartContext';
import Layout from '../components/Layout';
import Item from '../components/Item';
import Alerta from '../components/Alerta';

const Listado = styled.ul`
  width: 50rem;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 60rem;
  }
  .producto__detalle{
    border: none;
    border-bottom: 1px solid #e1e1e1;
    height: 20rem;
    img{
      max-height: 100%;
      padding: 1rem;
    }
    &:last-of-type{
      border: none;
    }
  }
`;

const ContenedorAlerta = styled.div`
  width: 35rem;
  position: absolute;
  top: 10rem;
  right: 20rem;
  .MuiAlertTitle-root{
    font-size: 1.6rem;
  }
  .MuiAlert-message{
    font-size: 1.4rem;
  }
`;

const Cart = () => {
  const cartContext = useContext(CartContext);
  const [message, setMessage] = useState(false);
  
  return ( 
    <Layout>
      <h1 className="titulo">Mi Carrito <span>({cartContext.cartSize} productos)</span></h1>
      { 
        message && 
          <ContenedorAlerta>
            <Alerta 
              type="success"
              title="Correcto"
              message="Se eliminó del carrito de forma"
              bold="exitosa!"
            />
          </ContenedorAlerta> 
      }
      {
        cartContext.cartSize === 0 
        ? <>
            <h2>No agregaste ningun producto al carrito.</h2>
            <Link to={'/'}>
              <button className="cart__products-button">
                Listado de Productos
              </button>
            </Link> 
          </>
        : <Listado>
            {
              cartContext.cart.map( product => (
                <Item 
                  key={product.id}
                  product={product}
                  cart={true} 
                  setMessage={setMessage}  
                />
              ))
            }
            <div className="cart__total">
              <p>Total: $<strong>{cartContext.total}</strong></p>
              <Link to="/cart/checkout">
                <button>Checkout</button>
              </Link>
            </div>
          </Listado>
      }
    </Layout>
  );
}
 
export default Cart;