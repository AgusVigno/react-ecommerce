import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {CategoryContext} from '../context/categoryContext';
import {FirebaseContext} from '../firebase';

const Navegacion = () => {
  const {categories} = useContext(CategoryContext);
  const {user} = useContext(FirebaseContext);

  return ( 
    <nav>
      <ul className="menu">
        <li> 
          <NavLink to={'/'} // activeClassName="pagina-actual"
          >Inicio</NavLink>
        </li>
        <li>Categoría
          <ul className="submenu">
            {categories && categories.map(category => (
              <li key={category.id}>
                <NavLink to={`/category/${category.key}`}>
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <NavLink 
            to={'/contact'}
            activeClassName="pagina-actual"
          >Contacto</NavLink>
        </li>
        { 
          user &&
            <li> 
              <NavLink 
                to={'/products'} 
                activeClassName="pagina-actual"
              >Productos</NavLink>
            </li>
        }
      </ul>
    </nav>
  );
}
 
export default Navegacion;