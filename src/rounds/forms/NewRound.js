import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../common/LoadingSpinner";
import NewRoundForm from "./NewRoundForm";

const NewRound = () => {
  /** Fetch the courses data first to set formData state properly */
  const [members, setMembers] = useState(null);

  // Grab all courses from API to make an array of course handles for select input
  /* On component mount, load courses from API */
  useEffect(function getMembersOnMount() {
    console.debug("NewRound useEffect getMembersOnMount");

    async function fetchAllMembers() {
      let members = await CcgcApi.getMembers();
      setMembers(members);
    }
    fetchAllMembers();
  }, []);

  if (!members) return <LoadingSpinner />;

  //CAN I SOMEHOW MANIPULATE THE usernamesArr to remove users who already have rounds for
  //this tournament using the {date} parameter in the URL?

  const usernamesArr = members.map((m) => m.username);

  return (
    <div>
      <NewRoundForm usernames={usernamesArr} />
    </div>
  );
};

export default NewRound;
