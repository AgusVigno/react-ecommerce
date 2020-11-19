import React, {useContext} from 'react';
import {ProductsContext} from '../context/productsContext';
import Layout from '../components/Layout';
import ItemList from '../components/ItemList';

const Home = () => {  
  const {getAllProducts} = useContext(ProductsContext);

  return ( 
    <Layout>
      <main>
        <h1 className="titulo">Listado de Productos</h1>
        <ItemList products={getAllProducts()} />
      </main>
    </Layout>
  );
}
 
export default Home;