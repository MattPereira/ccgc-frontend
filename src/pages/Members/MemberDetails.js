import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import RoundTable from "../../components/Rounds/RoundTable";
import GreenieCardList from "../../components/Greenies/GreenieCardList";
import { Container, Row } from "react-bootstrap";

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

      async function getUser() {
        setMember(await CcgcApi.getUser(username));
      }
      getUser();

      //get all rounds played by a particular member
      async function getRounds() {
        setRounds(await CcgcApi.getRounds(username));
      }
      getRounds();
    },
    [username]
  );

  if (!member) return <LoadingSpinner />;

  console.log("Member:", member);
  console.log("Rounds:", rounds);

  return (
    <Container className="py-5">
      <Row className="text-center row justify-content-center">
        <h1 className="display-1 mb-3">
          {member.firstName} {member.lastName}
        </h1>

        <hr style={{ border: "2px solid grey", width: "20%" }}></hr>
        <p className="fs-6 text-muted">{member.email}</p>

        <p className="lead mb-5 mt-4">
          Scorecards and greenies for every round.
        </p>
        <div className="col-md-10 mb-3">
          {rounds ? (
            rounds.map((r) => (
              <div key={r.id} className="mb-5">
                <RoundTable
                  roundId={r.id}
                  courseName={r.courseName}
                  tournamentDate={r.tournamentDate}
                  strokes={r.strokes}
                  putts={r.putts}
                  totalStrokes={r.totalStrokes}
                  playerIndex={r.playerIndex}
                  netStrokes={r.netStrokes}
                  totalPutts={r.totalPutts}
                  pars={r.pars}
                />

                <GreenieCardList greenies={r.greenies} />
              </div>
            ))
          ) : (
            <p>{member.firstName} has not submitted any rounds yet!</p>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default MemberDetails;
