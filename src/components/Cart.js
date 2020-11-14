import React, {useContext} from 'react';
import {CartContext} from '../context/cartContext';
import Layout from './Layout';
import Item from './Item';

const Cart = () => {
  const cartContext = useContext(CartContext);

  return ( 
    <Layout>
      <h1 className="titulo">Mi Carrito <span>({cartContext.cartSize} productos)</span></h1>
      {
        cartContext.cartSize === 0 ?
        <h2>No agregaste ningun producto al carrito.</h2> :
        <ul>
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
            <button>Checkout</button>
          </div>
        </ul>
      }
    </Layout>
  );
}
 
export default Cart;