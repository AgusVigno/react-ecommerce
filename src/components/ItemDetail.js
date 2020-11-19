import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {CartContext} from '../context/cartContext';
import { ProductsContext } from '../context/productsContext';
import Layout from './Layout';
import Spinner from './Spinner';
import Item from './Item';
import CustomButtonQuantity from './CustomButtonQuantity';

const ItemDetail = ({history}) => {
  const { id } = useParams();
  const cartContext = useContext(CartContext);
  const {getProductById} = useContext(ProductsContext);

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if(id){
      setLoading(true);
      Promise.resolve(getProductById(id))
        .then(product => {
          if(!product){
            setError(true);
            return
          }
          return setProduct(product)
        }).catch(error => {
          console.log("Error: ", error);
          setError(true);
        }).finally(() => {
          setLoading(false);
        })
    }
    // eslint-disable-next-line
  }, [id]);

  const toBuy = () => {
    if(count > 0){ 
      cartContext.addToCart(product, count);
      history.push('/');
    }
  }

  return (
    <Layout>
      <h1 className="titulo">Detalle del Producto</h1>
      {
        loading 
        ? <Spinner /> 
        : <>
            {
              error 
              ? <div>
                  <h2>Icono Aquí</h2>
                  <h3>No se encontro el producto solicitado.</h3>
                </div>
              : <div className="product__detail">
                  <Item
                    product={product}
                    isDetail={true}
                  />
                  <div className="producto__comprar">
                    <CustomButtonQuantity
                      max= {product.stock}
                      min= {0}
                      setCount={setCount}
                    />
                    <button 
                      className="producto__boton"
                      onClick={() => toBuy()}
                      disabled={count === 0}  
                    >Agregar <AddShoppingCartIcon fontSize="large" /></button>
                  </div>
                </div>
            }
          </>
      }
        
        

    </Layout>
  );
}
 
export default ItemDetail;