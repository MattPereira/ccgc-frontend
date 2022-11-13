import React from "react";
import logo from "../../../assets/ccgc_logo_simple.png";
import "./index.scss";

import { Row, Col } from "react-bootstrap";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography, Box } from "@mui/material";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <Row className="justify-content-center" style={{ width: "100%" }}>
        <Col xs={9} md={8} lg={6} xl={5}>
          <img src={logo} alt="ccgc-logo" className="img-fluid rotate" />
          <h3 className="text-center my-3">Loading... </h3>
          <LinearProgress sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "center" }}>
            (If loading persists, try{" "}
            <Box
              component="span"
              sx={{ color: "blue" }}
              onClick={() => window.location.reload(false)}
            >
              reload
            </Box>
            )
          </Typography>
        </Col>
      </Row>
    </div>
  );
}

export default LoadingSpinner;
