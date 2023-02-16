import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import TournamentCard from "../../components/Tournaments/TournamentCard";
import PageHero from "../../components/Common/PageHero/PageHero";
import tournamentsImage from "../../assets/tournaments.jpg";

import { Container, Col } from "react-bootstrap";
import { Box } from "@mui/material";

/** Show page with all tournaments listed
 *
 * On component mount, load tournaments from API
 *
 * TournamentList component is parent component
 * that will render TournamentCard components
 * that serve as links to get to the TournamentDetails component
 *
 * This is routed to path "/tournaments"
 *
 * Router -> TournamentList -> TournamentCard
 */

export default function TournamentList() {
  console.debug("TournamentList");

  const [tournaments, setTournaments] = useState(null);

  /* On component mount, load tournaments from API */
  useEffect(function getTournamentsOnMount() {
    console.debug("TournamentList useEffect getTournamentsOnMount");

    async function fetchAllTournaments() {
      let tournaments = await CcgcApi.getTournaments();
      setTournaments(tournaments);
    }
    fetchAllTournaments();
  }, []);

  if (!tournaments) return <LoadingSpinner />;

  return (
    <Box>
      <PageHero title="Tournaments" backgroundImage={tournamentsImage} />
      <Container className="py-5">
        <div className="text-center row justify-content-center">
          {tournaments.map((t) => (
            <Col md={12} lg={6} xl={6} key={t.date}>
              <TournamentCard
                key={t.date}
                date={t.date}
                courseHandle={t.courseHandle}
                courseName={t.courseName}
                tourYears={t.tourYears}
                imgUrl={t.imgUrl}
              />
            </Col>
          ))}
        </div>
      </Container>
    </Box>
  );
}