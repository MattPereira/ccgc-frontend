import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import CcgcApi from "./api/api";
import { decodeToken } from "react-jwt";

import ScrollToTop from "./common/ScrollToTop";
import Router from "./router/Router";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import LoadingSpinner from "./common/LoadingSpinner";

/** Contra Costa Golf Club App
 *
 *  * - infoLoaded: has user data been pulled from API?
 *  (this manages the loading spinner)
 *
 * - currentUser: user obj from API used to tell if someone
 *  is logged in. Passed around via context throughout app.
 *
 * - token: for logged in users, this is their auth JWT.
 *   Required to be set for most API calls. This is intially
 *   read from localStorage and synced to there via the custom
 *   useLocalStorage hook.
 *
 *   App -> Routes
 *
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("jobly-token");

  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "currentUser=",
    currentUser,
    "token=",
    token
  );

  /**Load user info from API. loadUserInfo() only runs if user is logged in and has a token.
   * loadUserInfo() only needs to re-run when a user logs out, so the value of the token
   * is a depndency for this useEffect().
   */

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decodeToken(token);
            //put token on the API class and use it to call the API
            CcgcApi.token = token;
            let currentUser = await CcgcApi.getCurrentUser(username);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser() is running.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** handle user logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** handle user registration.
   *
   * Automatically log user in (using setToken(token)) upon registration.
   */
  async function register(registrationData) {
    try {
      //API sends back the token for the new user.
      let token = await CcgcApi.register(registrationData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("registration failed", errors);
      return { success: false, errors };
    }
  }

  /** Handle user login */
  async function login(loginData) {
    try {
      let token = await CcgcApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { sucess: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
          }}
        >
          {/* <div style={{ paddingBottom: "5rem" }}> */}
          <ScrollToTop>
            <NavBar logout={logout} />
            <Router login={login} register={register} />
          </ScrollToTop>
          {/* </div> */}
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
