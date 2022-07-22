import React, { useState, useEffect } from "react";
import HorizontalRule from "../common/HorizontalRule";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import "./Standings.css";

import PointsAccordion from "./PointsAccordion";
import CalculationsAccordion from "./CalculationsAccordion";
import StandingsTable from "./StandingsTable";

/** Show club standings page
 *
 * Display club standings table
 *
 * Display tour points tables
 *
 * Display club handicap computation info
 *
 * Router -> Standings
 */

const Standings = () => {
  console.debug("Standings");
  const [standings, setStandings] = useState(null);

  /* On component mount, load club standings from API */
  useEffect(function getStandingsOnMount() {
    console.debug("Standings useEffect getStandingsOnMount");

    async function getStandings() {
      setStandings(await CcgcApi.getStandings());
    }
    getStandings();
  }, []);

  if (!standings) return <LoadingSpinner />;
  console.log(standings);

  return (
    <div className="row justify-content-center">
      <h1 className="display-3 text-center">Standings</h1>
      <HorizontalRule width="20%" />

      <p className="lead text-center mb-5 mt-4">
        Aggregate points per player for the 2021-22 season.
      </p>
      <div className="col-lg-8">
        <StandingsTable data={standings} />
        <div className="my-5">
          <h3 className="text-center mb-3">TOURNAMENT POINTS</h3>
          <PointsAccordion />
        </div>

        <div>
          <h3 className="text-center mb-3">CALCULATIONS</h3>
          <CalculationsAccordion />
        </div>
      </div>
    </div>
  );
};

export default Standings;
