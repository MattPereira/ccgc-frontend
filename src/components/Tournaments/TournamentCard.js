import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

/** Tournament card component.
 *
 * Show tournament tourYear, date, course name, and course image.
 * TournamentCard also functions as link to each tournament's detail page.
 *
 * TournamentCard is rendered by TournamentList to show a "card" for each tournament.
 *
 * TournamentList -> TournamentCard
 *
 */

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "30px",
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "#eeeeee",
    color: "black",
  },
}));

const StyledCardImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "203.984px",
  borderRadius: "30px",
  objectFit: "cover",
}));

const TournamentCard = ({ date, courseName, imgUrl }) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Link to={`/tournaments/${date}`} style={{ textDecoration: "none" }}>
        <StyledPaper elevation={8}>
          <StyledCardImage component="img" src={imgUrl} />
          <Box
            sx={{
              py: 2,
            }}
          >
            <Typography variant="h4">
              {" "}
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </Typography>
          </Box>
        </StyledPaper>
      </Link>
    </Box>
  );
};

export default TournamentCard;
