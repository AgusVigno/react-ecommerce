import React, {useContext} from 'react';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import {FirebaseContext} from '../../firebase';
import {CartContext} from '../../context/cartContext';
import {CategoryContext} from '../../context/categoryContext';
import CartIcon from '../CartIcon';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const Menu = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
  li {
    padding: 1rem;
  }
  li:hover ul{
    visibility: visible;
    opacity: 1;
  } 
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    justify-content: unset;
    li {
      color: #fff;
      margin-bottom: 3rem;
    }
    a{
      margin-bottom: 3rem;
    }
    li:hover ul{
    visibility: hidden;
    opacity: 0;
  }
  }
  svg{
    font-size: 3rem;
  }
`;

const Submenu = styled.ul`
  position: absolute;
  background-color: #212c37;
  visibility: hidden;
  opacity: 0;
  transition: opacity 1.5s;
  width: 15rem;
  margin-top: 1rem;
  border-bottom-left-radius: 5rem;
  border-bottom-right-radius: 5rem;
  li{
    padding: .5rem 2rem;
  }
  li a{
    display: block;
    color: #FFF;
    padding-bottom: 1rem;
  }
  li a:hover{
    border-bottom: 1px solid #FFF;
    color: var(--botonPrimario);
  }
`;

const Buttons = styled.li`
  border: 1px solid #FFF;
  border-radius: 1rem;
  margin: 0 0 0 2rem;
  &:hover{
    font-weight: bold;
    border: 2px solid #db3604;
  }
  &.buttons{
    padding: 0 1rem;
  }
`;

const RightNav = ({ open }) => {
  const {user, firebase} = useContext(FirebaseContext);
  const {categories} = useContext(CategoryContext);
  const {reset} = useContext(CartContext);

  const logout = () => {
    firebase.logout();
    reset();
  }

  return (
    <Menu open={open}>
      <li> 
        <NavLink to={'/'}><HomeOutlinedIcon /></NavLink>
      </li>
      <li>Categoría
        <Submenu>
          {categories && categories.map(category => (
            <li key={category.id}>
              <NavLink to={`/category/${category.key}`}>
                {category.name}
              </NavLink>
            </li>
          ))}
        </Submenu>
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
      <CartIcon />
      {
        user 
          ? <Buttons className="buttons">
              <Link to={'/login'}
                onClick={logout}
              >Cerrar Sesión</Link>
            </Buttons>
          : <>
              <Buttons className="buttons">
                <Link to={'/login'}>Iniciar Sesión</Link>
              </Buttons>
              <Buttons className="buttons">
                <Link to={'/register'}>Crear Cuenta</Link>
              </Buttons>
            </>
      }
    </Menu>
  )
}

export default RightNav