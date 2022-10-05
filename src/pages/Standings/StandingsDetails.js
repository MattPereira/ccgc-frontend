import React, { useState, useEffect } from "react";
import HorizontalRule from "../../components/Common/HorizontalRule/HorizontalRule";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./StandingsDetails.scss";

import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";

import PointsAccordion from "../../components/Standings/PointsAccordion";
import StandingsTable from "../../components/Standings/StandingsTable";

import { Container, Row, Table, Col } from "react-bootstrap";

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
            <h3 className="text-center mb-3 display-6">Points</h3>
            <Table responsive bordered className="text-center">
              <thead>
                <tr>
                  <th colSpan={6} className="table-dark">
                    POSITION
                  </th>
                </tr>
                <tr className="table-secondary">
                  <th>CATEGORY</th>
                  <th>1st</th>
                  <th>2nd</th>
                  <th>3rd</th>
                  <th>4th</th>
                  <th>5th</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>STROKES</th>
                  <td>25</td>
                  <td>20</td>
                  <td>15</td>
                  <td>10</td>
                  <td>5</td>
                </tr>
                <tr>
                  <th>PUTTS</th>
                  <td>6</td>
                  <td>4</td>
                  <td>2</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </Table>
            <Row className="text-center">
              <Col xs={6}>
                <Table bordered>
                  <thead>
                    <tr>
                      <th colSpan={2} className="table-dark">
                        GREENIES
                      </th>
                    </tr>
                    <tr className="table-secondary">
                      <th>DISTANCE</th>
                      <th>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>ON GREEN</th>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th>INSIDE 20'</th>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th>INSIDE 10'</th>
                      <td>2</td>
                    </tr>
                    <tr>
                      <th>INSIDE 2'</th>
                      <td>3</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col xs={6}>
                <Table bordered className="text-center">
                  <thead>
                    <tr>
                      <th colSpan={2} className="table-dark">
                        SCORES
                      </th>
                    </tr>
                    <tr className="table-secondary">
                      <th>TYPE</th>
                      <th>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>PAR</th>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th>BIRDIE</th>
                      <td>2</td>
                    </tr>
                    <tr>
                      <th>EAGLE</th>
                      <td>4</td>
                    </tr>
                    <tr>
                      <th>ACE</th>
                      <td>10</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Standings;
