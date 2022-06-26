import React, { useState } from "react";
import CcgcApi from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Card, Form, Alert } from "react-bootstrap";

/** Form to edit a tournament
 *
 *
 * Displays tournament form that is pre-populated with the current tournament data
 * and handles changes to local form state.
 *
 * Submission of form calls the API to save the course and redirects
 * to the newly created tournament details page.
 *
 * Redirects to TournamentDetails page upon form submission.
 *
 * Routed as /tournaments/:date/edit
 * Routes -> EditTournament -> EditTournamentForm
 */

const EditTournamentForm = ({ tournament, courseHandles }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: tournament.date,
    courseHandle: tournament.courseHandle,
    tourYears: tournament.tourYears,
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "EditTournamentForm",
    "tournament=",
    tournament,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );
  //update state of formData onChange of any form input field
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
    setFormErrors([]);
  };

  /**on form submission:
   * -attempt save to backend & report any errors
   * -if successful
   *  -clear previous error messages and password
   *  - show update-confirmed alert
   *  - set current user info throughout the site
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updateData = {
      courseHandle: formData.courseHandle,
      tourYears: formData.tourYears,
    };

    try {
      await CcgcApi.updateTournament(tournament.date, updateData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    //navigate to the course detail page for the newly created course
    navigate(`/tournaments/${formData.date}`);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card className="px-5 py-3">
          <Card.Body>
            <Card.Title className="display-4 text-center">
              Edit Tournament
            </Card.Title>

            <ul>
              <li>The golf course must already exist in the database.</li>
              <li>The tournament date cannot be changed after creation.</li>
            </ul>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="firstName">Date</Form.Label>
                <Form.Control
                  readOnly
                  value={new Date(tournament.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="courseHandle">Golf Course</Form.Label>
                <Form.Select
                  id="courseHandle"
                  name="courseHandle"
                  onChange={handleChange}
                  value={formData.courseHandle}
                  required
                >
                  {courseHandles.map((handle) => (
                    <option key={handle} value={handle}>
                      {handle}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="tourYears">Tour Year</Form.Label>
                <Form.Select
                  id="tourYears"
                  name="tourYears"
                  onChange={handleChange}
                  value={formData.tourYears}
                  required
                >
                  <option>2021-22</option>
                  <option>2022-23</option>
                  <option>2023-24</option>
                  <option>2024-25</option>
                  <option>2025-26</option>
                </Form.Select>
              </Form.Group>

              {formErrors.length
                ? formErrors.map((err) => (
                    <Alert key={err} color="danger">
                      {err}
                    </Alert>
                  ))
                : null}

              <div className="row justify-content-end">
                <div className="col-auto">
                  <button className="btn btn-primary btn-block px-4">
                    Update
                  </button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditTournamentForm;
