import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";

import GreenieCardList from "../../components/Greenies/GreenieCardList";
import PageHero from "../../components/Common/PageHero/PageHero";
import greenieImage from "../../assets/greenie.webp";

import { Typography, Box, Container } from "@mui/material";

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
    <Box>
      <PageHero title="Greenies" backgroundImage={greenieImage} />
      <Container sx={{ pb: 5 }}>
        <Typography variant="h2" align="center" sx={{ my: 3 }}>
          Top 10
        </Typography>
        <Box>
          <GreenieCardList greenies={greenies} />
        </Box>
      </Container>
    </Box>
  );
};

export default GreenieList;
