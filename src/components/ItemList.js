import React from 'react';
import Item from './Item';
import Spinner from './Spinner';
import CustomPagination from './CustomPagination';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

const ItemList = ({products}) => {
  return ( 
    <div>
    {
      !products
        ? <Spinner />
        : <>
            <ul className="products__containter">
              {
                products.length > 0 
                ? (
                    products.map(product => (
                      <Item
                        key={product.id}
                        product={product}
                      />
                    ))
                  )
                : (  
                    <div className="products__noproduct">
                      <ReportProblemOutlinedIcon />
                      <p>No se encontraron productos</p>
                    </div>
                ) 
              }
            </ul>
            {
              products.length > 0 && <CustomPagination />
            }
          </>
    }
    </div>
  );
}
 
export default ItemList;