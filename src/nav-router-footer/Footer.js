import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer bg-secondary">
      <Row className="justify-content-center">
        <Col md="4" className="footer-copywright d-none d-md-inline">
          <h3 className="pt-2">Copyright © {year} MP</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons pt-1">
            <li className="social-icons">
              <a
                href="https://github.com/MattPereira"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub size={25} />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/matt-pereira-32428a63/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={25} />
              </a>
            </li>
          </ul>
        </Col>
        <Col md="4" className="footer-copywright d-none d-md-inline">
          <h3 className="pt-2">Designed & Developed by Matthew Pereira</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
