import React, { useState } from "react";
import CcgcApi from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
} from "reactstrap";

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

const GreenieForm = ({ roundIds, greenie }) => {
  let navigate = useNavigate();
  const { date } = useParams();

  const [formData, setFormData] = useState({
    roundId: greenie ? greenie.id : roundIds[0][0],
    holeNumber: greenie ? greenie.holeNumber : 1,
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

    let greenieData = {
      roundId: formData.roundId,
      holeNumber: formData.holeNumber,
      feet: formData.feet,
      inches: formData.inches,
    };

    try {
      if (greenie) {
        await CcgcApi.updateGreenie(greenie.id, greenieData);
      } else {
        await CcgcApi.createGreenie(greenieData);
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
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-8 col-lg-6">
        <Card>
          <CardTitle className="display-4 text-center bg-success py-2 text-white">
            {greenie ? "Update" : "New"} Greenie
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="row align-items-center justify-content-center">
                <div className="col-3 col-lg-auto">
                  <Label htmlFor="roundId" className="mb-0">
                    Name
                  </Label>
                </div>
                <div className="col-9">
                  {greenie ? (
                    <Input
                      className="form-control"
                      value={greenie.firstName + " " + greenie.lastName}
                      readOnly
                    ></Input>
                  ) : (
                    <Input
                      className="form-control"
                      id="roundId"
                      name="roundId"
                      type="select"
                      onChange={handleChange}
                      value={formData.roundId}
                      required
                    >
                      {roundIds.map((r) => (
                        <option key={r[0]} value={r[0]}>
                          {r[1]}
                        </option>
                      ))}
                    </Input>
                  )}
                </div>
              </FormGroup>

              {greenie ? (
                <FormGroup className="row align-items-center justify-content-center">
                  <div className="col-3 col-lg-auto">
                    <Label htmlFor="roundId" className="mb-0">
                      Date
                    </Label>
                  </div>
                  <div className="col-9">
                    <Input
                      className="form-control"
                      value={new Date(
                        greenie.tournamentDate
                      ).toLocaleDateString()}
                      readOnly
                    ></Input>
                  </div>
                </FormGroup>
              ) : null}

              <div className="">
                <FormGroup className="row justify-content-center align-items-center">
                  <div className="col-3 col-lg-auto">
                    <Label htmlFor="holeNumber" className="mb-0">
                      Hole #
                    </Label>
                  </div>
                  <div className="col-9">
                    <Input
                      className="form-control"
                      id="holeNumber"
                      name="holeNumber"
                      type="select"
                      onChange={handleChange}
                      value={formData.holeNumber}
                      required
                    >
                      {Array.from({ length: 18 }, (_, i) => i + 1).map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
              </div>
              <div className="">
                <FormGroup className="row justify-content-center align-items-center">
                  <div className="col-3 col-lg-auto">
                    <Label htmlFor="feet" className="mb-0">
                      Feet
                    </Label>
                  </div>
                  <div className="col-9">
                    <Input
                      className="form-control"
                      id="feet"
                      name="feet"
                      type="number"
                      min="0"
                      onChange={handleChange}
                      value={formData.feet}
                      required
                    ></Input>
                  </div>
                </FormGroup>
              </div>
              <div className="">
                <FormGroup className="row justify-content-center align-items-center">
                  <div className="col-3 col-lg-auto">
                    <Label htmlFor="inches" className="mb-0">
                      Inches
                    </Label>
                  </div>
                  <div className="col-9">
                    <Input
                      className="form-control"
                      id="inches"
                      name="inches"
                      type="number"
                      onChange={handleChange}
                      value={formData.inches}
                      required
                    ></Input>
                  </div>
                </FormGroup>
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default GreenieForm;
