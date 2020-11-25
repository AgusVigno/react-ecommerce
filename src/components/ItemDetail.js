import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../firebase';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import {CartContext} from '../context/cartContext';
import Layout from './Layout';
import Spinner from './Spinner';
import Item from './Item';
import CustomButtonQuantity from './CustomButtonQuantity';
import Alerta from '../components/Alerta';

const Titulo = styled.h1`
  margin-top: 2rem;
`;

const Detalle = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img{
    width: 10rem;
    @media (min-width: 768px) {
      width: 35rem;
      padding: 2rem;
    }
  }
  @media (min-width: 768px) {
    width: 90rem;
    margin: 2rem auto;
  }
`;

const Error = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg{
    font-size: 5rem;
  }
  p{
    font-size: 2rem;
  }
`;

const ContenedorAlerta = styled.div`
  width: 35rem;
  position: absolute;
  top: 10rem;
  right: 20rem;
  .MuiAlertTitle-root{
    font-size: 1.6rem;
  }
  .MuiAlert-message{
    font-size: 1.4rem;
  }
`;

const ItemDetail = ({history}) => {
  const { id } = useParams();
  const cartContext = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

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
        return doc.data().image.includes("firebasestorage")
          ? setProduct({id: doc.id, ...doc.data()})
          : setProduct({id: doc.id, ...doc.data(), image: `../${doc.data().image}`});
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
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
        history.push('/');
      }, 2000);
      cartContext.addToCart(product, count);
    }
  }

  return (
    <Layout>
      <Titulo>Detalle del Producto</Titulo>
      {
        loading 
        ? <Spinner /> 
        : <>
            { 
              message && 
                <ContenedorAlerta>
                  <Alerta 
                    type="success"
                    title="Correcto"
                    message="Se agregó al carrito de forma"
                    bold="exitosa!"
                  />
                </ContenedorAlerta> 
            }
            {
              error 
              ? <Error>
                  <ReportProblemOutlinedIcon />
                  <p>No se encontraron productos</p>
                </Error>
              : <Detalle className="product__detail">
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
                </Detalle>
            }
          </>
      }
        
        

    </Layout>
  );
}
 
export default ItemDetail;