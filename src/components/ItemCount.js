import React, {useState, useEffect} from 'react';
import imagenProducto from '../images/curso.jpg';

const ItemCount = (props) => {

  const [item, setItem] = useState({
    count: 0,
    max: null,
    min: null,
  });

  useEffect(() => {
    setItem({
      count: props.initial,
      max: props.max,
      min: props.min
    });
  }, [props]);

  const incrementItem = () => {
    if(item.count < item.max){
      setItem({
        ...item,
        count: item.count + 1
      })
    }
  }

  const decrementItem = () => {
    if(item.count > item.min){
      setItem({
        ...item,
        count: item.count - 1
      })
    }
  }

  const styles = {
    contenedor: {
      border: '1px solid #e1e1e1',
      margin: '30px auto 0 auto',
      width: '600px',
      padding: '10px',
      color: '#000',
      backgroundColor: '#e1e1e1'
    },
    boton: {
      width: '300px',
      display: 'block',
      margin: '20px auto',
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: 10,
      borderColor: '#497cff',
      color: '#497cff'
    },
    contador: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: '5px',
      alignItems: 'center'
    },
    contadorBotones: {
      backgroundColor: '#FFF',
      border: 'none',
      color: '#497cff',
      fontSize: '30px'
    },
    imagen: {
      width: '400px',
      margin: '10px auto',
    }
  }

  return ( 
    <>
      <div style={styles.contenedor}>
        <img 
          src={imagenProducto}
          style={styles.imagen}
          alt="imagen producto"
        />
        <p>Curso de ReactJS, donde aprenderás los conceptos básicos hasta los más avanzados !!</p>

        <div style={styles.contador}>
          <button 
            onClick={() => decrementItem()}
            style={styles.contadorBotones}
          >-</button>
          <span style={{fontWeight:'700', fontSize: '20px'}}>{item.count}</span>
          <button 
            onClick = {() => incrementItem()}
            style={styles.contadorBotones}
          >+</button>
        </div>
      </div>
      <button 
        style={styles.boton}
        onClick={() => props.addToCart(item.count)}
      >Agregar al Carrito</button>
    </>
  );
}
 
export default ItemCount;