import React, { useState, useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import TournamentCard from "./TournamentCard";

/**
 *
 * TournamentList component is parent component
 * that will render TournamentCard components
 * that serve as links to get to TournamentDetails component
 *
 * path => /tournaments
 *
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
    <div className="text-center">
      <h1 className="display-3 mb-3">Club Tournaments</h1>
      <p className="lead mb-5">
        Select a tournament to view the strokes and putts leaderboards for that
        tournament date.
      </p>
      <div className="col-md-6 offset-md-3">
        {tournaments.map((t) => (
          <TournamentCard
            key={t.date}
            date={t.date}
            courseHandle={t.courseHandle}
            courseName={t.courseName}
            seasonEndYEar={t.seasonEndYEar}
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentList;
