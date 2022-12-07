import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";

import MemberList from "../pages/Members/MemberList";
import MemberDetails from "../pages/Members/MemberDetails";
import ProfileForm from "../components/Members/forms/ProfileForm";

import CourseList from "../pages/Courses/CourseList";
import CourseDetails from "../pages/Courses/CourseDetails";
import NewCourseForm from "../components/Courses/forms/CourseForm";
import EditCourse from "../components/Courses/forms/EditCourse";

import GreenieList from "../pages/Greenies/GreenieList";
import GreenieDetails from "../pages/Greenies/GreenieDetails";
import NewGreenie from "../components/Greenies/forms/NewGreenie";
import UpdateGreenie from "../components/Greenies/forms/UpdateGreenie";

import TournamentList from "../pages/Tournaments/TournamentList";
import TournamentDetails from "../pages/Tournaments/TournamentDetails";
import NewTournament from "../components/Tournaments/forms/NewTournament";
import EditTournament from "../components/Tournaments/forms/EditTournament";

import RoundDetails from "../pages/Rounds/RoundDetails";
import NewRound from "../components/Rounds/forms/NewRound";
import EditRound from "../components/Rounds/forms/EditRound";

import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

import Standings from "../pages/Standings/StandingsDetails";
import Dashboard from "../pages/Dashboard";

/** Site-wide routes.
 *
 * Accessing some Routes requires a user to be logged in.
 * Those routes are wrapped by <PrivateRoute>, which functions
 * as an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Router({ login, register, logout }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`
  );

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      <Route exact path="/login" element={<LoginForm login={login} />} />
      <Route
        exact
        path="/register"
        element={<RegisterForm register={register} />}
      />

      <Route exact path="/dashboard" element={<Dashboard />} />

      <Route exact path="/profile" element={<ProfileForm />} />

      <Route exact path="/standings" element={<Standings />} />

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
        path="/tournaments/:date/update"
        element={<EditTournament />}
      />

      <Route exact path="/rounds/:id" element={<RoundDetails />} />
      <Route exact path="/rounds/new/:date" element={<NewRound />} />
      <Route exact path="/rounds/:id/edit" element={<EditRound />} />

      <Route exact path="/greenies" element={<GreenieList />} />
      <Route exact path="/greenies/new/:date" element={<NewGreenie />} />
      <Route exact path="/greenies/:id" element={<GreenieDetails />} />
      <Route exact path="/greenies/:id/update" element={<UpdateGreenie />} />

      {/* Redirect to homepage if route doesn't exist */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Router;
