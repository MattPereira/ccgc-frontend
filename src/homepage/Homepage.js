// import React, { useContext } from "react";
// import UserContext from "../auth/UserContext";
// import { Link } from "react-router-dom";

import logo from "../assets/ccgc_logo.png";

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
    <div className="text-center mb-5">
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
      <div>
        <img src={logo} alt="ccgc-logo" className="img-fluid" />
      </div>
    </div>
  );
};

export default Homepage;
