import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../css/HeaderNav.css';  // Assure-toi d'avoir un fichier CSS pour les styles personnalisés

function HeaderNav() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-custom fixed-top">
      <Container>
        {/* Navbar Brand - À gauche */}
        <Navbar.Brand href="signtotext" className="navbar-brand">
          SLT <span className="beta-symbol">α</span>
        </Navbar.Brand>

        {/* Toggle pour mobile */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        {/* Navbar Collapse - à droite */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto"> {/* ms-auto pour aligner les éléments à droite */}
            <Nav.Link href="texttosign">Text To Sign</Nav.Link>
            <Nav.Link href="signtotext">Sign To Text</Nav.Link>
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link eventKey={2} href="about">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;
