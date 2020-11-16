import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CartContext} from '../context/cartContext';
import Layout from '../components/Layout';
import Item from '../components/Item';

const Cart = () => {
  const cartContext = useContext(CartContext);

  return ( 
    <Layout>
      <h1 className="titulo">Mi Carrito <span>({cartContext.cartSize} productos)</span></h1>
      {
        cartContext.cartSize === 0 
        ? <>
            <h2>No agregaste ningun producto al carrito.</h2>
            <Link to={'/'}>
              <button className="producto__detalle-btn cart__btn">
                Listado de Productos
              </button>
            </Link> 
          </>
        : <ul>
            {
              cartContext.cart.map( product => (
                <Item 
                  key={product.id}
                  product={product}
                  cart={true} />
              ))
            }
            <div className="cart__total">
              <p>Total: $<strong>{cartContext.total}</strong></p>
              <Link to="/cart/checkout">
                <button>Comprar</button>
              </Link>
            </div>
          </ul>
      }
    </Layout>
  );
}
 
export default Cart;