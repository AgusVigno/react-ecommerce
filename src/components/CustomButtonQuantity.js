import React, {useState, useEffect} from 'react';

const CustomButtonQuantity = (props) => {

  const [item, setItem] = useState({
    id: null,
    max: null,
  });
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    setItem({
      id: props.id,
      max: props.max,
    });
  }, [props]);

  const incrementItem = () => {
    const newCount = counter + 1;
    if(newCount <= item.max){
      setCounter(newCount);
      props.setCount(newCount);
    }
  }

  const decrementItem = () => {
    const newCount = counter - 1;
    if(newCount >= 1){
      setCounter(newCount);
      props.setCount(newCount);
    }
  }

  return ( 
    <div className="producto__contador">
      <button 
        disabled={counter === 1} 
        onClick={() => decrementItem()}>-</button>
      <span
        className="producto__contador-span">
        {counter}
      </span>
      <button
        disabled={props.max === counter} 
        onClick = {() => incrementItem()}
      >+</button>
    </div>
  );
}
 
export default CustomButtonQuantity;