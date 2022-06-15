import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CourseList from "../courses/CourseList";
import TournamentList from "../tournaments/TournamentList";
import TournamentDetails from "../tournaments/TournamentDetails";
import MemberList from "../members/MemberList";

import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ProfileForm from "../profiles/ProfileForm";

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
      <Route exact path="/login" element={<LoginForm login={login} />} />
      <Route
        exact
        path="/register"
        element={<RegisterForm register={register} />}
      />
      <Route exact path="/profile" element={<ProfileForm />} />
      <Route exact path="/members" element={<MemberList />} />
      <Route exact path="/courses" element={<CourseList />} />
      <Route exact path="/tournaments" element={<TournamentList />} />
      <Route path="/tournaments/:date" element={<TournamentDetails />} />

      {/* Redirect to homepage if route doesn't exist */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Router;
