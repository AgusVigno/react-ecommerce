import React from 'react';
import ItemCount from './ItemCount';

const Item = (props) => {
  
  const addToCart = (count) => {
    console.log('Se agrego al carrito, cantidad: ', count);
  }

  const styles = {
    contenedor: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '900px',
      borderBottom: '1px solid #e1e1e1',
      margin: '0 auto 20px auto'
    },
    detalle: {
      width: '450px',
    },
    imagen: {
      width: '450px', 
      padding: '15px'
    },
    titulo: {
      fontSize: '20px',
      fontWeight: '700',
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    descripcion: {
      textAlign: 'center',
      fontSize: '16px',
    },
    precio: {
      fontSize: '20px',
      fontWeight: '700',
      textAlign: 'center',
      marginTop: '15px',
      border: '1px solid #DA5572',
      backgroundColor: '#F44611',
      color: '#FFF',
      borderRadius: 10,
      display: 'inline-block',
      width: '150px'
    }
  }


  return (
    <>
      <li style={styles.contenedor}>
        <img 
          src={props.producto.imagen}
          style={styles.imagen}
          alt="imagen de producto"
        />
        <div style={styles.detalle}>
          <p style={styles.titulo}>{props.producto.nombre}</p>
          <p style={styles.descripcion}>{props.producto.descripcion}</p>
          <p style={styles.precio}>$ {props.producto.precio}</p>
          <ItemCount 
            initial= {0}
            max= {10}
            min= {0}
            addToCart={addToCart}
          />
        </div>
      </li> 
    </>
   );
}
 
export default Item;