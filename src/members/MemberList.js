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

  return (
    <div className="text-center">
      <h1 className="display-3 mb-3">Club Members</h1>
      <p className="lead mb-5">
        Select a member to view all of their rounds played with the Contra Costa
        Golf Club
      </p>
      <div className=" col-md-6 offset-md-3">
        {members.length ? (
          <div className="CompanyList-list">
            {members.map((m) => (
              <MemberCard
                key={m.username}
                username={m.username}
                firstName={m.firstName}
                lastName={m.lastName}
                email={m.email}
                bio={m.bio}
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
