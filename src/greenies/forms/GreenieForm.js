import React, { useState } from "react";
import CcgcApi from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Alert } from "react-bootstrap";

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

const GreenieForm = ({ par3HoleNums, playerName, greenie }) => {
  let navigate = useNavigate();
  const { roundId } = useParams();

  //dynamically set initial state of formData based on whether creating or updating
  //a greenie by looking to see if greenie is passed in as a prop
  const [formData, setFormData] = useState({
    roundId: greenie ? greenie.roundId : roundId,
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
      roundId: formData.roundId,
      holeNumber: formData.holeNumber,
      feet: formData.feet,
      inches: formData.inches,
    };

    let updateGreenieData = {
      feet: formData.feet,
      inches: formData.inches,
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
      navigate(`/rounds/${roundId}`);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-8 col-lg-6">
        <Card>
          <Card.Title className="display-4 text-center bg-success py-2 text-white">
            {greenie ? "Edit" : "New"} Greenie
          </Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="row align-items-center justify-content-center mb-3">
                <div className="col-3 col-lg-auto">
                  <Form.Label htmlFor="roundId" className="mb-0">
                    Name
                  </Form.Label>
                </div>
                <div className="col-9">
                  {greenie ? (
                    <Form.Control
                      value={greenie.firstName + " " + greenie.lastName}
                      className="text-center"
                      readOnly
                    ></Form.Control>
                  ) : (
                    <Form.Control value={playerName} readOnly></Form.Control>
                  )}
                </div>
              </Form.Group>

              {greenie ? (
                <Form.Group className="row align-items-center justify-content-center mb-3">
                  <div className="col-3 col-lg-auto">
                    <Form.Label htmlFor="roundId" className="mb-0">
                      Date
                    </Form.Label>
                  </div>
                  <div className="col-9">
                    <Form.Control
                      className="text-center"
                      value={new Date(
                        greenie.tournamentDate
                      ).toLocaleDateString()}
                      readOnly
                    ></Form.Control>
                  </div>
                </Form.Group>
              ) : null}

              <div className="">
                <Form.Group className="row justify-content-center align-items-center mb-3">
                  <div className="col-3 col-lg-auto">
                    <Form.Label htmlFor="holeNumber" className="mb-0">
                      Hole #
                    </Form.Label>
                  </div>
                  <div className="col-9">
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
                  </div>
                </Form.Group>
              </div>
              <div className="">
                <Form.Group className="row justify-content-center align-items-center mb-3">
                  <div className="col-3 col-lg-auto">
                    <Form.Label htmlFor="feet" className="mb-0">
                      Feet
                    </Form.Label>
                  </div>
                  <div className="col-9">
                    <input
                      className="form-control"
                      id="feet"
                      name="feet"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.feet}
                      required
                    ></input>
                  </div>
                </Form.Group>
              </div>
              <div className="">
                <Form.Group className="row justify-content-center align-items-center mb-3">
                  <div className="col-3 col-lg-auto">
                    <Form.Label htmlFor="inches" className="mb-0">
                      Inches
                    </Form.Label>
                  </div>
                  <div className="col-9">
                    <input
                      className="form-control"
                      id="inches"
                      name="inches"
                      type="number"
                      min="0"
                      max="11"
                      onChange={handleChange}
                      value={formData.inches}
                      required
                    ></input>
                  </div>
                </Form.Group>
              </div>

              {formErrors.length
                ? formErrors.map((err) => (
                    <Alert key={err} variant="danger">
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

export default GreenieForm;
