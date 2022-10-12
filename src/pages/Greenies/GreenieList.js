import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";

import GreenieCardList from "../../components/Greenies/GreenieCardList";

import { Container, Row } from "react-bootstrap";

import { Typography, Divider, Box } from "@mui/material";

/** Show page with all greenies listed
 *
 *
 * On component mount, load greenies from API
 *
 * GreenieList component is "smart" parent component
 * that will render the GreenieCardList component.
 *
 * This is routed to path "/greenies"
 *
 * Router -> GreenieList -> GreenieCardList -> GreenieCard
 */

const GreenieList = () => {
  console.debug("GreenieList");

  const [greenies, setGreenies] = useState(null);

  /* On component mount, load greenies from API */
  useEffect(function getGreeniesOnMount() {
    console.debug("GreenieList useEffect getGreeniesOnMount");

    async function fetchAllGreenies() {
      let greenies = await CcgcApi.getGreenies();
      setGreenies(greenies);
    }
    fetchAllGreenies();
  }, []);

  if (!greenies) return <LoadingSpinner />;

  console.log(greenies);

  return (
    <Container className="py-5 text-center">
      <Box sx={{ display: "inline-block" }}>
        <Typography variant="h1">Greenies</Typography>
        <Divider role="presentation" sx={{ width: "50%" }} />
      </Box>

      <Row className="text-center justify-content-center">
        <GreenieCardList greenies={greenies} />
      </Row>
    </Container>
  );
};

export default GreenieList;
