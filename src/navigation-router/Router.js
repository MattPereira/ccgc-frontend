import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";

import MemberList from "../members/MemberList";
import MemberDetails from "../members/MemberDetails";

import CourseList from "../courses/CourseList";
import CourseDetails from "../courses/CourseDetails";
import NewCourseForm from "../courses/NewCourseForm";
import EditCourse from "../courses/EditCourse";

import TournamentList from "../tournaments/TournamentList";
import TournamentDetails from "../tournaments/TournamentDetails";
import NewTournament from "../tournaments/NewTournament";
import EditTournament from "../tournaments/EditTournament";

import RoundDetails from "../rounds/RoundDetails";
import NewRound from "../rounds/NewRound";
import EditRound from "../rounds/EditRound";

import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ProfileForm from "../profiles/ProfileForm";
import Information from "../homepage/Information";

/** Site-wide routes.
 *
 * Accessing some Routes requires a user to be logged in.
 * Those routes are wrapped by <PrivateRoute>, which functions
 * as an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Router({ login, register }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`
  );

  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/information" element={<Information />} />

      <Route exact path="/login" element={<LoginForm login={login} />} />
      <Route
        exact
        path="/register"
        element={<RegisterForm register={register} />}
      />
      <Route exact path="/profile" element={<ProfileForm />} />

      <Route exact path="/members" element={<MemberList />} />
      <Route exact path="/members/:username" element={<MemberDetails />} />

      <Route exact path="/courses" element={<CourseList />} />
      <Route exact path="/courses/new" element={<NewCourseForm />} />
      <Route exact path="/courses/:handle" element={<CourseDetails />} />
      <Route exact path="/courses/:handle/edit" element={<EditCourse />} />

      <Route exact path="/tournaments" element={<TournamentList />} />
      <Route exact path="/tournaments/new" element={<NewTournament />} />
      <Route exact path="/tournaments/:date" element={<TournamentDetails />} />
      <Route
        exact
        path="/tournaments/:date/edit"
        element={<EditTournament />}
      />

      <Route exact path="/rounds/:id" element={<RoundDetails />} />
      <Route exact path="/rounds/:date/new" element={<NewRound />} />
      <Route exact path="/rounds/:id/edit" element={<EditRound />} />

      {/* Redirect to homepage if route doesn't exist */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Router;
