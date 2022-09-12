// import React, { useContext } from "react";
// import UserContext from "../auth/UserContext";
// import { Link } from "react-router-dom";

import logo from "../assets/ccgc_logo_simple.png";

import "./Homepage.css";

/** Homepage component
 *
 * welcome message and club logo
 *
 * This is routed to path "/"
 *
 * Router -> Homepage
 */

const Homepage = () => {
  // const { currentUser } = useContext(UserContext);
  console.debug("Homepage");

  return (
    <div className="Landing">
      {/* <h1 className="display-3">Contra Costa Golf Club</h1>
      {currentUser ? (
        <p>
          Welcome back, {currentUser.firstName} {currentUser.lastName}!
        </p>
      ) : (
        <>
          <span>Please </span>
          <Link to="/register">register</Link>
          <span> or </span> <Link to="/login">login</Link>
          <span> to input your round scores!</span>
        </>
      )} */}
      <div className="text-center">
        <img src={logo} alt="ccgc-logo" className="img-fluid w-75" />
      </div>
    </div>
  );
};

export default Homepage;
