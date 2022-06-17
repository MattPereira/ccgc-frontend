import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import { Table } from "reactstrap";

import HolesRow from "../common/HolesRow";
import DataRow from "../common/DataRow";

import { v4 as uuidv4 } from "uuid";

/** Member details page.
 *
 * On component mount, load the member data from API
 * which includes all the rounds the member has played with CCGC
 *
 * This is routed to path "/members/:username"
 *
 * Routes -> MemberDetails -> { MemberRoundCard -> {HolesRow, StrokesRow, PuttsRow} }
 *
 */

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
    <div className="text-center">
      <h1 className="display-3 mb-3">
        {member.firstName} {member.lastName}
      </h1>
      <p className="lead mb-5">
        Scorecards for each round played with the Contra Costa Golf Club ordered
        by date.
      </p>
      <div className="col-md-10 offset-md-1">
        {member.rounds.map((r) => (
          <div key={r.id} className="mb-5">
            <h5 className="display-6 mb-0">{r.courseName}</h5>
            <p className="lead mb-1">{r.tournamentDate.split("T")[0]}</p>
            <Table responsive bordered key={r.id}>
              <thead>
                <HolesRow extended />
              </thead>
              <tbody>
                <DataRow
                  key={uuidv4()}
                  rowColor="bg-white"
                  rowHeader="STROKES"
                  holeValues={r.strokes}
                  calculations={{
                    total: r.totalStrokes,
                    handicap: r.courseHandicap,
                    net: r.netStrokes,
                  }}
                />

                <DataRow
                  key={uuidv4()}
                  rowHeader="PUTTS"
                  rowColor="bg-white"
                  holeValues={r.putts}
                  calculations={{
                    total: r.totalPutts,
                    handicap: "--",
                    net: "--",
                  }}
                />
                <DataRow
                  rowColor="table-dark"
                  rowHeader="PAR"
                  holeValues={r.pars}
                  calculations={{ handicap: "--", net: "--" }}
                />
              </tbody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberDetails;
