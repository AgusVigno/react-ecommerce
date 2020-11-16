import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../firebase';
import Layout from '../components/Layout';
import Error from '../components/Error';

const Register = ({history}) => {
  const STATE_INITIAL = {
    name: '',
    password: '',
    email: '',
    city: '',
    tel: ''
  };
  const [user, setUser] = useState(STATE_INITIAL);
  const [error, setError] = useState(false);

  async function registerUser(){
    try {
      console.log("Consulta");
      setUser(STATE_INITIAL);
      await firebase.register(user);
      history.push('/');
    } catch (error) {
      console.log("Error: ", error);
      setError(error.message);
    }
  }

  const handleChange = event => {
    event.preventDefault();
    setUser({
      ...user, [event.target.name]: event.target.value
    });
  }

  const handleBlur = event => {
    const value = event.nativeEvent.target.defaultValue;
    setError(value === '');
  }

  const handleSubmit = event => {
    event.preventDefault();
    setError(validateSubmit());
    console.log("Errors: ", error);
    !error && registerUser();
  }

  const validateSubmit = () => {
    return (user.name === '' || user.password === '' || user.email === '');
  }

  return ( 
    <Layout>
      <>
        <h1 className="titulo">Crear Cuenta</h1>
        <form className="formulario"
          onSubmit={handleSubmit}
        >
          <div className="campo">
            <label htmlFor="name">Nombre (*)</label>
            <input
              type="text"
              id="name"
              placeholder="nombre..."
              name="name"
              value={user.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          
          <div className="campo">
            <label htmlFor="email">Correo (*)</label>
            <input
              type="email"
              id="email"
              placeholder="correo..."
              name="email"
              value={user.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="campo">
            <label htmlFor="password">Password (*)</label>
            <input
              type="password"
              id="password"
              placeholder="password..."
              name="password"
              value={user.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          
          <div className="campo">
            <label htmlFor="tel">Teléfono</label>
            <input
              type="tel"
              id="tel"
              placeholder="teléfono..."
              name="tel"
              value={user.tel}
              onChange={handleChange}
            />
          </div>

          <div className="campo">
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              placeholder="ciudad..."
              name="city"
              value={user.city}
              onChange={handleChange}
            />
          </div>

          {error && <Error message={"Los campos (*) son obligatorios"} />}
          <input
            className="formulario__submit"
            type="submit"
            value="Crear Cuenta"
          />
        </form>
        <p className="formulario__parrafo">¿Ya tenés cuenta? <Link to="/login"><span> Iniciar Sesión</span></Link></p>
      </>
    </Layout>
   );
}
 
export default Register;