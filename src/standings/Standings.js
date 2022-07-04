import React, { useState, useEffect } from "react";
import HorizontalRule from "../common/HorizontalRule";
import CcgcApi from "../api/api";
import { Table } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import { Link } from "react-router-dom";
import "./Standings.css";

import PointsAccordion from "./PointsAccordion";
import CalculationsAccordion from "./CalculationsAccordion";

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

      <p className="lead text-center my-5">
        The Contra Costa Golf Club calculates member standings on the basis of
        total points accrued over the course of a tour year. After the final
        round of the season, the player with the most points is crowned the
        champion.
      </p>
      <div className="col-lg-8">
        <h2 className="text-center mb-3">2022 TOUR</h2>
        <Table
          responsive
          striped
          bordered
          variant="dark"
          className="text-center mb-5"
        >
          <thead>
            <tr>
              <th>RNK</th>
              <th>PLAYER</th>
              <th>PLY</th>
              <th>STR</th>
              <th>PTT</th>
              <th>GRN</th>
              <th className="d-none d-sm-table-cell">PAR</th>
              <th className="d-none d-sm-table-cell">BRD</th>
              <th className="d-none d-sm-table-cell">EGL</th>
              <th className="d-none d-sm-table-cell">ACE</th>
              <th>TOT</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, idx) => (
              <tr key={row.username}>
                <th>{idx + 1}</th>
                <th>
                  <Link
                    to={`/members/${row.username}`}
                    className="text-white text-decoration-none"
                  >
                    {row.firstName} {row.lastName[0]}
                  </Link>
                </th>
                <td>{row.participations}</td>
                <td>{row.strokes}</td>
                <td>{row.putts}</td>
                <td>{row.greenies}</td>
                <td className="d-none d-sm-table-cell">{row.pars}</td>
                <td className="d-none d-sm-table-cell">{row.birdies}</td>
                <td className="d-none d-sm-table-cell">{row.eagles}</td>
                <td className="d-none d-sm-table-cell">{row.aces}</td>
                <th>{row.total}</th>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="mb-5">
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
