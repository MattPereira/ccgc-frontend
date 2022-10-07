import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./StandingsDetails.scss";

import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";

import StandingsTable from "../../components/Standings/StandingsTable";

import { Container, Row, Table, Col } from "react-bootstrap";
import { Typography, Divider } from "@mui/material";

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
      <Row className="justify-content-center">
        <Typography variant="h1" textAlign="center">
          Standings
        </Typography>
        <Divider role="presentation" sx={{ width: "17%" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "3rem",
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
              sx={{ width: "100px" }}
            >
              2022
            </ToggleButton>
            <ToggleButton
              value="2022-23"
              component={Link}
              to="/standings/2022-23"
              sx={{ width: "100px" }}
            >
              2023
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <div className="col-lg-8">
          <StandingsTable data={standings} />
          <div className="my-5">
            <Typography
              variant="h3"
              textAlign="center"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Points
            </Typography>
            <Table
              responsive
              bordered
              variant="light"
              striped
              className="text-center"
            >
              <thead>
                <tr className="table-dark">
                  <th>POSITION</th>
                  <th>1ST</th>
                  <th>2ND</th>
                  <th>3RD</th>
                  <th>4TH</th>
                  <th>5TH</th>
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
                <Table bordered variant="light" striped>
                  <thead>
                    <tr className="table-dark">
                      <th>GREENIES</th>
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
                <Table bordered variant="light" striped className="text-center">
                  <thead>
                    <tr className="table-dark">
                      <th>SCORE</th>
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
