// import logo from "../../assets/ccgc_logo_simple.png";
import logo from "../../assets/ccgc_logo_simple.png";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import trophyImage from "../../assets/trophy.webp";
import greenieImage from "../../assets/greenie.webp";

import { useState, useEffect } from "react";
import { Container, Box, Grid, Paper, Typography, Fade } from "@mui/material";

/** Homepage component
 *
 * welcome message and club logo
 *
 * This is routed to path "/"
 *
 * Router -> Homepage
 */

// set it up to make database call that grabs the "newest" tournament
// button to register for a tournament
// show who has registered to play in the tournament

const Homepage = () => {
  console.debug("Homepage");

  const [tournament, setTournament] = useState(null);

  const [showLogo, setShowLogo] = useState(true);

  useEffect(function getUpcomingTournamentOnMount() {
    console.debug("Homepage useEffect getUpcomingTournamentOnMount");

    async function getUpcomingTournament() {
      setTournament(await CcgcApi.getUpcomingTournament());
    }
    getUpcomingTournament();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!tournament) return <LoadingSpinner />;

  console.log(tournament);

  return (
    <Container sx={{ py: 5 }}>
      {showLogo ? (
        <Box
          sx={{
            animation: "fadeOut 5s",
            "@keyframes fadeOut": {
              "0%": {
                opacity: 1,
              },
              "100%": {
                opacity: 0,
              },
            },
          }}
        >
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <Box
              component="img"
              src={logo}
              sx={{
                width: { xs: "100%", md: "60%", xl: "70%" },
                borderRadius: "100%",
                boxShadow: "0 0 30px rgba(0,0,0,0.4)",
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            animation: "fadeIn 5s",
            "@keyframes fadeIn": {
              "100%": {
                opacity: 1,
              },
              "0%": {
                opacity: 0,
              },
            },
          }}
        >
          <Typography variant="h1" sx={{ mb: 5 }}>
            Contra Costa Golf Club
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper
                sx={{ borderRadius: "30px", bgcolor: "grey.200" }}
                elevation={5}
              >
                <Box
                  component="img"
                  src={tournament.courseImg}
                  sx={{
                    width: "100%",
                    height: "203.984px",
                    borderRadius: "30px",
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{ mb: 2, fontWeight: 500, fontFamily: "Fredoka One" }}
                  >
                    Upcoming Tournament
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="p">
                      Join us on{" "}
                      {new Date(tournament.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                      {" at "}
                      {tournament.courseName}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper
                sx={{ borderRadius: "30px", bgcolor: "grey.200" }}
                elevation={5}
              >
                <Box
                  component="img"
                  src={trophyImage}
                  sx={{
                    width: "100%",
                    height: "203.984px",
                    borderRadius: "30px",
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{ mb: 2, fontWeight: 500, fontFamily: "Fredoka One" }}
                  >
                    Current Standings
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="p">
                      All club members ranked by tournament points earned this
                      year
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <Paper
                sx={{ borderRadius: "30px", bgcolor: "grey.200" }}
                elevation={5}
              >
                <Box
                  component="img"
                  src={greenieImage}
                  sx={{
                    width: "100%",
                    height: "203.984px",
                    borderRadius: "30px",
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{ mb: 2, fontWeight: 500, fontFamily: "Fredoka One" }}
                  >
                    Closest Greenies
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="p">
                      The ten nearest to the pin shots on par threes this year
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Homepage;
