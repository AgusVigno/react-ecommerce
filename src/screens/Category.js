import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {ProductsContext} from '../context/productsContext';
import {CategoryContext} from '../context/categoryContext';

import Layout from '../components/Layout';
import ItemList from '../components/ItemList';

const Category = () => {
  const { key } = useParams();
  const {getCategoryNameByKey} = useContext(CategoryContext);
  const {getProductsByCategoryKey} = useContext(ProductsContext);

  return ( 
    <Layout>
      <h1 className="titulo title__category">Listado de Productos</h1>
      <h2 className="subtitle__category">Categoría: {getCategoryNameByKey(key)}</h2>
      <ItemList products={getProductsByCategoryKey(key)} />
    </Layout>
  );
}
 
export default Category;