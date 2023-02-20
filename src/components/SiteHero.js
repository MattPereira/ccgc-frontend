import { Box, Paper, Typography } from "@mui/material";

export default function SiteHero() {
  return (
    <Box sx={{ p: 1.5 }}>
      <Paper
        sx={{
          height: { xs: "150px", sm: "275px" },
          borderRadius: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          padding: "0.5rem",
        }}
      >
        <Typography
          variant="h1"
          sx={{ color: "white", fontSize: "2.5rem", mb: 0 }}
        >
          Contra Costa Golf Club
        </Typography>
      </Paper>
    </Box>
  );
}
