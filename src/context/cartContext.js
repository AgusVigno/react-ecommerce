import React, {useState} from 'react';

export const CartContext = React.createContext();

export default function CartProvider({ defaultValue = [], children}){

  const [cart, setCart] = useState(defaultValue);
  const [cartSize, setCartSize] = useState(0);
  const [total, setTotal] = useState(0);

  const getFromCart = id => {
    return cart.find(product => product.id === id);
  }

  const isInCart = id => {
    return id === undefined ? undefined : getFromCart(id) !== undefined;
  }

  const addToCart = (product, count) => {
    setCartSize(cartSize + count);
    setTotal(total + count * product.price);
    if(isInCart(product && product.id)){
      setCart(cart.map(p => (p.id === product.id ? 
        {...p, count: p.count + count} : p )));
      return
    }
    setCart([...cart, {...product, count: count}]);
  }


  return (
    <CartContext.Provider value={{cart, addToCart, isInCart, cartSize, total}}>
      {children}
    </CartContext.Provider>
  )
}
