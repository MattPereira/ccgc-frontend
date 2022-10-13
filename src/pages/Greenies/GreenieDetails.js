import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../components/Auth/UserContext";
import { useParams } from "react-router-dom";
import CcgcApi from "../../api/api";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";
// import AdminButtons from "../../components/Common/AdminButtons/AdminButtons";

import {
  Divider,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";

import GreenieCard from "../../components/Greenies/GreenieCard";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

/** Greenie details page.
 *
 * On component mount, load the greenie data from API
 *
 * Also offer edit and delete buttons for logged in same user or admin only.
 *
 * This is routed to path "/greenies/:id"
 *
 * Routes -> GreenieDetails -> {AdminButtons, GreenieCard}
 *
 */

const GreenieDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);

  console.debug("GreenieDetails", "id=", id);

  const [greenie, setGreenie] = useState(null);

  /* On component mount, load course data from API */
  useEffect(
    function getGreenieOnMount() {
      console.debug("GreenieDetails useEffect getGreenieOnMount");

      async function getGreenie() {
        setGreenie(await CcgcApi.getGreenie(id));
      }
      getGreenie();
    },
    [id]
  );

  if (!greenie) return <LoadingSpinner />;
  console.log(greenie);
  console.log(currentUser);

  return (
    <Container className="py-5">
      <Typography variant="h1">Greenie Details</Typography>
      <Divider role="presentation" sx={{ mb: 5, width: "17%" }} />

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} align="center">
          <GreenieCard greenie={greenie} />
          <Box>
            <Button
              component={Link}
              to={`/greenies/${greenie.id}/update`}
              variant="contained"
              size="large"
              sx={{ "&:hover": { color: "white" } }}
            >
              <ArrowCircleUpIcon /> <span className="ms-2">Update</span>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GreenieDetails;
