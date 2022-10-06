import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import { Link } from "react-router-dom";
import CalculationsAccordion from "../../components/Members/CalculationsAccordion";

import { Container, Row, Table } from "react-bootstrap";
import { Typography } from "@mui/material";

// import GreenieCardTable from "../components/Greenies/GreenieTable";

/** Member details page.
 *
 * On component mount, load the member data from API
 * which includes all the rounds the member has played with CCGC
 *
 * This is routed to path "/members/:username"
 *
 * Routes -> MemberDetails -> { RoundTable -> {HolesRow, DataRow} }
 *
 */

/// ADD LINKS TO GET TO INDIVIDUAL ROUND PAGE!!

const MemberDetails = () => {
  const { username } = useParams();

  console.debug("MemberDetails", "username=", username);
  const [member, setMember] = useState(null);
  const [rounds, setRounds] = useState(null);

  /* On component mount, load user and rounds data from API */
  useEffect(
    function getMemberOnMount() {
      console.debug("MemberDetails useEffect getMemberOnMount");

      async function fetchUser() {
        setMember(await CcgcApi.getUser(username));
      }
      fetchUser();

      //get all rounds played by a particular member
      async function fetchRoundsByUsername() {
        setRounds(await CcgcApi.getRoundsByUsername(username));
      }
      fetchRoundsByUsername();
    },
    [username]
  );

  if (!member) return <LoadingSpinner />;

  console.log("Member:", member);
  console.log("ROUNDS:", rounds);

  return (
    <Container className="py-5">
      <Row className="row justify-content-center">
        <h1 className="display-1 mb-3 text-center">
          {member.firstName} {member.lastName}
        </h1>

        <hr
          className="mb-5"
          style={{ border: "2px solid grey", width: "20%" }}
        ></hr>

        <div className="col-md-10 mb-3">
          {rounds ? (
            <div>
              <Table striped bordered responsive className="text-center">
                <thead>
                  <tr className="table-dark">
                    <th>TOURNEY</th>
                    <th>TOT</th>
                    <th>DIF</th>
                    <th>IDX</th>
                    <th>HCP</th>
                    <th>NET</th>
                    <th>PUT</th>
                  </tr>
                </thead>
                <tbody>
                  {rounds.map((r) => (
                    <tr key={r.id}>
                      <th>
                        <Link
                          to={`/rounds/${r.id}`}
                          className="text-decoration-none"
                        >
                          {new Date(r.tournamentDate).toLocaleDateString(
                            "en-US",
                            { month: "short", year: "numeric" }
                          )}
                        </Link>
                      </th>
                      <td>{r.totalStrokes}</td>
                      <td>{r.scoreDifferential}</td>
                      <td>{r.playerIndex}</td>
                      <td>{r.courseHandicap}</td>
                      <td>{r.netStrokes}</td>
                      <td>{r.totalPutts}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="my-5">
                <Typography align="center" variant="h3" gutterBottom>
                  Calculations
                </Typography>
                <CalculationsAccordion />
              </div>
            </div>
          ) : (
            <p>{member.firstName} has not submitted any rounds yet!</p>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default MemberDetails;
