import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {CategoryContext} from '../context/categoryContext';
import useProducts from '../hoooks/useProducts';
import Layout from '../components/Layout';
import ItemList from '../components/ItemList';

const Category = () => {
  const categoryContext = useContext(CategoryContext);
  const { key } = useParams();
  const {products} = useProducts(categoryContext.getCategoryIdByKey(key));

  return ( 
    <Layout>
      <h1 className="titulo title__category">Listado de Productos</h1>
      <h2 className="subtitle__category">Categoría: {categoryContext.getCategoryNameByKey(key)}</h2>
      <ItemList products={products} />
    </Layout>
  );
}
 
export default Category;