import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

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
    <div className="col-md-8 offset-md-2">
      <h1 className="display-3">List All Members</h1>
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
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
};

export default MemberList;
