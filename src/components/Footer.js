import React from 'react';
import {NavLink} from 'react-router-dom'
import styled from 'styled-components';

const FooterNav = styled.footer`
  background-color: #212c37;
`;

const Nav = styled.nav`
  width: 100%;
  margin: 0 auto;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 1.4rem;
  @media (min-width: 768px) {
    width: 1200px;
    font-size: 1.64rem;
  }
  .logo {
    padding: 2rem;
    font-size: 2rem;
  }
`

const Menu = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
`;

const Copyright = styled.p`
  text-align: center;
  color: #ffffff;
  font-size: 1rem;
  margin-top: 0;
  a{
    color: #ffffff!important;
  }
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Footer = () => {
  return (
    <FooterNav>
      <Nav>
        <Menu>
          <li> 
            <NavLink to={'/'}>Inicio</NavLink>
          </li>
          <li>Categoría</li>
          <li>
            <NavLink 
              to={'/contact'}
              activeClassName="pagina-actual"
            >Contacto</NavLink>
          </li>
        </Menu>
        <div className="logo">
          <NavLink to='/'>TuLugar</NavLink>
        </div>
      </Nav>
      <Copyright>Todos los derechos reservados. Copyright &copy;
        <NavLink style={{color: 'black'}} to="/">
          TuLugar
        </NavLink>{' '}
        { new Date().getFullYear()}
        {'.'}
      </Copyright>
    </FooterNav>
  )
}

export default Footer;