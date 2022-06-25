import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";

import MemberList from "../members/MemberList";
import MemberDetails from "../members/MemberDetails";

import CourseList from "../courses/CourseList";
import CourseDetails from "../courses/CourseDetails";
import NewCourseForm from "../courses/forms/NewCourseForm";
import EditCourse from "../courses/forms/EditCourse";

import GreenieList from "../greenies/GreenieList";
import GreenieDetails from "../greenies/GreenieDetails";
import NewGreenie from "../greenies/forms/NewGreenie";
import UpdateGreenie from "../greenies/forms/UpdateGreenie";

import TournamentList from "../tournaments/TournamentList";
import TournamentDetails from "../tournaments/TournamentDetails";
import NewTournament from "../tournaments/forms/NewTournament";
import EditTournament from "../tournaments/forms/EditTournament";

import RoundDetails from "../rounds/RoundDetails";
import NewRound from "../rounds/forms/NewRound";
import EditRound from "../rounds/forms/EditRound";

import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ProfileForm from "../profiles/ProfileForm";
import Standings from "../standings/Standings";

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
      <Route exact path="/standings" element={<Standings />} />

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

      <Route exact path="/greenies" element={<GreenieList />} />
      <Route exact path="/greenies/:id" element={<GreenieDetails />} />
      <Route exact path="/greenies/:id/update" element={<UpdateGreenie />} />
      <Route exact path="/greenies/:date/new" element={<NewGreenie />} />

      {/* Redirect to homepage if route doesn't exist */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Router;
