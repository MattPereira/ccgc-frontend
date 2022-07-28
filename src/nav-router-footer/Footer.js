import React from "react";
import "./Footer.css";
import mpLogo from "../assets/MP_logo_light.svg";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer bg-secondary">
      <Row className="justify-content-center">
        <Col md="4" className="footer-copywright d-none d-lg-inline">
          <h3 className="pt-2">Copyright © {year} MP</h3>
        </Col>
        <Col md="4" className="footer-body">
          <Row className="justify-content-center pt-2">
            <Col className="col-2">
              <a
                href="https://mattpereira.github.io/personal-portfolio/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={mpLogo} alt="MP Logo" className="mp-logo" />
              </a>
            </Col>
            <Col className="col-2">
              <a
                href="https://github.com/MattPereira"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub size={25} />
              </a>
            </Col>
            <Col className="col-2">
              <a
                href="https://www.linkedin.com/in/matt-pereira-32428a63/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={25} />
              </a>
            </Col>
          </Row>
        </Col>
        <Col md="4" className="footer-copywright d-none d-lg-inline">
          <h3 className="pt-2">
            Designed & Developed by &nbsp;
            <a
              href="https://mattpereira.github.io/personal-portfolio/"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Matthew Pereira
            </a>
          </h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
