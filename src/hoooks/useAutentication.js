import { useState, useEffect } from 'react';
import firebase from '../firebase';

function useAutentication(){
  const [userAutenticate, setUserAutenticate] = useState(null);
  
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(user => {
      if(user){
        setUserAutenticate(user);
      }else{
        setUserAutenticate(null);
      }
    });
    return () => unsuscribe;
  }, []);

  return userAutenticate;
}

export default useAutentication;
