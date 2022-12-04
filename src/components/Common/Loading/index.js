import React from "react";
import logo from "../../../assets/ccgc_logo.png";
import "./index.scss";

import { Typography, Box, Grid } from "@mui/material";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <Box sx={{ mt: 20 }}>
      <Grid
        container
        className="justify-content-center"
        style={{ width: "100%" }}
      >
        <Grid item xs={9} md={8} lg={6} xl={5}>
          <Box
            component="img"
            src={logo}
            alt="ccgc-logo"
            sx={{
              width: "100%",
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 30px",
              borderRadius: "100%",
            }}
            className="rotate"
          />
          <Typography sx={{ textAlign: "center" }}></Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoadingSpinner;
