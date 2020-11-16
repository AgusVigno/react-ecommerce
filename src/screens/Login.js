import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../firebase';
import Layout from '../components/Layout';
import Error from '../components/Error';

const Login = ({history}) => {
  const STATE_INITIAL = {
    password: '',
    email: ''
  }
  const [user, setUser] = useState(STATE_INITIAL);
  const [error, setError] = useState(false);

  async function login(){
    try {
      await firebase.login(user.email, user.password);
      setUser(STATE_INITIAL);
      history.push('/');
    } catch (error) {
      console.log("Error: ", error);
      setError(error.message);
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    setUser({
      ...user, [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  }

  return ( 
    <Layout>
      <>
        <h1 className="titulo">Iniciar Sesión</h1>
        <form className="formulario"
          onSubmit={handleSubmit}
        >
          <div className="campo">
            <label htmlFor="email">Correo</label>
            <input
              required
              type="email"
              id="email"
              placeholder="ingresar correo..."
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              placeholder="ingresar password..."
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          {error && <Error message={error} />}
          <input
            className="formulario__submit"
            type="submit"
            value="Iniciar sesión"
          />
        </form>
        <p className="formulario__parrafo">¿No tenés cuenta? <Link to="/register"><span>Registrate!</span></Link></p>
      </>
    </Layout>
   );
}
 
export default Login;