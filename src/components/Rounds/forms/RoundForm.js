import React, { useState, useContext } from "react";
import CcgcApi from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserContext from "../../Auth/UserContext";

import { Card, Form, Alert, Container } from "react-bootstrap";

import { Button } from "@mui/material";

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

const RoundForm = ({ usernames, round }) => {
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { date } = useParams();

  const { strokes, putts } = round || {};

  //Gracefully handling react requirement that form input value not be null lol
  const [formData, setFormData] = useState({
    username: round ? round.username : currentUser.username,
    strokes1: strokes ? (strokes.hole1 === null ? "" : strokes.hole1) : "",
    strokes2: strokes ? (strokes.hole2 === null ? "" : strokes.hole2) : "",
    strokes3: strokes ? (strokes.hole3 === null ? "" : strokes.hole3) : "",
    strokes4: strokes ? (strokes.hole4 === null ? "" : strokes.hole4) : "",
    strokes5: strokes ? (strokes.hole5 === null ? "" : strokes.hole5) : "",
    strokes6: strokes ? (strokes.hole6 === null ? "" : strokes.hole6) : "",
    strokes7: strokes ? (strokes.hole7 === null ? "" : strokes.hole7) : "",
    strokes8: strokes ? (strokes.hole8 === null ? "" : strokes.hole8) : "",
    strokes9: strokes ? (strokes.hole9 === null ? "" : strokes.hole9) : "",
    strokes10: strokes ? (strokes.hole10 === null ? "" : strokes.hole10) : "",
    strokes11: strokes ? (strokes.hole11 === null ? "" : strokes.hole11) : "",
    strokes12: strokes ? (strokes.hole12 === null ? "" : strokes.hole12) : "",
    strokes13: strokes ? (strokes.hole13 === null ? "" : strokes.hole13) : "",
    strokes14: strokes ? (strokes.hole14 === null ? "" : strokes.hole14) : "",
    strokes15: strokes ? (strokes.hole15 === null ? "" : strokes.hole15) : "",
    strokes16: strokes ? (strokes.hole16 === null ? "" : strokes.hole16) : "",
    strokes17: strokes ? (strokes.hole17 === null ? "" : strokes.hole17) : "",
    strokes18: strokes ? (strokes.hole18 === null ? "" : strokes.hole18) : "",
    putts1: putts ? (putts.hole1 === null ? "" : putts.hole1) : "",
    putts2: putts ? (putts.hole2 === null ? "" : putts.hole2) : "",
    putts3: putts ? (putts.hole3 === null ? "" : putts.hole3) : "",
    putts4: putts ? (putts.hole4 === null ? "" : putts.hole4) : "",
    putts5: putts ? (putts.hole5 === null ? "" : putts.hole5) : "",
    putts6: putts ? (putts.hole6 === null ? "" : putts.hole6) : "",
    putts7: putts ? (putts.hole7 === null ? "" : putts.hole7) : "",
    putts8: putts ? (putts.hole8 === null ? "" : putts.hole8) : "",
    putts9: putts ? (putts.hole9 === null ? "" : putts.hole9) : "",
    putts10: putts ? (putts.hole10 === null ? "" : putts.hole10) : "",
    putts11: putts ? (putts.hole11 === null ? "" : putts.hole11) : "",
    putts12: putts ? (putts.hole12 === null ? "" : putts.hole12) : "",
    putts13: putts ? (putts.hole13 === null ? "" : putts.hole13) : "",
    putts14: putts ? (putts.hole14 === null ? "" : putts.hole14) : "",
    putts15: putts ? (putts.hole15 === null ? "" : putts.hole15) : "",
    putts16: putts ? (putts.hole16 === null ? "" : putts.hole16) : "",
    putts17: putts ? (putts.hole17 === null ? "" : putts.hole17) : "",
    putts18: putts ? (putts.hole18 === null ? "" : putts.hole18) : "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug("RoundForm", "formData=", formData, "formErrors=", formErrors);

  /***** Update state of formData onChange of any form input field *****/
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
    setFormErrors([]);
  };

  /** On form submission:
   * -attempt save to backend & report any errors
   * -if successful
   *  -clear previous error messages and password
   *  - show update-confirmed alert
   *  - set current user info throughout the site
   */

  const {
    strokes1,
    strokes2,
    strokes3,
    strokes4,
    strokes5,
    strokes6,
    strokes7,
    strokes8,
    strokes9,
  } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //package the formData into the format that the API wants
    let roundData = {
      tournamentDate: round ? round.tournamentDate : date,
      username: formData.username,
      strokes: {
        hole1: strokes1 === "" ? null : +strokes1,
        hole2: strokes2 === "" ? null : +strokes2,
        hole3: strokes3 === "" ? null : +strokes3,
        hole4: strokes4 === "" ? null : +strokes4,
        hole5: strokes5 === "" ? null : +strokes5,
        hole6: strokes6 === "" ? null : +strokes6,
        hole7: strokes7 === "" ? null : +strokes7,
        hole8: strokes8 === "" ? null : +strokes8,
        hole9: strokes9 === "" ? null : +strokes9,
        hole10: formData.strokes10 === "" ? null : +formData.strokes10,
        hole11: formData.strokes11 === "" ? null : +formData.strokes11,
        hole12: formData.strokes12 === "" ? null : +formData.strokes12,
        hole13: formData.strokes13 === "" ? null : +formData.strokes13,
        hole14: formData.strokes14 === "" ? null : +formData.strokes14,
        hole15: formData.strokes15 === "" ? null : +formData.strokes15,
        hole16: formData.strokes16 === "" ? null : +formData.strokes16,
        hole17: formData.strokes17 === "" ? null : +formData.strokes17,
        hole18: formData.strokes18 === "" ? null : +formData.strokes18,
      },
      putts: {
        hole1: formData.putts1 === "" ? null : +formData.putts1,
        hole2: formData.putts2 === "" ? null : +formData.putts2,
        hole3: formData.putts3 === "" ? null : +formData.putts3,
        hole4: formData.putts4 === "" ? null : +formData.putts4,
        hole5: formData.putts5 === "" ? null : +formData.putts5,
        hole6: formData.putts6 === "" ? null : +formData.putts6,
        hole7: formData.putts7 === "" ? null : +formData.putts7,
        hole8: formData.putts8 === "" ? null : +formData.putts8,
        hole9: formData.putts9 === "" ? null : +formData.putts9,
        hole10: formData.putts10 === "" ? null : +formData.putts10,
        hole11: formData.putts11 === "" ? null : +formData.putts11,
        hole12: formData.putts12 === "" ? null : +formData.putts12,
        hole13: formData.putts13 === "" ? null : +formData.putts13,
        hole14: formData.putts14 === "" ? null : +formData.putts14,
        hole15: formData.putts15 === "" ? null : +formData.putts15,
        hole16: formData.putts16 === "" ? null : +formData.putts16,
        hole17: formData.putts17 === "" ? null : +formData.putts17,
        hole18: formData.putts18 === "" ? null : +formData.putts18,
      },
    };

    try {
      if (round) {
        await CcgcApi.updateRound(round.id, roundData);
      } else {
        await CcgcApi.createRound(roundData);
      }
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    if (round) {
      //navigate to the round details page for an updated round
      navigate(`/rounds/${round.id}`);
    } else {
      //navigate to the tournament details page for a newly created round
      navigate(`/tournaments/${date}`);
    }
  };

  const HOLES = Array.from({ length: 18 }, (v, i) => i + 1);

  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-7 col-lg-5">
          <h1 className="text-center display-3 mb-5">
            {round ? "Edit" : "New"} Round
          </h1>
          <Card className="mb-5">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name" className="fw-bold">
                      Date
                    </Form.Label>
                    {round ? (
                      <Form.Control
                        className="form-control"
                        type="text"
                        value={new Date(
                          round.tournamentDate
                        ).toLocaleDateString("en-US")}
                        readOnly
                      ></Form.Control>
                    ) : (
                      <Form.Control
                        className="form-control"
                        type="text"
                        value={new Date(date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        readOnly
                      ></Form.Control>
                    )}
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="username" className="fw-bold">
                      Player
                    </Form.Label>
                    {round ? (
                      <Form.Control
                        value={formData.username}
                        readOnly
                      ></Form.Control>
                    ) : (
                      <Form.Select
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
                            {username
                              .split("-")
                              .map((name) => {
                                return (
                                  name.charAt(0).toUpperCase() + name.slice(1)
                                );
                              })
                              .join(" ")}
                          </option>
                        ))}
                      </Form.Select>
                    )}
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

                {HOLES.map((num) => (
                  <div key={num} className="row align-items-center mb-3">
                    <div className="col-2 text-center">
                      <Form.Label className="fw-bold">#{num}</Form.Label>
                    </div>
                    <div className="col-5 align-self-center">
                      <Form.Control
                        className="form-control"
                        id={`strokes${num}`}
                        name={`strokes${num}`}
                        type="number"
                        min="1"
                        onChange={handleChange}
                        value={eval(`formData.strokes${num}`)}
                      ></Form.Control>
                    </div>
                    <div className="col-5">
                      <Form.Control
                        className="form-control"
                        id={`putts${num}`}
                        name={`putts${num}`}
                        type="number"
                        min="0"
                        onChange={handleChange}
                        value={eval(`formData.putts${num}`)}
                      ></Form.Control>
                    </div>
                  </div>
                ))}

                {/* <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#1</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes1"
                      name="strokes1"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes1}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts1"
                      name="putts1"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts1}
                      required
                    ></Form.Control>
                  </div>
                </div> */}
                {/* <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#2</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes2"
                      name="strokes2"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes2}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts2"
                      name="putts2"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts2}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#3</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes3"
                      name="strokes3"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes3}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts3"
                      name="putts3"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts3}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#4</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes4"
                      name="strokes4"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes4}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts4"
                      name="putts4"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts4}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#5</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes5"
                      name="strokes5"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes5}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts5"
                      name="putts5"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts5}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#6</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes6"
                      name="strokes6"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes6}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts6"
                      name="putts6"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts6}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#7</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes7"
                      name="strokes7"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes7}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts7"
                      name="putts7"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts7}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#8</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes8"
                      name="strokes8"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes8}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts8"
                      name="putts8"
                      min="0"
                      type="number"
                      onChange={handleChange}
                      value={formData.putts8}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#9</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes9"
                      name="strokes9"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes9}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts9"
                      name="putts9"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts9}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#10</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes10"
                      name="strokes10"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes10}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts10"
                      name="putts10"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts10}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#11</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes11"
                      name="strokes11"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes11}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts11"
                      name="putts11"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts11}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#12</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes12"
                      name="strokes12"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes12}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts12"
                      name="putts12"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts12}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#13</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes13"
                      name="strokes13"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes13}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts13"
                      name="putts13"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts13}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#14</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes14"
                      name="strokes14"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes14}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts14"
                      name="putts14"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts14}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#15</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes15"
                      name="strokes15"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes15}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts15"
                      name="putts15"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts15}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#16</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes16"
                      name="strokes16"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes16}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts16"
                      name="putts16"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts16}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#17</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes17"
                      name="strokes17"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes17}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts17"
                      name="putts17"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts17}
                      required
                    ></Form.Control>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-2 text-center">
                    <Form.Label className="fw-bold">#18</Form.Label>
                  </div>
                  <div className="col-5 align-self-center">
                    <Form.Control
                      className="form-control"
                      id="strokes18"
                      name="strokes18"
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={formData.strokes18}
                      required
                    ></Form.Control>
                  </div>
                  <div className="col-5">
                    <Form.Control
                      className="form-control"
                      id="putts18"
                      name="putts18"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.putts18}
                      required
                    ></Form.Control>
                  </div>
                </div> */}

                <div className="text-end">
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          {formErrors.length
            ? formErrors.map((err) => (
                <Alert key={err} variant="danger">
                  {err}
                </Alert>
              ))
            : null}
        </div>
      </div>
    </Container>
  );
};

export default RoundForm;
