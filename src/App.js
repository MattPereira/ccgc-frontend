import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./components/Auth/UserContext";
import CcgcApi from "./api/api";
import { decodeToken } from "react-jwt";

import ScrollToTop from "./components/Common/ScrollToTop";
import Router from "./router/Router";
import Navigation from "./components/Common/Navigation/Navigation";
// import Footer from "./components/Common/Footer";
import LoadingSpinner from "./components/Common/Loading";

import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";
import { Box } from "@mui/material";

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
            let currentUser = await CcgcApi.getUser(username);
            console.log("CURRENT USER", currentUser);
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

  let theme = createTheme({
    palette: {
      // mode: "dark",
      primary: {
        main: "#1976d2",
      },
      dark: {
        main: "#212529",
      },
    },
    typography: {
      h1: {
        fontFamily: "Cubano",
        marginBottom: "1rem",
        fontSize: "5rem",
        textAlign: "center",
      },
      h2: {
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontSize: "3rem",
      },
      h3: {
        fontFamily: "Cubano",
      },
      h4: {
        fontFamily: "Cubano",
      },
      h5: {
        fontFamily: "Cubano",
      },
      h6: {
        fontFamily: "Itim",
        fontSize: "1.3rem",
      },
      p: {
        fontFamily: "Poppins",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
          }}
        >
          <ScrollToTop>
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                height: "100%",
              }}
            >
              <Box>
                <Navigation logout={logout} />
              </Box>
              <Box
                className="CLASS NAME"
                sx={{ width: "100%", height: "100vh" }}
              >
                <Router login={login} register={register} />
                {/* <Footer /> */}
              </Box>
            </Box>
          </ScrollToTop>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
