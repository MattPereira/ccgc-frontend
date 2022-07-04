import React, { useState, useEffect } from "react";
import HorizontalRule from "../common/HorizontalRule";
import CcgcApi from "../api/api";
import { Table } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import { Link } from "react-router-dom";
import "./Standings.css";

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
      <h1 className="display-3 text-center">Club Standings</h1>
      <HorizontalRule width="20%" />

      <p className="lead text-center my-5">
        The Contra Costa Golf Club calculates member standings on the basis of
        total points accrued over the course of a tour year. After the final
        round of the season, the player with the most points is crowned the
        champion.
      </p>

      <h2 className="text-center mb-3">2021-22 TOUR</h2>
      <Table responsive striped bordered variant="dark" className="text-center">
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
                <Link to={`/members/${row.username}`} className="text-white">
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
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="text-center mb-3 mt-5">TOURNAMENT POINTS</h3>

      <div className="row mb-5 text-center">
        <div className="col-md-6 col-lg-3">
          <Table bordered striped variant="dark">
            <thead>
              <tr>
                <th colSpan="2" className="text-center">
                  Strokes
                </th>
              </tr>
              <tr>
                <th>Position</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st</td>
                <td>25</td>
              </tr>
              <tr>
                <td>2nd</td>
                <td>20</td>
              </tr>
              <tr>
                <td>3rd</td>
                <td>15</td>
              </tr>
              <tr>
                <td>4th</td>
                <td>10</td>
              </tr>
              <tr>
                <td>5th</td>
                <td>5</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-md-6 col-lg-3">
          <Table bordered variant="dark" striped>
            <thead>
              <tr>
                <th colSpan="2" className="text-center">
                  Putts
                </th>
              </tr>
              <tr>
                <th>Position</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st</td>
                <td>6</td>
              </tr>
              <tr>
                <td>2nd</td>
                <td>4</td>
              </tr>
              <tr>
                <td>3rd</td>
                <td>2</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-md-6 col-lg-3">
          <Table bordered variant="dark" striped>
            <thead>
              <tr>
                <th colSpan="2" className="text-center">
                  Events
                </th>
              </tr>
              <tr>
                <th>Event</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Play</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Par</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Birdie</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Eagle</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Hole-In-One</td>
                <td>10</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-md-6 col-lg-3">
          <Table bordered variant="dark" striped>
            <thead>
              <tr>
                <th colSpan="2" className="text-center">
                  Greenies
                </th>
              </tr>
              <tr>
                <th>Event</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Greenie</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Inside 20'</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Inside 10'</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Inside 2'</td>
                <td>3</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <h3 className="text-center">HANDICAPS</h3>
      <Table bordered variant="dark" responsive striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Calculation</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="Handicaps">
          <tr>
            <td>Total Strokes</td>
            <td>Hole1 + Hole2 + ... + Hole18</td>
            <td>Sum of the strokes for all 18 holes.</td>
          </tr>
          <tr>
            <td>Score Differential</td>
            <td>(113/Slope) * (Total Strokes - Rating)</td>
            <td>
              Measures the performance of a round in relation to the relative
              difficulty of the course that was played.
            </td>
          </tr>
          <tr>
            <td>Handicap Index</td>
            <td>AVG of lowest 2 score diffs of last 4 rounds</td>
            <td>
              Each golfer's playing ability on a 113 Slope golf course, a course
              of standard difficulty.
            </td>
          </tr>
          <tr>
            <td>Course Handicap</td>
            <td>(Handicap Index * Slope) / 113</td>
            <td>
              The number of strokes needed to play to par of the tees being
              played.
            </td>
          </tr>

          <tr>
            <td>Net Strokes</td>
            <td>Total Strokes - Course Handicap</td>
            <td>
              Net strokes is used to determine the finishing order for players
              in each tournament
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Standings;
