import { Paper, Typography, Box } from "@mui/material";

export default function PageHero({ title, backgroundImage }) {
  return (
    <Box sx={{ p: 1 }}>
      <Paper
        sx={{
          height: { xs: "200px", sm: "275px" },
          borderRadius: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage}) center / cover no-repeat`,
          padding: "0.5rem",
        }}
      >
        <Typography variant="h1" sx={{ color: "white", fontSize: "2.5rem" }}>
          {title}
        </Typography>
      </Paper>
    </Box>
  );
}
