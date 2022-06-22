import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import EditRoundForm from "./EditRoundForm";

/** Edit Round component
 *
 * fetch round details from API
 *
 * pass data to EditRoundForm component
 * to populate form fields with existing data
 *
 *
 */

const EditRound = () => {
  const { id } = useParams();

  /** Fetch the round data first to prepopulate formData  */
  const [round, setRound] = useState(null);

  /* On component mount, load tournament and courses from API to populate form data */
  useEffect(
    function getRoundDataOnMount() {
      console.debug("EditRound useEffect getRoundDataOnMount");

      async function fetchRound() {
        setRound(await CcgcApi.getRound(id));
      }

      fetchRound();
    },
    [id]
  );

  console.debug("EditRound", "round=", round);

  if (!round) return <LoadingSpinner />;

  return (
    <div>
      <EditRoundForm round={round} />
    </div>
  );
};

export default EditRound;
