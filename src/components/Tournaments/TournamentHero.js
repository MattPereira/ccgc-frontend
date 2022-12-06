import { Paper, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function TournamentHero({ date, courseImg }) {
  return (
    <Box sx={{ p: 1 }}>
      <Link to={`/tournaments/${date}`} style={{ textDecoration: "none" }}>
        <Paper
          sx={{
            height: { xs: "200px", sm: "275px" },
            borderRadius: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${courseImg}) center / cover no-repeat`,
            padding: "0.5rem",
          }}
        >
          <Typography variant="h1" sx={{ color: "white", fontSize: "2.5rem" }}>
            {date}
          </Typography>
        </Paper>
      </Link>
    </Box>
  );
}
