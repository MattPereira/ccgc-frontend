import logo from "../../assets/ccgc_logo_simple.png";
import { Row, Col } from "react-bootstrap";

import { Box, Stack } from "@mui/material";

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
  console.debug("Homepage");

  return (
    <Box
      component={Stack}
      direction="column"
      justifyContent="center"
      sx={{ height: "85vh" }}
    >
      <Row className="justify-content-center align-items-center text-center m-0">
        <Col xs={9} md={8} lg={6} xl={5}>
          <img
            src={logo}
            alt="ccgc-logo"
            className="img-fluid rotate"
            style={{ margin: "auto 0px" }}
          />
        </Col>
      </Row>
    </Box>
  );
};

export default Homepage;
