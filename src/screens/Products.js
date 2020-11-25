import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import {CategoryContext} from '../context/categoryContext';
import firebase, { FirebaseContext } from '../firebase';
import Layout from '../components/Layout';
import Error from '../components/Error';

const Titulo = styled.h1`
  margin-top: 2rem;
`;

const Formulario = styled.form`
  width: 95%;
  margin: 2rem auto;
  font-size: 1.2rem;
  @media (min-width: 768px) {
    width: 60rem;
    font-size: 1.4rem;
  }
  legend{
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  fieldset{
    margin-bottom: 2rem;
  }  
  textarea{
    width: 100%;
    height: 12rem;
  }
  img{
    width: 35rem;
    margin: 1rem auto;
    max-width: 100%;
  }
`;

const Products = ({history}) => {
  const categoryContext = useContext(CategoryContext);
  const {user} = useContext(FirebaseContext);

  const STATE_INITIAL = {
    name: '',
    price: '',
    description: '',
    image: '',
    stock: '',
    categoryId: '',
    created: Date.now(),
    creator: {
      id: user.uid,
      name: user.displayName
    },
  };

  const [product, setProduct] = useState(STATE_INITIAL);
  const [upload, setUpload] = useState(0);
  const [visibleProgress, setVisibleProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    !user && history.push('/');
  },[upload, user, history]);

  const handleChange = event => {
    event.preventDefault();
    setProduct({
      ...product, [event.target.name]: event.target.value
    });
  }

  const handleChangeNumber = event => {
    event.preventDefault();
    setProduct({
      ...product, [event.target.name]: Number(event.target.value)
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const empty = validateSubmit();
    (empty > 0) && setError("Los campos (*) son obligatorios");
    !error && empty === 0 && createProduct();
  }

  const validateSubmit = () => {
    let empty = 0;
    Object.keys(product).forEach( key => {
      return product[key] === '' ? empty++ : empty +=0;
    });
    return empty;
  }

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage.ref(`images/${product.creator.id}-${product.created}-${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setUpload(percentage);
    }, (error) => {
      console.error(error.message);
      setProduct({...product, image: ''});
    }, () => {
      task.snapshot.ref
      .getDownloadURL()
      .then(url => setProduct({...product, image: url}));
    })
  }
  
  const createProduct= () => {
    if(user.uid !== "Z8bcJvkaF8e9lyBDou8sqRB4yHn1"){
      setError("Se necesita permiso de administrador.")
      return
    }
    try {
      console.log("Control de consulta API - Carga Producto");
      firebase.db.collection('products').add(product);
      setProduct(STATE_INITIAL);
      history.push('/');
    } catch (error) {
      console.log("Error: ", error);
      setError(error.message);
    }
  }

  return ( 
    <Layout>
      <>
        <Titulo>Cargar nuevo producto</Titulo>
        <Formulario onSubmit={handleSubmit}>
          <fieldset>
            <legend>Información General:</legend>
            <div className="campo">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Ej.: Curso de Angular"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </div>
            <div className="campo">
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                id="price"
                placeholder="Ej.: 950"
                name="price"
                value={product.price}
                onChange={handleChangeNumber}
              />
            </div>
            <div className="campo">
              <label htmlFor="categoryId">Categoría</label>
              <select 
                id="categoryId"
                name="categoryId"
                onChange={handleChange}
                defaultValue={"default"}
              > 
                {
                  categoryContext && categoryContext.categories.map(category => (
                    <option 
                      key={category.id} 
                      value={category.id}
                    >{category.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="campo">
            <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                placeholder="Ej.: 18"
                name="stock"
                value={product.stock}
                onChange={handleChangeNumber}
              />
            </div>
            <div className="campo">
              <label htmlFor="image">Imagen</label>
              <input 
                type='file' 
                onChange={handleUploadFile}
                onClick={() => setVisibleProgress(true)}
              />
            </div>
            {
              visibleProgress &&
                <div className="formulario__image">
                  <progress 
                    value={upload} 
                    max='100'>
                    {upload} %
                  </progress>
                  {
                    product.image && 
                      <img src={product.image} alt="imagen producto"/>
                  }
                </div>
            }
          </fieldset>
          <fieldset>
            <legend>Sobre el producto</legend>
            <div className="campo">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>
          </fieldset>
            {error && <Error message={error} />}
            <input
              className="formulario__submit"
              type="submit"
              value="Cargar Producto"
            />
        </Formulario>
      </>
    </Layout>
   );
}
 
export default Products;