import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Paper, Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./GreenieCard.css";

/** Greenie card component.
 *
 * Show greenie username, date, hole number, feet, inches, course name, and course image.
 * GreenieCard also functions as link to each greenie's detail page.
 *
 * GreenieCard is rendered by GreenieList and GreenieDetails
 *  to show a "card" for each greenie.
 *
 * On the GreenieDetails page, show edit and delete buttons
 * for logged in same user or admin only.
 *
 * GreenieList -> GreenieCard
 * GreenieDetails -> GreenieCard
 *
 */

const GreenieCard = ({ greenie }) => {
  const {
    id,
    holeNumber,
    feet,
    inches,
    firstName,
    lastName,
    courseName,
    courseImg,
  } = greenie;

  const theme = useTheme();
  console.log("THEME", theme);
  return (
    <Box sx={{ mb: 3 }}>
      <Link to={`/greenies/${id}`} style={{ textDecoration: "none" }}>
        <Paper elevation={8}>
          <Grid container>
            <Grid item xs={6} sx={{ display: { xs: "none", sm: "block" } }}>
              <div className="GreenieCard-crop">
                <img alt={`${courseName}`} src={courseImg} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  bgcolor: theme.palette.dark.main,
                  borderRadius: "0 4px 0 0",
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {firstName} {lastName}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: theme.palette.success.main,
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {courseName.split(" ").slice(0, 2).join(" ")}
                </Typography>
              </Box>
              <Box sx={{ px: 2, pt: 0.75 }}>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Hole</th>
                      <th>Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#{holeNumber}</td>
                      <td>
                        {feet}' {inches}"
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Box>
  );
};

export default GreenieCard;
