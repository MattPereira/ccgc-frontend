import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CcgcApi from "../../../api/api";
import LoadingSpinner from "../../Common/Loading";
import RoundForm from "./RoundForm";

const NewRound = () => {
  /** Fetch the members data first to set the select "player" input */
  const { date } = useParams();

  const [members, setMembers] = useState(null);
  const [rounds, setRounds] = useState(null);

  // Grab all courses from API to make an array of course handles for select input
  useEffect(
    function getMembersOnMount() {
      console.debug("NewRound useEffect getMembersOnMount");

      async function fetchAllMembers() {
        let members = await CcgcApi.getMembers();
        setMembers(members);
      }

      async function fetchTournament() {
        let rounds = await CcgcApi.getRoundsByDate(date);
        setRounds(rounds);
      }
      fetchTournament();
      fetchAllMembers();
    },
    [date]
  );

  console.log("MEMBERS", members);

  if (!members) return <LoadingSpinner />;

  console.log(rounds);

  //Filter out users who have already submitted a round for this tournament
  //So they arent added to form select input as an option
  const usernames = members.map((m) => m.username);
  const alreadySubmitted = rounds.map((r) => r.username);
  const availableUsernames = usernames.filter(
    (u) => !alreadySubmitted.includes(u)
  );

  return (
    <div>
      <RoundForm availableUsernames={availableUsernames} />
    </div>
  );
};

export default NewRound;
