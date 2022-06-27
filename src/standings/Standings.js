import React from "react";
import HorizontalRule from "../common/HorizontalRule";

import { Table } from "react-bootstrap";

/** Show club standings page
 *
 * Display club standings table
 *
 * Display points tables
 *
 * Display club handicap computation info
 *
 * Router -> Standings
 */

const Standings = () => {
  return (
    <div className="row justify-content-center text-center">
      <h1 className="display-3 text-center">Club Standings</h1>
      <HorizontalRule width="20%" />

      <p className="lead text-center mb-5">
        The Contra Costa Golf Club calculates member standings on the basis of
        total points accrued over the course of a tour year. After the final
        round of the season, the player with the most points is crowned the
        champion.
      </p>

      <h3 className="text-center mb-3">Tour Points</h3>

      <div className="row mb-4">
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
                <td>Participation</td>
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
                <td>Par 3 in regulation</td>
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

      <h3 className="text-center">Club Handicaps</h3>
      <Table bordered variant="dark" striped>
        <thead>
          <tr>
            <td>Name</td>
            <td>Calculation</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Strokes</td>
            <td>Hole1 + Hole2 + ... + Hole18</td>
            <td>Sum of the strokes for all 18 holes</td>
          </tr>
          <tr>
            <td>Score Differential</td>
            <td>(113/Slope) * (Total Strokes - Rating)</td>
            <td>
              measures the performance of a round in relation to the relative
              difficulty of the course that was played
            </td>
          </tr>
          <tr>
            <td>Handicap Index</td>
            <td>
              Average of lowest 2 Score Differentials of last 4 club rounds
            </td>
            <td>
              each golfer's playing ability on a 113 Slope golf course, a course
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
