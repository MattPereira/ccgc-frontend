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
  console.log(greenie);

  const theme = useTheme();

  let points = 1;

  if (feet < 20) {
    points += 1;
  }
  if (feet < 10) {
    points += 1;
  }
  if (feet < 2) {
    points += 1;
  }

  return (
    <Box sx={{ mb: 3, textAlign: "center" }}>
      <Link to={`/greenies/${id}`} style={{ textDecoration: "none" }}>
        <Paper elevation={8}>
          <Grid container>
            <Grid item xs={5}>
              <div className="GreenieCard-crop">
                <img alt={`${courseName}`} src={courseImg} />
              </div>
            </Grid>
            <Grid item xs={7}>
              {/* <Box
                sx={{
                  bgcolor: theme.palette.dark.main,
                  borderRadius: "0 4px 0 0",
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {courseName.split(" ").slice(0, 2).join(" ")}
                </Typography>
              </Box> */}
              <Box
                sx={{
                  backgroundColor: theme.palette.dark.main,
                  py: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.35rem",
                    fontFamily: "Itim",
                  }}
                >
                  {firstName} {lastName}
                </Typography>
              </Box>
              <Grid sx={{ mt: 1.5, px: 2 }}>
                <Grid item>
                  <Table className="mb-0">
                    <thead>
                      <tr>
                        <th>Hole</th>
                        <th>Length</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#{holeNumber}</td>
                        <td>
                          {feet}' {inches}"
                        </td>
                        <td>+{points}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </Box>
  );
};

export default GreenieCard;
