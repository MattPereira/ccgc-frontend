// import logo from "../../assets/ccgc_logo_simple.png";
import logo from "../../assets/ccgc_logo_simple.png";

import { Container, Typography } from "@mui/material";

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
    <Container className="py-5">
      <Typography variant="h1">Upcoming Tournament</Typography>
    </Container>
  );
};

export default Homepage;
