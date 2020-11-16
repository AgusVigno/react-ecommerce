import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import {productsData} from '../const/Products';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {CartContext} from '../context/cartContext';
import Layout from './Layout';
import Spinner from './Spinner';
import Item from './Item';
import CustomButtonQuantity from './CustomButtonQuantity';

const ItemDetail = ({history}) => {

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [count, setCount] = useState(0);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    // eslint-disable-next-line
    setItem(productsData.find(product => product.id == id));
    setLoading(false);
  }, [id, count]);

  const toBuy = () => {
    if(count > 0){ 
      cartContext.addToCart(item, count);
      history.push('/');
    }
  }

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
            <CustomButtonQuantity
              max= {item.stock}
              min= {0}
              setCount={setCount}
            />
            <button 
              className="producto__boton"
              onClick={() => toBuy()}
              disabled={count === 0}  
            >Agregar <AddShoppingCartIcon fontSize="large" /></button>
          </div>
        </>
      }
    </Layout>
  );
}
 
export default ItemDetail;