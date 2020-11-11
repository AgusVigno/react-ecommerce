import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import Item from './Item';
import ItemCount from './ItemCount';
import Spinner from './Spinner';
import {productsData} from '../const/Products';

const ItemDetail = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    productsData.forEach(product => {
      // eslint-disable-next-line
      product.id == id && setItem(product);
    });
    setLoading(false);
    // eslint-disable-next-line
  }, [id, count]);

  const addToCart = (count) => {
    console.log('Se agrego al carrito, cantidad: ', count);
  }

  const toBuy = () => {
    console.log('Realizando la compra...');
  }

  // const updateCount = (num) => {
  //   console.log('update ', num);
  //   setCount(num);
  // }

  return (
    <Layout>
      <h1 className="titulo">Detalle del Producto</h1>
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
              addToCart={addToCart}
              setCount={setCount}
            />
            <button 
              className="producto__boton"
              onClick={() => toBuy()}  
            >Comprar {count > 0 && count}</button>
          </div>
        </>
      }
    </Layout>
  );
}
 
export default ItemDetail;