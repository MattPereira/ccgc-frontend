import React, { useContext, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler,
  Collapse,
} from "reactstrap";

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
        <NavItem>
          <NavLink tag={RRNavLink} to="/profile" onClick={closeMenu}>
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/logout" onClick={logout}>
            Logout {currentUser.firstName}
          </NavLink>
        </NavItem>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <NavItem>
          <NavLink tag={RRNavLink} to="/login" onClick={closeMenu}>
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/register" onClick={closeMenu}>
            Register
          </NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md" light>
        <NavLink tag={RRNavLink} to="/" className="navbar-brand">
          CCGC
        </NavLink>
        {/* onClick toggle whether navbar drops down to display links */}
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/standings" onClick={closeMenu}>
                Standings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/tournaments" onClick={closeMenu}>
                Tournaments
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/greenies" onClick={closeMenu}>
                Greenies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/members" onClick={closeMenu}>
                Members
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/courses" onClick={closeMenu}>
                Courses
              </NavLink>
            </NavItem>

            {currentUser ? loggedInNav() : loggedOutNav()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
