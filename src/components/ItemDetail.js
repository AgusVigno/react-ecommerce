import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import {productsData} from '../const/Products';
import {CartContext} from '../context/cartContext';
import Alerta from '../components/Alerta';
import Layout from './Layout';
import Spinner from './Spinner';
import Item from './Item';
import ItemCount from './ItemCount';

const ItemDetail = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [count, setCount] = useState(0);
  const cartContext = useContext(CartContext);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setLoading(true);
    // eslint-disable-next-line
    setItem(productsData.find(product => product.id == id));
    setLoading(false);
  }, [id, count]);

  const toBuy = () => {
    if(count > 0){ 
      cartContext.addToCart(item, count);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }

  return (
    <Layout>
      <h1 className="titulo">Detalle del Producto</h1>
      { alert && <Alerta /> }
      {
        loading ?
        <Spinner /> :
        <>
          <Item
            product={item}
            isDetail={true}
          />
          <div className="producto__comprar">
            <ItemCount
              max= {item.stock}
              min= {0}
              setCount={setCount}
            />
            <button 
              className="producto__boton"
              onClick={() => toBuy()}
              disabled={count === 0}  
            >Comprar {count > 0 && count}</button>
          </div>
        </>
      }
    </Layout>
  );
}
 
export default ItemDetail;