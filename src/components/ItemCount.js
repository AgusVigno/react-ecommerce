import React, {useState, useEffect} from 'react';

const ItemCount = (props) => {

  const [item, setItem] = useState({
    id: null,
    count: 0,
    max: null,
    min: null,
  });

  useEffect(() => {
    setItem({
      id: props.id,
      count: props.initial,
      max: props.max,
      min: props.min
    });
  }, [props]);

  const incrementItem = () => {
    if(item.count < item.max){
      setItem({
        ...item,
        count: item.count + 1
      })
    }
  }

  const decrementItem = () => {
    if(item.count > item.min){
      setItem({
        ...item,
        count: item.count - 1
      })
    }
  }

  return ( 
    <div className="producto__contador">
      <div className="producto__contador-contador">
        <button onClick={() => decrementItem()}>-</button>
        <span>{item.count}</span>
        <button onClick = {() => incrementItem()}>+</button>
      </div>
      <button 
        className="producto__contador-btn"
        onClick={() => props.addToCart(item.count)}
      >Agregar al Carrito</button>
    </div>
  );
}
 
export default ItemCount;