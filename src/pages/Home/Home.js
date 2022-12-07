import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import standingsImage from "../../assets/tour-standings.webp";
import greenieImage from "../../assets/greenie.webp";
import membersImage from "../../assets/members.webp";
import coursesImage from "../../assets/courses.jpg";
import tournamentsImage from "../../assets/tournaments.jpg";
import { styled } from "@mui/material/styles";

import Footer from "../../components/Common/Footer";

import { useState, useEffect } from "react";
import { Container, Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import homeHeroImage from "../../assets/home-hero.jpg";

/** Homepage component { path :"/" }
 *
 * displays cards for "current events" and "club resources"
 *
 * displays footer at bottom of page
 *
 * Router -> Homepage
 */

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
          title: "Next Tournament",
          description: `Join us on ${tournamentDate} at ${tournament.courseName}!`,
        },
        {
          path: "standings",
          image: standingsImage,
          title: "Tour Standings",
          description: "All club members ranked by points earned this season",
        },
        {
          path: "greenies",
          image: greenieImage,
          title: "Closest Greenies",
          description:
            "Top 10 shots that landed nearest to the pin on par threes",
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
          description: "Statistics including handicaps and performace metrics",
        },
        {
          path: "tournaments",
          image: tournamentsImage,
          title: "Past Tournaments",
          description:
            "See the scorecards, greenies, and points for completed tournaments",
        },
        {
          path: "courses",
          image: coursesImage,
          title: "Golf Courses",
          description:
            "The pars, slopes, and ratings for all courses played by our club",
        },
      ],
    },
  ];

  const StyledFadeInBox = styled(Box)({
    animation: "fadeIn 3s",
    padding: "0.75rem",
    height: "100%",
    "@keyframes fadeIn": {
      "100%": {
        opacity: 1,
      },
      "0%": {
        opacity: 0,
      },
    },
  });

  const StyledHeroPaper = styled(Paper)({
    height: "275px",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeHeroImage}) bottom / cover no-repeat`,
  });

  const StyledCardPaper = styled(Paper)(({ theme }) => ({
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
    <StyledFadeInBox>
      <Grid
        container
        flexDirection="column"
        justifyContent="space-between"
        sx={{ height: "100%", flexWrap: "nowrap" }}
      >
        <Grid item>
          <StyledHeroPaper elevation={8}>
            <Typography variant="h1" sx={{ color: "white" }}>
              Contra Costa Golf Club
            </Typography>
          </StyledHeroPaper>
          <Container maxWidth="xl" disableGutters sx={{ p: { xs: 0, lg: 4 } }}>
            {content.map((section) => (
              <Box sx={{ my: 7 }} key={section.title}>
                <Typography variant="h2" sx={{ mb: 2, ml: 3 }}>
                  {section.title}
                </Typography>
                <Grid container spacing={3}>
                  {section.cards.map((card) => (
                    <Grid item xs={12} md={6} lg={4} key={card.title}>
                      <Link to={card.path} style={{ textDecoration: "none" }}>
                        <StyledCardPaper elevation={5}>
                          <StyledCardImage component="img" src={card.image} />
                          <Box sx={{ p: 3 }}>
                            <StyledCardTitle variant="h5">
                              {card.title}
                            </StyledCardTitle>
                            <Typography variant="p">
                              {card.description}
                            </Typography>
                          </Box>
                        </StyledCardPaper>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Container>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </StyledFadeInBox>
  );
};

export default Homepage;
