import React, {useEffect, useState, useContext} from 'react';
import {FirebaseContext} from '../firebase';
import { CategoryContext } from './categoryContext';

export const ProductsContext = React.createContext();

export default function ProductsProvider({ defaultValue = null, children}){

  const {firebase} = useContext(FirebaseContext);
  const {getCategoryIdByKey} = useContext(CategoryContext);
  const [products, setProducts] = useState(defaultValue);

  useEffect(() => {
    const getProducts = () => {
      console.log("Control de consulta API - Productos.");
      firebase.db.collection('products').onSnapshot(handleSnapshot);
    }
    getProducts();
  }, [firebase.db]);

  function handleSnapshot(snapshot){
    const newProducts = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setProducts(newProducts);
  }

  const getAllProducts = () => {
    return products;
  }

  const getProductsByCategoryKey = categoryKey => {
    const newProducts = products.filter( product => product.categoryId === getCategoryIdByKey(categoryKey) );
    newProducts.map(product => product.image.includes("firebasestorage") ? product : product.image = `../${product.image}`);
    return newProducts
  }

  const getProductById = productId => {
    const product = products.find(product => product.id === productId);
    return product ? {...product, image: `../${product.image}`} : undefined;
  }

  return (
    <ProductsContext.Provider value={{getAllProducts, getProductsByCategoryKey, getProductById}}>
      {children}
    </ProductsContext.Provider>
  )
}
