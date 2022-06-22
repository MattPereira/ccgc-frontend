import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import RoundTable from "../rounds/RoundTable";

/** Member details page.
 *
 * On component mount, load the member data from API
 * which includes all the rounds the member has played with CCGC
 *
 * This is routed to path "/members/:username"
 *
 * Routes -> MemberDetails -> { MemberRoundTable -> {HolesRow, DataRow} }
 *
 */

/// ADD LINKS TO GET TO INDIVIDUAL ROUND PAGE!!

const MemberDetails = () => {
  const { username } = useParams();

  console.debug("MemberDetails", "username=", username);
  const [member, setMember] = useState(null);

  /* On component mount, load member data from API */
  useEffect(
    function getMemberOnMount() {
      console.debug("MemberDetails useEffect getMemberOnMount");

      async function getMember() {
        setMember(await CcgcApi.getMember(username));
      }
      getMember();
    },
    [username]
  );

  if (!member) return <LoadingSpinner />;

  console.log(member);

  return (
    <div className="text-center row justify-content-center">
      <h1 className="display-3 mb-3">
        {member.firstName} {member.lastName}
      </h1>
      <hr
        className="mb-4"
        style={{ border: "2px solid grey", width: "20%" }}
      ></hr>
      <p className="lead mb-5">
        Scorecards for each round played with the Contra Costa Golf Club ordered
        by date.
      </p>
      <div className="col-md-10">
        {member.rounds ? (
          member.rounds.map((r) => (
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
            </div>
          ))
        ) : (
          <p>{member.firstName} has not submitted any rounds yet!</p>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;
