import React, { useContext } from "react";
import UserContext from "../../components/Auth/UserContext";
import { Link } from "react-router-dom";

import logo from "../../assets/ccgc_logo_simple.png";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";

/** Homepage component
 *
 * welcome message and club logo
 *
 * This is routed to path "/"
 *
 * Router -> Homepage
 */

//FIX USING CHEAP MARGIN TOP SETTING ON LOGO
//HOW TO MAKE IT ALWAYS MIDDLE NO MATTER SCREEN HEIGHT?

const Homepage = () => {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage");

  const buttonSX = {
    borderRadius: 28,
    width: "50%",
    fontFamily: "Fredoka one",
    fontSize: "1.25rem",
    "&:hover": { color: "white" },
  };

  return (
    <div className="py-5">
      <Row className="justify-content-center align-items-center text-center m-0">
        <Col xs={9} md={8} lg={6} xl={5}>
          <img
            src={logo}
            alt="ccgc-logo"
            className="img-fluid rotate"
            style={{ marginTop: "8rem" }}
          />

          {currentUser && currentUser.isAdmin ? (
            <div className="mt-5 mb-3">
              <Button
                component={Link}
                to="/dashboard"
                variant="contained"
                size="large"
                sx={buttonSX}
                color="secondary"
              >
                Dashboard
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-5 mb-3">
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  size="large"
                  sx={buttonSX}
                  color="primary"
                >
                  Login
                </Button>
              </div>
              <div className="mb-5">
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="error"
                  size="large"
                  sx={buttonSX}
                >
                  Register
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;
