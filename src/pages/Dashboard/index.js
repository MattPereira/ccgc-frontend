import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";

import { Link } from "react-router-dom";
import { Grid, Typography, Box, Container, IconButton } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import TournamentsDash from "./TournamentsDash";
import CoursesDash from "./CoursesDash";

import PageHero from "../../components/Common/PageHero/PageHero";
import courseImage from "../../assets/golf-courses.jpg";

/** DASHBOARD PAGE
 *
 *  Allows admin users to edit and delte any course or tournament
 *
 * Router -> Dashboard -> { CoursesDash, TournamentsDash }
 */

export default function Dashboard() {
  const [tournaments, setTournaments] = useState(null);
  const [courses, setCourses] = useState(null);

  /* On component mount, load tournaments from API */
  useEffect(function getTournamentsOnMount() {
    console.debug("TournamentList useEffect getTournamentsOnMount");

    async function fetchAllTournaments() {
      let tournaments = await CcgcApi.getTournaments();
      setTournaments(tournaments);
    }
    async function fetchAllCourses() {
      let courses = await CcgcApi.getCourses();
      setCourses(courses);
    }
    fetchAllCourses();
    fetchAllTournaments();
  }, []);

  if (!tournaments || !courses) return <LoadingSpinner />;

  console.log(tournaments);

  return (
    <Box>
      <PageHero title="Dashboard" backgroundImage={courseImage} />
      <Container sx={{ pt: 2, pb: 5, textAlign: "center" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={7} lg={6}>
            <Box sx={{ mb: 2 }} />
            <Typography variant="h3" gutterBottom>
              Tournaments
              <IconButton
                component={Link}
                to="/tournaments/new"
                color="primary"
              >
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Typography>

            <div style={{ height: "650px", width: "380px", margin: "auto" }}>
              <TournamentsDash tournaments={tournaments} />
            </div>
          </Grid>
          <Grid item xs={12} md={7} lg={6}>
            <Box sx={{ mb: 2 }} />

            <Typography variant="h3" gutterBottom>
              Courses
              <IconButton
                variant="contained"
                component={Link}
                to="/courses/new"
                color="primary"
              >
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Typography>

            <CoursesDash courses={courses} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
