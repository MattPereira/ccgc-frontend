import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";
import "./TournamentCard.scss";

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

const TournamentCard = ({ date, courseName, imgUrl }) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Link to={`/tournaments/${date}`} style={{ textDecoration: "none" }}>
        <Paper elevation={8}>
          <div className="TournamentCard-crop">
            <img alt={`${courseName}`} src={imgUrl} />
          </div>
          <Box
            sx={{
              py: 1.5,
              borderRadius: "0 0 4px 4px",
              backgroundColor: "rgb(33,37,41)",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Itim", color: "white" }}
            >
              {" "}
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </Typography>
          </Box>
        </Paper>
      </Link>
    </Box>
  );
};

export default TournamentCard;
