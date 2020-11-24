import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import Burger from './Burger';

const Header = styled.header`
  background-color: #212c37;
`;

const Nav = styled.nav`
  width: 100%;
  margin: 0 auto;
  height: 65px;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 1.4rem;
  @media(min-width: 768px){
    width: 1200px;
    font-size: 1.6rem;
  }
  .logo {
    padding: 2rem;
    font-size: 20px;
  }
`
const Navbar = () => {
  return (
    <Header>
      <Nav>
        <div className="logo">
          <Link to='/'>TuLugar</Link>
        </div>
        <Burger />
      </Nav>
    </Header>
  )
}

export default Navbar