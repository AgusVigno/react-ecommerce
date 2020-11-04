import React, {useEffect, useState} from 'react';
import Spinner from './Spinner';
import imgCurso from '../images/curso.jpg';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    new Promise((resolve) => {
      setTimeout(() => {
        const obtenerProducto = {
          id: 1,
          nombre: "Curso de React.JS",
          precio: 1000,
          imagen: imgCurso,
          descripcion: "Con este curso podrás aprender desde lo básico, hasta los conocimientos mas avanzados, construyendo aplicaciones reales !!"
        }
        resolve(obtenerProducto);
        setCargando(false);
      }, 3000);
    })
    .then(response => setProducto(response))
    .catch(error => console.log('Hubo un error: ', error));
  }, []);

  const comprar = () => {
    console.log('Realizando la compra...');
  }

  const styles = {
    boton: {
      fontSize: '20px',
      fontWeight: '700',
      textAlign: 'center',
      margin: '15px auto',
      border: '1px solid #DA5572',
      backgroundColor: '#F44611',
      color: '#FFF',
      borderRadius: 10,
      display: 'inline-block',
      width: '200px',
      textTransform: 'uppercase',
      padding: '10px'
    }
  }
  return ( 
    <>
      <h1 style={{margin: '40px auto'}}>Detalle del Producto</h1>
      {
        cargando ?
          <Spinner />
        : (
          <>
            <ItemDetail producto={producto} />
            <button 
              style={styles.boton}
              onClick={() => comprar()}  
            >Comprar</button>
          </>
        )
      }
    </>
  );
}
 
export default ItemDetailContainer;