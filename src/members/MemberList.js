import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with all members listed
 *
 * On component mount, load members from API
 *
 * This is routed to path "/members"
 *
 * Routes -> { MemberCard }
 */

const MemberList = () => {
  console.debug("MemberList");

  const [members, setMembers] = useState(null);

  /* On component mount, load companies from API */
  useEffect(function getCompaniesOnMount() {
    console.debug("MemberList useEffect getMembersOnMount");

    async function fetchAllMembers() {
      let members = await CcgcApi.getMembers();
      setMembers(members);
    }
    fetchAllMembers();
  }, []);

  if (!members) return <LoadingSpinner />;
  console.log(members);

  return (
    <div className="text-center row justify-content-center">
      <h1 className="display-3 mb-3">Members</h1>
      <hr
        className="mb-4"
        style={{ border: "2px solid grey", width: "20%" }}
      ></hr>
      <p className="lead mb-5">
        Select a member to view all of their rounds played with the Contra Costa
        Golf Club
      </p>
      <div className="col-sm-10 col-md-7 col-lg-5">
        {members.length ? (
          <div className="MemberCard-list">
            {members.map((m) => (
              <MemberCard
                key={m.username}
                username={m.username}
                firstName={m.firstName}
                lastName={m.lastName}
                avgPutts={m.avgPutts}
                avgStrokes={m.avgStrokes}
                avgGreenies={m.avgGreenies}
              />
            ))}
          </div>
        ) : (
          <p>Sorry, no results were found!</p>
        )}
      </div>
    </div>
  );
};

export default MemberList;
