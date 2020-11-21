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

  const updateProductCart = (product, newCount) => {
    if(isInCart(product && product.id)){
      setCartSize(cartSize - product.count + newCount);
      setTotal(total - product.count * product.price + newCount * product.price);
      setCart(cart.map(p => (p.id === product.id ? 
        {...p, count: newCount} : p )));
      return
    }
  }

  const deleteProductCart = (product) => {
    if(isInCart(product && product.id)){
      setCartSize(cartSize - product.count);
      setTotal(total - product.count * product.price);
      setCart(cart.filter(p => p.id !== product.id));
      return
    }
  }

  const reset = () => {
    setCart(defaultValue);
    setCartSize(0);
    setTotal(0);
  }

  return (
    <CartContext.Provider 
      value={{cart, addToCart, isInCart, cartSize, total, reset, updateProductCart, deleteProductCart}}>
      {children}
    </CartContext.Provider>
  )
}
