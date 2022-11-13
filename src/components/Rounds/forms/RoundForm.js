import React, { useState, useContext } from "react";
import CcgcApi from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import UserContext from "../../Auth/UserContext";

import { Form, Alert, Container, Row, Col } from "react-bootstrap";

import { Button, Paper, Typography, Box } from "@mui/material";

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

const RoundForm = ({ availableUsernames, round }) => {
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { date } = useParams();

  const { strokes, putts } = round || {};

  console.log("AVAILABLE: ", availableUsernames);

  //Gracefully handling react requirement that form input value not be null lol
  const [formData, setFormData] = useState({
    username: round
      ? round.username
      : availableUsernames.includes(currentUser.username)
      ? currentUser.username
      : availableUsernames[0],
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
      //navigate to the tournament details page after editing a round
      navigate(`/tournaments/${round.tournamentDate}`);
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
          <Typography gutterBottom variant="h1">
            {round ? "Edit" : "New"} Round
          </Typography>

          <Paper variant="outlined">
            {round ? (
              <Box
                sx={{
                  textAlign: "center",
                  bgcolor: "rgb(33, 37, 41)",
                  borderRadius: "4px 4px 0 0",
                  py: 1,
                }}
              >
                <Typography
                  variant="h3"
                  component={Link}
                  to={`/rounds/${round.id}`}
                  sx={{ textDecoration: "none", color: "white" }}
                >
                  {" "}
                  {round.username
                    .split("-")
                    .map((name) => {
                      return name.charAt(0).toUpperCase() + name.slice(1);
                    })
                    .join(" ")}{" "}
                  {/* {new Date(round.tournamentDate).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                  })} */}
                </Typography>
              </Box>
            ) : null}
            <Form className="p-3" onSubmit={handleSubmit}>
              {round ? null : (
                <Row className="mb-3 text-center align-items-center">
                  <Col xs={2}>
                    <Form.Label htmlFor="name" className="fw-bold mb-0">
                      Date
                    </Form.Label>
                  </Col>
                  <Col xs={10}>
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
                  </Col>
                </Row>
              )}

              {round ? null : (
                <Row className="mb-3 align-items-center justify-content-center text-center">
                  <Col xs={2}>
                    <Form.Label htmlFor="username" className="fw-bold mb-0">
                      Name
                    </Form.Label>
                  </Col>
                  <Col xs={10}>
                    <Form.Select
                      className="form-control"
                      id="username"
                      name="username"
                      type="select"
                      onChange={handleChange}
                      value={formData.username}
                      required
                    >
                      {availableUsernames.map((username) => (
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
                  </Col>
                </Row>
              )}

              <Row className="text-center justify-content-center mb-2">
                <Col xs={2}>
                  <Form.Label className="fw-bold">
                    <u>Hole</u>
                  </Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Label className="fw-bold">
                    <u>Strokes</u>
                  </Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Label className="fw-bold">
                    <u>Putts</u>
                  </Form.Label>
                </Col>
              </Row>

              {HOLES.map((num) => (
                <Row
                  key={num}
                  className="align-items-center justify-content-center text-center mb-3"
                >
                  <Col xs={2}>
                    <Form.Label className="fw-bold mb-0">#{num}</Form.Label>
                  </Col>
                  <Col xs={5}>
                    <Form.Control
                      className="form-control"
                      id={`strokes${num}`}
                      name={`strokes${num}`}
                      type="number"
                      min="1"
                      onChange={handleChange}
                      value={eval(`formData.strokes${num}`)}
                    ></Form.Control>
                  </Col>
                  <Col xs={5}>
                    <Form.Control
                      className="form-control"
                      id={`putts${num}`}
                      name={`putts${num}`}
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={eval(`formData.putts${num}`)}
                    ></Form.Control>
                  </Col>
                </Row>
              ))}

              <Row className="justify-content-end">
                <Col xs={10}>
                  <Row style={{ padding: "12px 12px 0px" }}>
                    <Button variant="contained" type="submit" size="large">
                      Submit
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Paper>
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
