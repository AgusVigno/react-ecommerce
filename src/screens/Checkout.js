import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import {CartContext} from '../context/cartContext';
import Layout from '../components/Layout';
import Error from '../components/Error';

const Checkout = ({history}) => {
  const cartContext = useContext(CartContext);
  const {user} = useContext(FirebaseContext);
  const STATE_INITIAL = {
    name: '',
    lastName: '',
    email: '',
    tel: '',
    password: '',
    passwordRepeat: '',
  };
  const [disabled, setDisabled] = useState(true);
  const [visitor, setVisitor] = useState(STATE_INITIAL);
  const [error, setError] = useState();

  useEffect(() => {
    cartContext.cartSize === 0 &&
      history.push('/');
  }, [history, cartContext]);

  const handleChange = event => {
    event.preventDefault();
    setVisitor({
      ...visitor, [event.target.name]: event.target.value
    });
  }
  
  const handleBlur = event => {
    setError(event.nativeEvent.target.defaultValue === '');
    setDisabled(disabledSubmit());
  }

  const handleSubmit = event => {
    event.preventDefault();
    setError(disabledSubmit());
    !error && buy();
  }

  const buy = () => {
    setDisabled(true);
    setVisitor(STATE_INITIAL);
    console.log("Realizar Compra");
  }

  const disabledSubmit = () => {
    return (visitor.name === '' || visitor.lastName === '' || visitor.email === '' || visitor.tel === '' || 
      visitor.password === '' || visitor.password !== visitor.passwordRepeat);
  }

  return ( 
    <Layout>
      <h1 className="titulo">Checkout</h1>
      <div className="checkout__container">
        <ul >
          {
            cartContext.cart && cartContext.cart.map(product => (
              <li key={product.id} className="checkout__detail">
                <p className="checkout__detail-name">{product.name}</p>
                <p className="checkout__detail-price">{product.count} x ${product.price}</p>
                <p className="checkout__detalle-subtotal">${product.count * product.price}</p>
              </li>
            ))
          }
          <li className="checkout__total">Total: <span>${cartContext.total}</span></li>
        </ul>
        {
          user 
          ? <div className="checkout__login">
              <p className="checkout__cuenta">Comprar con la cuenta: <span>{user.email}</span></p>
              <button 
                className="checkout__submit"
                onClick={handleSubmit}
              >Realizar Pago</button>
            </div>
          : <> 
              <p className="checkout__text">Completa los siguientes datos para realizar la compra</p>
              <form className="formulario__checkout"
                onSubmit={handleSubmit}
              >
                <div className="campo">
                  <input
                    required
                    type="text"
                    id="name"
                    placeholder="Tu nombre (*)"
                    name="name"
                    value={visitor.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div> 
                <div className="campo">
                  <input
                    required
                    type="text"
                    id="lastName"
                    placeholder="Tu apellido (*)"
                    name="lastName"
                    value={visitor.lastName}
                    onChange={handleChange}
                  />
                </div>             
                <div className="campo">
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="Tu correo (*)"
                    name="email"
                    value={visitor.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="campo">
                  <input
                    required
                    type="tel"
                    id="tel"
                    placeholder="Tu teléfono (*)"
                    name="tel"
                    value={visitor.tel}
                    onChange={handleChange}
                  />
                </div>
                <div className="campo">
                  <input
                    required
                    type="password"
                    id="password"
                    placeholder="Tu contraseña (*)"
                    name="password"
                    value={visitor.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>              
                <div className="campo">
                  <input
                    required
                    type="password"
                    id="passwordRepeat"
                    placeholder="Repetir contraseña (*)"
                    name="passwordRepeat"
                    value={visitor.passwordRepeat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {error && <Error message={"Los campos (*) son obligatorios"} />}

                <input
                  disabled={disabled}
                  className="checkout__submit"
                  type="submit"
                  value="Realizar Pago"
                  onSubmit={handleSubmit}
                />
              </form>
              <p className="checkout__input-login">¿Ya tenés cuenta? <Link to="/login"><span> Iniciar Sesión</span></Link></p>
            </>
        
        }
      </div> 
    </Layout>
  );
}
 
export default Checkout;