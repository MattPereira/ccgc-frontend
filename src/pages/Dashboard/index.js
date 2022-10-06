import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";

import { Link } from "react-router-dom";
import { Grid, Typography, Box, Button, Container } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

const buttonSX = {
  "&:hover": { color: "white" },
};

export default function Dashboard() {
  const [tournaments, setTournaments] = useState(null);

  /* On component mount, load tournaments from API */
  useEffect(function getTournamentsOnMount() {
    console.debug("TournamentList useEffect getTournamentsOnMount");

    async function fetchAllTournaments() {
      let tournaments = await CcgcApi.getTournaments();
      setTournaments(tournaments);
    }
    fetchAllTournaments();
  }, []);

  if (!tournaments) return <LoadingSpinner />;

  console.log(tournaments);

  const tourneyColumns = [
    { field: "date", headerName: "Date", width: 100 },
    { field: "courseName", headerName: tournaments.courseName },
  ];

  const tourneyRows = tournaments.map((t) => {
    return {
      id: t.date,
      date: t.date,
      courseName: t.courseName,
    };
  });

  return (
    <Container>
      <Box sx={{ paddingTop: "3rem", textAlign: "center" }}>
        <Typography variant="h1" gutterBottom>
          Dashboard
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Tournaments
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/tournaments/new"
              size="large"
              sx={buttonSX}
            >
              Add Tourney
            </Button>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={tourneyRows}
                columns={tourneyColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Courses
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/courses/new"
              size="large"
              sx={buttonSX}
            >
              Add Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
