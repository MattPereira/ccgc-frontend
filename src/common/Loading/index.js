import React from "react";
import logo from "../../assets/ccgc_logo_simple.png";
import "./index.scss";

import { Row, Col, ProgressBar } from "react-bootstrap";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <Row className="justify-content-center" style={{ width: "100%" }}>
        {/* <div className="col-auto">
          <div className="lds-ring" data-testid="loading-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div> */}
        <Col xs={9} md={8} lg={6} xl={5}>
          <img src={logo} alt="ccgc-logo" className="img-fluid rotate" />
          <h3 className="text-center py-3">Loading...</h3>
          <ProgressBar animated now={75} variant="dark" />
        </Col>
      </Row>
    </div>
  );
}

export default LoadingSpinner;
