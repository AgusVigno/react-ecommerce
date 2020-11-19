import React from 'react';
import Item from './Item';
import Spinner from './Spinner';

const ItemList = ({products}) => {
  return ( 
    <div>
    {
      !products
        ? <Spinner />
        : <ul className="products__containter">
            {
              products.length > 0 
                ? products.map(product => (
                  <Item
                    key={product.id}
                    product={product}
                  />
                ))
                : <div className="category__noproduct">
                    <h2>Icono Aquí</h2>
                    <h2>Ningún producto para la categoría</h2>
                  </div>
            }
          </ul>
    }
    </div>
  );
}
 
export default ItemList;