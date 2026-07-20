import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaGlobe } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

import "../css/Navbars.css";
import logo from "../logo.png";

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>

        {/* Logo + Title */}

        <Navbar.Brand className="brand-section ">

          <img
            src={logo}
            alt="Jagruti Foundation"
            className="brand-logo"
          />

          <div className="brand-text d-none d-sm-block">

            <h5>Jagruti Foundation</h5>

            <p>
              Empowering lives through skill,
              care and compassion.
            </p>

          </div>

        </Navbar.Brand>
        {/* Mobile */}
        <div className="d-lg-none">
          <div className="right-control">

          <div className="right-section">

            <Button className="donate-btn">
              <FaRegHeart className="heart-icon" />
              Donate
            </Button>

            {/* <FaGlobe className="globe-icon" /> */}

          </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mx-auto nav-links">

            <Nav.Link href="#" >Home</Nav.Link>
            <Nav.Link href="#" className="active-tab" >
              About Us
            </Nav.Link>
            <Nav.Link href="#" >Programs</Nav.Link>
            <Nav.Link href="#"  >Blog & News</Nav.Link>
            <Nav.Link href="#" >Gallery</Nav.Link>
            <Nav.Link href="#" >Contact Us</Nav.Link>
          </Nav>


        </Navbar.Collapse>
        <div className="d-none d-lg-flex">
          <div className="right-section">

            <Button className="donate-btn">
              <FaRegHeart className="heart-icon" />
              Donate
            </Button>

            <FaGlobe className="globe-icon" />

          </div>
          </div>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;