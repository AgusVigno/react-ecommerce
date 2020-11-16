import {useContext, useState, useEffect} from 'react';
import {FirebaseContext} from '../firebase';

const useProducts = (categoryId) => {
  const [products, setProducts] = useState([]);
  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      categoryId 
        ? firebase.db.collection('products').where('categoryId', '==', categoryId).onSnapshot(handleSnapshot)
        : firebase.db.collection('products').onSnapshot(handleSnapshot);
    }
    getProducts();
  }, [categoryId, firebase.db]);

  function handleSnapshot(snapshot){
    const products = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setProducts(products);
  }
  return {
    products
  }
}
 
export default useProducts;