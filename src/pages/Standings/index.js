import React, { useState, useEffect } from "react";
import HorizontalRule from "../../components/Common/HorizontalRule/HorizontalRule";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./index.scss";

import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";

import PointsAccordion from "../../components/Standings/PointsAccordion";
import CalculationsAccordion from "../../components/Standings/CalculationsAccordion";
import StandingsTable from "../../components/Standings/StandingsTable";

import { Container, Row } from "react-bootstrap";

/** Show club standings page
 *
 * Display club standings table
 *
 * Display tour points tables
 *
 * Display club handicap computation info
 *
 * Router -> Standings
 */

const Standings = () => {
  console.debug("Standings");
  const [standings, setStandings] = useState(null);
  const { tourYears } = useParams();

  const [selected, setSelected] = useState("2022-23");

  const handleChange = (event, newSelected) => {
    setSelected(newSelected);
  };

  /* On component mount, load club standings from API */
  useEffect(
    function getStandingsOnMount() {
      console.debug("Standings useEffect getStandingsOnMount");

      async function getStandings() {
        setStandings(await CcgcApi.getStandings(tourYears));
      }
      getStandings();
    },
    [tourYears]
  );

  if (!standings) return <LoadingSpinner />;

  return (
    <Container className="py-5">
      <Row className="row justify-content-center">
        <h1 className="display-3 text-center">Standings</h1>
        <HorizontalRule width="20%" />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={selected}
            exclusive
            onChange={handleChange}
            aria-label="Selected tour years"
          >
            <ToggleButton
              value="2021-22"
              component={Link}
              to="/standings/2021-22"
            >
              21/22
            </ToggleButton>
            <ToggleButton
              value="2022-23"
              component={Link}
              to="/standings/2022-23"
            >
              22/23
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <p className="lead text-center mb-5 mt-4">
          Aggregate points for each player's top 10 rounds for the season.
        </p>
        <div className="col-lg-8">
          <StandingsTable data={standings} />
          <div className="my-5">
            <h3 className="text-center mb-3">Points</h3>
            <PointsAccordion />
          </div>

          <div className="mb-5">
            <h3 className="text-center mb-3">Calculations</h3>
            <CalculationsAccordion />
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Standings;
