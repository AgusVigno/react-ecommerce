import React, {useState, useEffect} from 'react';

const ItemCount = (props) => {

  const [item, setItem] = useState({
    id: null,
    max: null,
    min: null,
  });
  const [contador, setContador] = useState(0);

  useEffect(() => {
    setItem({
      id: props.id,
      max: props.max,
      min: props.min
    });
  }, [props]);

  const incrementItem = () => {
    const newCount = contador + 1;
    if(newCount <= item.max){
      setContador(newCount);
      props.setCount(newCount);
    }
  }

  const decrementItem = () => {
    const newCount = contador - 1;
    if(newCount >= item.min){
      setContador(newCount);
      props.setCount(newCount);
    }
  }

  return ( 
    <div className="producto__contador">
      <div className="producto__contador-contador">
        <button onClick={() => decrementItem()}>-</button>
        <span
          className="producto__contador-span">
          {contador}
        </span>
        <button onClick = {() => incrementItem()}>+</button>
      </div>
      <button 
        className="producto__contador-btn"
        onClick={() => props.addToCart(contador)}
      >Agregar al Carrito</button>
    </div>
  );
}
 
export default ItemCount;