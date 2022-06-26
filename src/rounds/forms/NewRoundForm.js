import React, { useState, useContext } from "react";
import CcgcApi from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserContext from "../../auth/UserContext";

import { Card, Form, Alert } from "react-bootstrap";

/** Form to create a new round
 *
 *
 * Displays new round form and handles changes to local form state.
 * Submission of form calls the API to save the round and redirects
 * to the tournament details page.
 *
 * Routed as /rounds/:date/new
 *
 * Routes -> NewRoundForm
 *
 */

const NewRoundForm = ({ usernames }) => {
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { date } = useParams();

  const [formData, setFormData] = useState({
    username: currentUser.username,
    strokes1: "",
    strokes2: "",
    strokes3: "",
    strokes4: "",
    strokes5: "",
    strokes6: "",
    strokes7: "",
    strokes8: "",
    strokes9: "",
    strokes10: "",
    strokes11: "",
    strokes12: "",
    strokes13: "",
    strokes14: "",
    strokes15: "",
    strokes16: "",
    strokes17: "",
    strokes18: "",
    putts1: "",
    putts2: "",
    putts3: "",
    putts4: "",
    putts5: "",
    putts6: "",
    putts7: "",
    putts8: "",
    putts9: "",
    putts10: "",
    putts11: "",
    putts12: "",
    putts13: "",
    putts14: "",
    putts15: "",
    putts16: "",
    putts17: "",
    putts18: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "NewRoundForm",
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

    //package the formData into the format that the API wants
    //including converting strings to integers/numbers
    let roundData = {
      tournamentDate: date,
      username: formData.username,
      strokes: {
        hole1: +formData.strokes1,
        hole2: +formData.strokes2,
        hole3: +formData.strokes3,
        hole4: +formData.strokes4,
        hole5: +formData.strokes5,
        hole6: +formData.strokes6,
        hole7: +formData.strokes7,
        hole8: +formData.strokes8,
        hole9: +formData.strokes9,
        hole10: +formData.strokes10,
        hole11: +formData.strokes11,
        hole12: +formData.strokes12,
        hole13: +formData.strokes13,
        hole14: +formData.strokes14,
        hole15: +formData.strokes15,
        hole16: +formData.strokes16,
        hole17: +formData.strokes17,
        hole18: +formData.strokes18,
      },
      putts: {
        hole1: +formData.putts1,
        hole2: +formData.putts2,
        hole3: +formData.putts3,
        hole4: +formData.putts4,
        hole5: +formData.putts5,
        hole6: +formData.putts6,
        hole7: +formData.putts7,
        hole8: +formData.putts8,
        hole9: +formData.putts9,
        hole10: +formData.putts10,
        hole11: +formData.putts11,
        hole12: +formData.putts12,
        hole13: +formData.putts13,
        hole14: +formData.putts14,
        hole15: +formData.putts15,
        hole16: +formData.putts16,
        hole17: +formData.putts17,
        hole18: +formData.putts18,
      },
    };

    console.log(roundData);

    try {
      await CcgcApi.createRound(roundData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    //navigate to the course detail page for the newly created course
    navigate(`/tournaments/${date}`);
  };

  //Should I allow only admins to create rounds for other users?

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card className="px-5 py-3 mb-5">
          <Card.Body>
            <Card.Title className="display-4 text-center mb-3">
              New Round
            </Card.Title>

            <Form onSubmit={handleSubmit}>
              <div className="row">
                <Form.Group>
                  <Form.Label htmlFor="name" className="fw-bold">
                    Tournament Date
                  </Form.Label>
                  <input
                    className="form-control"
                    type="text"
                    value={new Date(date).toLocaleDateString()}
                    readOnly
                  ></input>
                </Form.Group>
              </div>
              <div className="row">
                <Form.Group>
                  <Form.Label htmlFor="name" className="fw-bold">
                    Username
                  </Form.Label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    type="select"
                    onChange={handleChange}
                    value={formData.username}
                    required
                  >
                    {usernames.map((username) => (
                      <option key={username} value={username}>
                        {username}
                      </option>
                    ))}
                  </input>
                </Form.Group>
              </div>

              <div className="row text-center">
                <div className="col-2">
                  <Form.Label className="fw-bold">Hole</Form.Label>
                </div>
                <div className="col-5">
                  <Form.Label className="fw-bold">Strokes</Form.Label>
                </div>
                <div className="col-5">
                  <Form.Label className="fw-bold">Putts</Form.Label>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#1</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes1"
                    name="strokes1"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes1}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts1"
                    name="putts1"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts1}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#2</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes2"
                    name="strokes2"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes2}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts2"
                    name="putts2"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts2}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#3</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes3"
                    name="strokes3"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes3}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts3"
                    name="putts3"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts3}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#4</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes4"
                    name="strokes4"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes4}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts4"
                    name="putts4"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts4}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#5</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes5"
                    name="strokes5"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes5}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts5"
                    name="putts5"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts5}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#6</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes6"
                    name="strokes6"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes6}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts6"
                    name="putts6"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts6}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#7</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes7"
                    name="strokes7"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes7}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts7"
                    name="putts7"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts7}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#8</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes8"
                    name="strokes8"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes8}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts8"
                    name="putts8"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts8}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#9</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes9"
                    name="strokes9"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes9}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts9"
                    name="putts9"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts9}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#10</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes10"
                    name="strokes10"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes10}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts10"
                    name="putts10"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts10}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#11</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes11"
                    name="strokes11"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes11}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts11"
                    name="putts11"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts11}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#12</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes12"
                    name="strokes12"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes12}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts12"
                    name="putts12"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts12}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#13</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes13"
                    name="strokes13"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes13}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts13"
                    name="putts13"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts13}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#14</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes14"
                    name="strokes14"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes14}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts14"
                    name="putts14"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts14}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#15</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes15"
                    name="strokes15"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes15}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts15"
                    name="putts15"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts15}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#16</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes16"
                    name="strokes16"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes16}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts16"
                    name="putts16"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts16}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#17</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes17"
                    name="strokes17"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes17}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts17"
                    name="putts17"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts17}
                    required
                  ></input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Form.Label className="fw-bold">#18</Form.Label>
                </div>
                <div className="col-5 align-self-center">
                  <input
                    className="form-control"
                    id="strokes18"
                    name="strokes18"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes18}
                    required
                  ></input>
                </div>
                <div className="col-5">
                  <input
                    className="form-control"
                    id="putts18"
                    name="putts18"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts18}
                    required
                  ></input>
                </div>
              </div>

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
                    Submit
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

export default NewRoundForm;
