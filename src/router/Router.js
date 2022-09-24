import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";

import MemberList from "../pages/Members/MemberList";
import MemberDetails from "../pages/Members/MemberDetails";
import ProfileForm from "../pages/Members/forms/ProfileForm";

import CourseList from "../pages/Courses/CourseList";
import CourseDetails from "../pages/Courses/CourseDetails";
import CourseForm from "../pages/Courses/forms/CourseForm";
import EditCourse from "../pages/Courses/forms/EditCourse";

import GreenieList from "../pages/Greenies/GreenieList";
import GreenieDetails from "../pages/Greenies/GreenieDetails";
import NewGreenie from "../pages/Greenies/forms/NewGreenie";
import UpdateGreenie from "../pages/Greenies/forms/UpdateGreenie";

import TournamentList from "../pages/Tournaments/TournamentList";
import TournamentDetails from "../pages/Tournaments/TournamentDetails";
import NewTournament from "../tournaments/forms/NewTournament";
import EditTournament from "../tournaments/forms/EditTournament";

import RoundDetails from "../pages/Rounds/RoundDetails";
import NewRound from "../rounds/forms/NewRound";
import EditRound from "../rounds/forms/EditRound";

import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

import Standings from "../pages/Standings";

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
      <Route exact path="/courses/new" element={<CourseForm />} />
      <Route exact path="/courses/:handle" element={<CourseDetails />} />
      <Route exact path="/courses/:handle/edit" element={<EditCourse />} />

      <Route exact path="/tournaments" element={<TournamentList />} />
      <Route exact path="/tournaments/new" element={<NewTournament />} />

      <Route exact path="/tournaments/:date" element={<TournamentDetails />} />
      <Route
        exact
        path="/tournaments/:date/update"
        element={<EditTournament />}
      />

      <Route exact path="/rounds/:id" element={<RoundDetails />} />
      <Route exact path="/rounds/new/:date" element={<NewRound />} />
      <Route exact path="/rounds/:id/edit" element={<EditRound />} />

      <Route exact path="/greenies" element={<GreenieList />} />
      <Route exact path="/greenies/new/:roundId" element={<NewGreenie />} />
      <Route exact path="/greenies/:id" element={<GreenieDetails />} />
      <Route exact path="/greenies/:id/update" element={<UpdateGreenie />} />

      {/* Redirect to homepage if route doesn't exist */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Router;