import React, {useEffect} from 'react';
import useProducts from '../hoooks/useProducts';
import Layout from '../components/Layout';
import ItemList from '../components/ItemList';

const Home = () => {  
  const {products} = useProducts();

  useEffect(() => {
  }, [products]);

  return ( 
    <Layout>
      <h1 className="titulo">Listado de Productos</h1>
      <ItemList products={products}/>
    </Layout>
  );
}
 
export default Home;