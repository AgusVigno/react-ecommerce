import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';

const Item = ({product, cart, isDetail, setMessage}) => {

  const [counter, setCounter] = useState(cart ? product.count : 1);
  const cartContext = useContext(CartContext);

  const incrementItem = () => {
    const newCount = counter + 1;
    if(newCount <= product.stock){
      setCounter(newCount);
      cartContext.updateProductCart(product, newCount);
    }
  }

  const decrementItem = () => {
    const newCount = counter - 1;
    if(newCount >= 1){
      setCounter(newCount);
      cartContext.updateProductCart(product, newCount);
    }
  }

  const addItem = () => {
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 2000)
    cartContext.addToCart(product, 1);
  }

  const deleteItem = () => {
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 2000)
    cartContext.deleteProductCart(product);
  }

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
            ? <div className="cart__product">
                <div className="producto__contador">
                  <button onClick={() => decrementItem()}>-</button>
                  <span
                    className="producto__contador-span">
                    {counter}
                  </span>
                  <button onClick = {() => incrementItem()}>+</button>
                </div>
                <p className="producto_cuenta"><span>{counter}</span> x ${product.price}</p>
                <h2 className="producto__precio">Total:  $ {product.price * counter}</h2>
                <DeleteIcon htmlColor="red" fontSize="large" onClick={deleteItem}/>
              </div>
            : <div className="producto__data"> 
                <p className="producto__precio">$ {product.price}</p> 
                <Link 
                  to= {!isDetail ? `/item/${product.id}` : '/'}
                >
                  {
                    !isDetail 
                      ? <SearchIcon htmlColor="blue" fontSize="large"/>
                      : <button
                          className="producto__detalle-btn"
                        >Listado de Productos</button>
                  }
                </Link>
                {
                  !isDetail &&
                  <AddShoppingCartIcon htmlColor="green"fontSize="large" onClick={addItem}/> 
                }
              </div>
          }
      </div>
  </li> 
   );
}
 
export default Item;