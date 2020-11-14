import React from 'react';
import CheckIcon from '@material-ui/icons/Check';

const Alerta = () => {
  return ( 
    <div className="alert">
      <div className="alert__flex">
        <CheckIcon className="alert__icono" />
        <p className="alert__titulo">Correcto</p>
      </div>
      <p className="alert__texto">Se agrego al carrito correctamente</p>
    </div>
   );
}
 
export default Alerta;