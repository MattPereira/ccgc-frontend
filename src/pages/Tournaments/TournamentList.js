import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";
import TournamentCard from "../../components/Tournaments/TournamentCard";

import { Container, Col } from "react-bootstrap";

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

const TournamentList = () => {
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
    <Container className="py-5">
      <div className="text-center row justify-content-center">
        <h1 className="display-1 mb-3">Tournaments</h1>
        <hr
          style={{
            border: "2px solid grey",
            width: "20%",
            marginBottom: "1rem",
          }}
        ></hr>

        <p className="lead py-5">
          Select a tournament date to view the leaderboards.
        </p>

        <Col md={10} lg={8} xl={7}>
          {tournaments.map((t) => (
            <TournamentCard
              key={t.date}
              date={t.date}
              courseHandle={t.courseHandle}
              courseName={t.courseName}
              tourYears={t.tourYears}
              imgUrl={t.imgUrl}
            />
          ))}
        </Col>
      </div>
    </Container>
  );
};

export default TournamentList;
