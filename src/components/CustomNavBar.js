import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import CartIcon from './CartIcon';

function CustomNavBar() {
	return(
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand href="#home">Logo</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="#home">Inicio</Nav.Link>
				<Nav.Link href="#nosotros">Nosotros</Nav.Link>
				<Nav.Link href="#productos">Productos</Nav.Link>
			</Nav>
			<Form inline>
				<FormControl type="text" placeholder="buscar productos..." className="mr-sm-2" />
				<Button variant="outline-light">Buscar</Button>
			</Form>
			<CartIcon />
		</Navbar>
	);
}

export default CustomNavBar;
