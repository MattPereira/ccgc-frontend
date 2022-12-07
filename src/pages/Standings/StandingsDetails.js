import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";

import { Typography, Box, Tab } from "@mui/material";

import StandingsTable from "../../components/Standings/StandingsTable";
import PointsDetails from "../../components/Standings/PointsDetails";
import PageHero from "../../components/Common/PageHero/PageHero";
import standingsImage from "../../assets/tour-standings.webp";

import { Container, Row } from "react-bootstrap";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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

  const [tourYear, setTourYear] = useState("2022-23");

  const [value, setValue] = useState("2");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* On component mount, load club standings from API */
  useEffect(
    function getStandingsOnMount() {
      console.debug("Standings useEffect getStandingsOnMount");

      async function getStandings() {
        setStandings(await CcgcApi.getStandings(tourYear));
      }
      getStandings();
    },
    [tourYear]
  );

  if (!standings) return <LoadingSpinner />;

  console.log(standings);

  return (
    <Box>
      <PageHero title="Tour Standings" backgroundImage={standingsImage} />

      <Container className="py-5">
        <Row className="justify-content-center">
          <div className="col-lg-8 text-center">
            <Typography variant="h2">Rankings</Typography>
            <TabContext value={value}>
              <Box>
                <TabList
                  centered
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="2022"
                    value="1"
                    onClick={() => setTourYear("2021-22")}
                    sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
                  />
                  <Tab
                    label="2023"
                    value="2"
                    onClick={() => setTourYear("2022-23")}
                    sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
                  />
                </TabList>
              </Box>
              <TabPanel sx={{ px: 0 }} value="1">
                <StandingsTable data={standings} />
              </TabPanel>
              <TabPanel sx={{ px: 0 }} value="2">
                <StandingsTable data={standings} />
              </TabPanel>
            </TabContext>
            <div className="my-5">
              <PointsDetails />
            </div>
          </div>
        </Row>
      </Container>
    </Box>
  );
};

export default Standings;
