import React, { useState } from "react";
import CcgcApi from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Alert, Container, Row, Col } from "react-bootstrap";

import { Button, Typography } from "@mui/material";

/** Form to create a new greenie
 *
 *
 * Displays new greenie form and handles changes to local form state.
 * Submission of form calls the API to save the greenie.
 *
 * Redirects to CourseDetails page upon form submission.
 *
 * Routed as /greenies/:date/new
 * Routes -> NewGreenie -> NewGreenieForm
 */

const GreenieForm = ({ par3HoleNums, usernames, greenie }) => {
  let navigate = useNavigate();
  const { date } = useParams();

  /// HOW TO SEND AND SET THE ROUND ID AS SELECT INPUT OPTIONS CHANGE?
  /// NEED TO USE NAMES FOR THE SELECT INPUT OPTIONS USER SEES BUT KEEP ROUND ID IN STATE

  console.log(usernames);

  //dynamically set initial state of formData based on whether creating or updating
  //a greenie by looking to see if greenie is passed in as a prop
  const [formData, setFormData] = useState({
    roundId: greenie ? greenie.roundId : usernames[0][0],
    holeNumber: greenie ? greenie.holeNumber : par3HoleNums[0],
    feet: greenie ? greenie.feet : "",
    inches: greenie ? greenie.inches : "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "NewGreenieForm",
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

    let newGreenieData = {
      roundId: +formData.roundId,
      holeNumber: +formData.holeNumber,
      feet: +formData.feet,
      inches: +formData.inches,
    };

    let updateGreenieData = {
      feet: +formData.feet,
      inches: +formData.inches,
    };

    try {
      if (greenie) {
        await CcgcApi.updateGreenie(greenie.id, updateGreenieData);
      } else {
        await CcgcApi.createGreenie(newGreenieData);
      }
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    //navigate to the tournament detail page associated with the new greenie
    if (greenie) {
      navigate(`/greenies/${greenie.id}`);
    } else {
      navigate(`/tournaments/${date}`);
    }
  };

  return (
    <Container className="my-5">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <Typography variant="h1" gutterBottom>
            {greenie ? "Edit" : "Add"} Greenie{" "}
          </Typography>
          <Card className="p-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3 align-items-center">
                  <Col xs={2}>
                    <Form.Label htmlFor="roundId" className="mb-0">
                      <b>Name</b>
                    </Form.Label>
                  </Col>
                  <Col xs={10}>
                    {greenie ? (
                      <Form.Control
                        value={greenie.firstName + " " + greenie.lastName}
                        className="text-center"
                        readOnly
                      ></Form.Control>
                    ) : (
                      <Form.Select
                        name="roundId"
                        id="roundId"
                        value={formData.roundId}
                        onChange={handleChange}
                      >
                        {usernames.map((user) => (
                          <option key={user[0]} value={user[0]}>
                            {user[1]
                              .split("-")
                              .map((n) => n[0].toUpperCase() + n.slice(1))
                              .join(" ")}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  </Col>
                </Row>

                {greenie ? (
                  <Row className="mb-3 align-items-center">
                    <Col xs={2}>
                      <Form.Label htmlFor="roundId" className="mb-0">
                        <b>Date</b>
                      </Form.Label>
                    </Col>
                    <Col xs={10}>
                      <Form.Control
                        className="text-center"
                        value={new Date(
                          greenie.tournamentDate
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        readOnly
                      ></Form.Control>
                    </Col>
                  </Row>
                ) : null}

                <Row className="mb-3 align-items-center">
                  <Col xs={2}>
                    <Form.Label htmlFor="holeNumber" className="mb-0">
                      <b>Hole</b>
                    </Form.Label>
                  </Col>
                  <Col xs={10}>
                    {greenie ? (
                      <Form.Control
                        id="holeNumber"
                        name="holeNumber"
                        type="number"
                        value={greenie.holeNumber}
                        required
                        readOnly
                      />
                    ) : (
                      <Form.Select
                        className="form-control"
                        id="holeNumber"
                        name="holeNumber"
                        type="select"
                        onChange={handleChange}
                        value={formData.holeNumber}
                        required
                      >
                        {par3HoleNums.map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col xs={2}>
                    <Form.Label htmlFor="feet" className="mb-0">
                      <b>Feet</b>
                    </Form.Label>
                  </Col>
                  <Col xs={10}>
                    <Form.Control
                      className="form-control"
                      id="feet"
                      name="feet"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.feet}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3 align-items-center">
                  <Col xs={2}>
                    <Form.Label htmlFor="inches" className="mb-0">
                      <b>Inches</b>
                    </Form.Label>
                  </Col>
                  <Col xs={10}>
                    <Form.Control
                      className="form-control"
                      id="inches"
                      name="inches"
                      type="number"
                      min="0"
                      max="11"
                      onChange={handleChange}
                      value={formData.inches}
                      required
                    />
                  </Col>
                </Row>

                {formErrors.length
                  ? formErrors.map((err) => (
                      <Alert key={err} variant="danger">
                        {err}
                      </Alert>
                    ))
                  : null}

                <div className="text-end">
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default GreenieForm;
