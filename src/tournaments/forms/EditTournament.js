import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import { useParams } from "react-router-dom";
import TournamentForm from "./TournamentForm";
import LoadingSpinner from "../../common/Loading";

/** This component is used to fetch tournament data to pass to <EditTournamentForm/>
 *  in order to populate the form with the course's current data.
 *
 * Routed as /tournaments/:date/edit
 * Routes -> EditTournament -> EditTournamentForm
 */

const EditTournament = () => {
  const { date } = useParams();

  /** Fetch the courses and tournament data first to set formData state properly */
  const [courses, setCourses] = useState(null);
  const [tournament, setTournament] = useState(null);

  /* On component mount, load tournament and courses from API to populate form data */
  useEffect(
    function getFormDataOnMount() {
      console.debug("EditTournament useEffect getFormDataOnMount");

      async function getTournament() {
        setTournament(await CcgcApi.getTournament(date));
      }

      async function fetchAllCourses() {
        let courses = await CcgcApi.getCourses();
        setCourses(courses);
      }
      fetchAllCourses();
      getTournament();
    },
    [date]
  );

  console.debug("EditTournament", "tournament=", tournament);

  if (!tournament || !courses) return <LoadingSpinner />;

  console.log(tournament);

  const courseHandles = courses.map((c) => c.handle);

  return (
    <div>
      <TournamentForm tournament={tournament} courseHandles={courseHandles} />
    </div>
  );
};

export default EditTournament;
