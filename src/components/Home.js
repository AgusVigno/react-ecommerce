import React from 'react';
import ItemCount from './ItemCount';

const Home = (props) => {
  
  const addToCart = (count) => {
    console.log('Desde Home, agregar al carrito: ', count);
  }

  return ( 
    <div>
      <h1 style={{marginTop:50, marginBottom: 70}}>{props.message}</h1>
      <ItemCount 
        initial={1}
        min={0}
        max={5}
        addToCart={addToCart}
      />
    </div>
  );
}
 
export default Home;