import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../components/Auth/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import CcgcApi from "../../api/api";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/Common/Loading";

import {
  Divider,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Modal,
} from "@mui/material";

import GreenieCard from "../../components/Greenies/GreenieCard";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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
  let navigate = useNavigate();

  console.debug("GreenieDetails", "id=", id);

  const [greenie, setGreenie] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    await CcgcApi.deleteGreenie(id);
    navigate(`/rounds/${greenie.roundId}`);
  };

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgb(211, 47, 47)",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container className="py-5">
      <Typography variant="h1">Greenie Details</Typography>
      <Divider role="presentation" sx={{ mb: 5, width: "17%" }} />

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} align="center">
          <GreenieCard greenie={greenie} />
          <Box>
            {currentUser ? (
              <Box sx={{ my: 3 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={handleOpen}
                  sx={{ "&:hover": { color: "white" }, mr: 1 }}
                >
                  <HighlightOffIcon /> <span className="ms-2">Delete</span>
                </Button>
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
            ) : null}
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" color="white">
            Are you Sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="white">
            This action will permanently erase all data associated with this
            greenie. Please confirm to proceed.
          </Typography>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ mr: 2, bgcolor: "gray" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="dark"
              sx={{ color: "white" }}
              onClick={() => handleDelete(greenie.id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default GreenieDetails;
