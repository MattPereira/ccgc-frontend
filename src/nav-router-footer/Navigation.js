import React, { useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import { Navbar, Nav, Container } from "react-bootstrap";

/** Navigation bar for site that shows on every page
 *
 * Logged in users see companies, jobs, profile, and logout
 *
 * Logged out users see login and signup
 *
 * Rendered by App
 */

const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);
  console.debug("Navigation");

  function loggedInNav() {
    return (
      <>
        <Nav.Item>
          <Nav.Link eventKey={6} as={RRNavLink} to="/profile">
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={7} as={RRNavLink} to="/logout" onClick={logout}>
            Logout {currentUser.firstName}
          </Nav.Link>
        </Nav.Item>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <Nav.Item>
          <Nav.Link eventKey={8} as={RRNavLink} to="/login">
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={9} as={RRNavLink} to="/register">
            Register
          </Nav.Link>
        </Nav.Item>
      </>
    );
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={RRNavLink} to="/" className="navbar-brand">
            CCGC
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link eventKey={1} as={RRNavLink} to="/standings">
                  Standings
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={2} as={RRNavLink} to="/tournaments">
                  Tournaments
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={3} as={RRNavLink} to="/greenies">
                  Greenies
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={4} as={RRNavLink} to="/members">
                  Members
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={5} as={RRNavLink} to="/courses">
                  Courses
                </Nav.Link>
              </Nav.Item>

              {currentUser ? loggedInNav() : loggedOutNav()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
