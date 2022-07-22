import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "happy-gilmore",
  firstName: "Happy",
  lastName: "Gilmore",
  email: "happy@gmail.com",
  isAdmin: true,
  rounds: [],
};

const UserProvider = ({ children, currentUser = demoUser }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
