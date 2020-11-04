import React, {useState, useEffect} from 'react';
import Spinner from './Spinner';
import Item from './Item';
import imgCurso from '../images/curso.jpg';
import imgCurso1 from '../images/curso1.jpg';
import imgCurso2 from '../images/curso2.png';

const ItemList = () => {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    new Promise((resolve) => {
      setTimeout(() => {
        const datos = [
          {
            id: 1,
            nombre: "Curso de React.JS",
            precio: 1000,
            imagen: imgCurso,
            descripcion: "Con este curso podrás aprender desde lo básico, hasta los conocimientos mas avanzados, construyendo aplicaciones reales !!"
          }, 
          {
            id: 2,
            nombre: "Aprende a programar",
            precio: 500,
            imagen: imgCurso1,
            descripcion: "Comienza aprendiendo lo básico de HTML, CSS y JS, contruyendo tu propio sitio web."
          }, 
          {
            id: 3,
            nombre: "Experto en VueJS",
            precio: 800,
            imagen: imgCurso2,
            descripcion: "Perfecciona esta increíble tecnología Frontend, aplicando los conocimientos en proyectos reales y personalizados."
          }
        ];
        resolve(datos);
        setCargando(false);
      }, 2000);
    })
    .then(response => setProductos(response))
    .catch(error => console.log('Hubo un error: ', error));
  }, []);

  return ( 
    <>
      <h1 style={{margin: '40px auto'}}>Listado de Productos</h1>
      {
        cargando ?
          <Spinner />
        : (
          <ul>
            {productos && productos.map(producto => (
              <Item
                key={producto.id}
                producto={producto}
              />
            ))}
          </ul>
        )
      }  
    </>
  );
}
 
export default ItemList;