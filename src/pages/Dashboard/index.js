import { Grid, Typography, Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ paddingTop: "3rem", textAlign: "center" }}>
      <Typography variant="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h3">Tournaments</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3">Courses</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
