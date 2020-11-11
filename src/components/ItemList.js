import React, {useState, useEffect} from 'react';
import Spinner from './Spinner';
import Item from './Item';
import {productsData} from '../const/Products';

const ItemList = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsData);
        setLoading(false);
      }, 500);
    })
    .then(response => setProducts(response))
    .catch(error => console.log('Hubo un error: ', error));
  }, []);

  return ( 
    <>
      <h1 className="titulo">Listado de Productos</h1>
      {
        loading ?
          <Spinner />
        : (
          <ul>
            {products && products.map(product => (
              <Item
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        )
      }  
    </>
  );
}
 
export default ItemList;