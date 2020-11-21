import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../firebase';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import {CartContext} from '../context/cartContext';
import Layout from './Layout';
import Spinner from './Spinner';
import Item from './Item';
import CustomButtonQuantity from './CustomButtonQuantity';

const ItemDetail = ({history}) => {
  const { id } = useParams();
  const cartContext = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    if(id){
      console.log("Control de API - Producto por ID.");
      setLoading(true);
      const itemCollection = firebase.db.collection('products');
      const item = itemCollection.doc(id);
      item.get().then(doc => {
        if(!doc.exists){
          setError(true);
          return
        }
        return setProduct({
          id: doc.id,
          ...doc.data()
        });
      }).catch(error => {
        setError(true);
        console.log("Error: ", error);
      }).finally(() => {
        setLoading(false);
      });
    }else{
      setError(true);
    }
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
              ? <div className="products__noproduct">
                  <ReportProblemOutlinedIcon />
                  <p>No se encontraron productos</p>
                </div>
              : <div className="product__detail">
                  <Item
                    product={product}
                    isDetail={true}
                  />
                  <div className="producto__comprar">
                    <CustomButtonQuantity
                      max= {product.stock}
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