import React, {useEffect, useState, useContext} from 'react';
import {FirebaseContext} from '../firebase';

export const CategoryContext = React.createContext();

export default function CategoryProvider({ defaultValue = [], children}){

  const {firebase} = useContext(FirebaseContext);
  const [categories, setCategories] = useState(defaultValue);

  useEffect(() => {
    const getCategories = () => {
      console.log("Control de consulta API - Categorias.");
      firebase.db.collection("categories").orderBy('order', 'asc').onSnapshot(handleSnapshot)
    }
    getCategories();
  }, [firebase.db]);

  const handleSnapshot = (snapshop) => {
    const newCategories = snapshop.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setCategories(newCategories);
  }

  const getCategoryIdByKey = key => {
    const category = categories.find(category => category.key === key);
    return category ? category.id : undefined
  }

  const getCategoryNameByKey = key => {
    const category = categories.find(category => category.key === key);
    return category ? category.name : undefined
  }

  const isCategory = categoryKey => {
    const result = categories.find(category => category.key === categoryKey);
    return result ? true : false;
  }

  return (
    <CategoryContext.Provider value={{categories, getCategoryIdByKey, getCategoryNameByKey, isCategory}}>
      {children}
    </CategoryContext.Provider>
  )
}
