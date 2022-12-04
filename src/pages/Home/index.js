// import logo from "../../assets/ccgc_logo_simple.png";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import standingsImage from "../../assets/trophy.webp";
import greenieImage from "../../assets/greenie.webp";
import membersImage from "../../assets/members.jpg";
import coursesImage from "../../assets/courses.jpg";
import tournamentsImage from "../../assets/tournaments.jpg";
import { styled } from "@mui/material/styles";

import { useState, useEffect } from "react";
import { Container, Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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

  useEffect(function getUpcomingTournamentOnMount() {
    console.debug("Homepage useEffect getUpcomingTournamentOnMount");

    async function getUpcomingTournament() {
      setTournament(await CcgcApi.getUpcomingTournament());
    }
    getUpcomingTournament();
  }, []);

  if (!tournament) return <LoadingSpinner />;

  console.log(tournament);

  const StyledFadeInBox = styled(Box)({
    animation: "fadeIn 3s",
    "@keyframes fadeIn": {
      "100%": {
        opacity: 1,
      },
      "0%": {
        opacity: 0,
      },
    },
  });

  const tournamentDate = new Date(tournament.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const content = [
    {
      title: "Current Events",
      cards: [
        {
          path: `tournaments/${tournament.date}`,
          image: tournament.courseImg,
          title: "Upcoming Tournament",
          description: `Join us on ${tournamentDate} at ${tournament.courseName}!`,
        },
        {
          path: "standings",
          image: standingsImage,
          title: "Current Standings",
          description:
            "All club members ranked by tournament points earned for the year",
        },
        {
          path: "greenies",
          image: greenieImage,
          title: "Closest Greenies",
          description:
            "The ten nearest to the pin shots on par three holes for the year",
        },
      ],
    },
    {
      title: "Club Resources",
      cards: [
        {
          path: "members",
          image: membersImage,
          title: "Members Data",
          description: "Detailed statistics for each club members performance",
        },
        {
          path: "tournaments",
          image: tournamentsImage,
          title: "Past Tournaments",
          description:
            "Historical records of all past contra costa golf club tournaments",
        },
        {
          path: "courses",
          image: coursesImage,
          title: "Golf Courses",
          description:
            "All golf courses in the contra costa golf club database",
        },
      ],
    },
  ];

  const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: "30px",
    backgroundColor: "#eeeeee",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  }));

  const StyledCardImage = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "203.984px",
    borderRadius: "30px",
    objectFit: "cover",
  }));

  const StyledCardTitle = styled(Typography)(({ theme }) => ({
    marginBottom: "1rem",
  }));

  return (
    <Container sx={{ py: 5 }}>
      <StyledFadeInBox>
        <Box sx={{ mb: 10 }}>
          <Typography variant="h1" sx={{ mb: 10, mt: 5 }}>
            Contra Costa Golf Club
          </Typography>
        </Box>

        {content.map((section) => (
          <Box sx={{ mb: 10 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              {section.title}
            </Typography>
            <Grid container spacing={3}>
              {section.cards.map((card) => (
                <Grid item xs={12} md={6} lg={4} key={card.title}>
                  <Link to={card.path} style={{ textDecoration: "none" }}>
                    <StyledPaper elevation={5}>
                      <StyledCardImage component="img" src={card.image} />
                      <Box sx={{ p: 3 }}>
                        <StyledCardTitle variant="h5">
                          {card.title}
                        </StyledCardTitle>
                        <Typography variant="p">{card.description}</Typography>
                      </Box>
                    </StyledPaper>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </StyledFadeInBox>
    </Container>
  );
};

export default Homepage;
