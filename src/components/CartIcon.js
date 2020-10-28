import React from 'react';

const CartIcon = () => {

  fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then((response) => { response.json()})
    .then((ret) => { console.log(ret)})
    
  return (
    <h1>holaaaa</h1>
  );
}

export default CartIcon;