import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage");

  return (
    <div className="text-center">
      <h1 className="display-3">Contra Costa Golf Club</h1>
      <p className="lead">This is the CCGC homepage!</p>
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
      )}
    </div>
  );
};

export default Homepage;
