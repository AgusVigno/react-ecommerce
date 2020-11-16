import React, {useEffect, useState, useContext} from 'react';
import {CategoryContext} from '../context/categoryContext';
import firebase, { FirebaseContext } from '../firebase';
import Layout from '../components/Layout';
import Error from '../components/Error';


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
    setError(validateSubmit());
    !error && createProduct();
  }

  const validateSubmit = () => {
    return (product.name === '' || product.price === '' || product.description === '' || product.image === '' || product.stock === '' || product.categoryId === '');
  }

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage.ref(`images/${file.name}`);
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
    try {
      console.log("Crear Firebase");
      console.log(product);
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
        <h1 className="titulo">Cargar nuevo producto</h1>
        <form className="formulario formulario__products"
          onSubmit={handleSubmit}
        >
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
              > 
                {
                  categoryContext && categoryContext.categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))
                }
                <option value="" disabled selected>--Seleccione--</option>
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
            {error && <Error message={"Los campos (*) son obligatorios"} />}
            <input
              className="formulario__submit"
              type="submit"
              value="Cargar Producto"
            />
        </form>
      </>
    </Layout>
   );
}
 
export default Products;