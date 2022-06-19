import React, { useState, useEffect } from "react";
import CcgcApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import NewTournamentForm from "./NewTournamentForm";

const NewTournament = () => {
  /** Fetch the courses data first to set formData state properly */
  const [courses, setCourses] = useState(null);

  // Grab all courses from API to make an array of course handles for select input
  /* On component mount, load courses from API */
  useEffect(function getCoursesOnMount() {
    console.debug("CourseList useEffect getCoursesOnMount");

    async function fetchAllCourses() {
      let courses = await CcgcApi.getCourses();
      setCourses(courses);
    }
    fetchAllCourses();
  }, []);

  if (!courses) return <LoadingSpinner />;

  const courseHandles = courses.map((c) => c.handle);

  return (
    <div>
      <NewTournamentForm courseHandles={courseHandles} />
    </div>
  );
};

export default NewTournament;
