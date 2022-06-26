import React, { useContext, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import { Navbar, Nav } from "react-bootstrap";

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

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  function loggedInNav() {
    return (
      <>
        <Nav.Item>
          <Nav.Link as={RRNavLink} to="/profile" onClick={closeMenu}>
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={RRNavLink} to="/logout" onClick={logout}>
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
          <Nav.Link as={RRNavLink} to="/login" onClick={closeMenu}>
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={RRNavLink} to="/register" onClick={closeMenu}>
            Register
          </Nav.Link>
        </Nav.Item>
      </>
    );
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav.Link as={RRNavLink} to="/" className="navbar-brand">
          CCGC
        </Nav.Link>
        {/* onClick toggle whether navbar drops down to display links */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" navbar>
            <Nav.Item>
              <Nav.Link as={RRNavLink} to="/standings" onClick={closeMenu}>
                Standings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={RRNavLink} to="/tournaments" onClick={closeMenu}>
                Tournaments
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={RRNavLink} to="/greenies" onClick={closeMenu}>
                Greenies
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={RRNavLink} to="/members" onClick={closeMenu}>
                Members
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={RRNavLink} to="/courses" onClick={closeMenu}>
                Courses
              </Nav.Link>
            </Nav.Item>

            {currentUser ? loggedInNav() : loggedOutNav()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
