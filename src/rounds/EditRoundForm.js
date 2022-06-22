import React, { useState } from "react";
import CcgcApi from "../api/api";
import { useNavigate } from "react-router-dom";

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

/** Form to edit a golf round
 *
 *
 * Displays EditRoundForm and handles changes to local form state.
 * Submission of form calls the API to save the round and redirects
 * to the tournament details page.
 *
 * Routed as /rounds/:id/edit
 *
 * Routes -> EditRound -> EditRoundForm
 *
 */

const EditRoundForm = ({ round }) => {
  let navigate = useNavigate();

  console.log(round);

  const [formData, setFormData] = useState({
    strokes1: round.strokes.hole1,
    strokes2: round.strokes.hole2,
    strokes3: round.strokes.hole3,
    strokes4: round.strokes.hole4,
    strokes5: round.strokes.hole5,
    strokes6: round.strokes.hole6,
    strokes7: round.strokes.hole7,
    strokes8: round.strokes.hole8,
    strokes9: round.strokes.hole9,
    strokes10: round.strokes.hole10,
    strokes11: round.strokes.hole11,
    strokes12: round.strokes.hole12,
    strokes13: round.strokes.hole13,
    strokes14: round.strokes.hole14,
    strokes15: round.strokes.hole15,
    strokes16: round.strokes.hole16,
    strokes17: round.strokes.hole17,
    strokes18: round.strokes.hole18,
    putts1: round.putts.hole1,
    putts2: round.putts.hole2,
    putts3: round.putts.hole3,
    putts4: round.putts.hole4,
    putts5: round.putts.hole5,
    putts6: round.putts.hole6,
    putts7: round.putts.hole7,
    putts8: round.putts.hole8,
    putts9: round.putts.hole9,
    putts10: round.putts.hole10,
    putts11: round.putts.hole11,
    putts12: round.putts.hole12,
    putts13: round.putts.hole13,
    putts14: round.putts.hole14,
    putts15: round.putts.hole15,
    putts16: round.putts.hole16,
    putts17: round.putts.hole17,
    putts18: round.putts.hole18,
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

    try {
      await CcgcApi.updateRound(round.id, roundData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    //navigate to the course detail page for the newly created course
    navigate(`/rounds/${round.id}`);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card className="px-5 py-3 mb-5">
          <CardBody>
            <CardTitle className="display-4 text-center mb-3">
              Edit Round
            </CardTitle>

            <Form onSubmit={handleSubmit}>
              <div className="row">
                <FormGroup>
                  <Label htmlFor="name" className="fw-bold">
                    Tournament Date
                  </Label>
                  <Input
                    className="form-control"
                    type="text"
                    value={new Date(round.tournamentDate).toLocaleDateString()}
                    readOnly
                  ></Input>
                </FormGroup>
              </div>
              <div className="row">
                <FormGroup>
                  <Label htmlFor="name" className="fw-bold">
                    Username
                  </Label>
                  <Input
                    className="form-control"
                    type="text"
                    value={round.username}
                    readOnly
                  ></Input>
                </FormGroup>
              </div>

              <div className="row text-center">
                <div className="col-2">
                  <Label className="fw-bold">Hole</Label>
                </div>
                <div className="col-5">
                  <Label className="fw-bold">Strokes</Label>
                </div>
                <div className="col-5">
                  <Label className="fw-bold">Putts</Label>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#1</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes1"
                    name="strokes1"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes1}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts1"
                    name="putts1"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts1}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#2</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes2"
                    name="strokes2"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes2}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts2"
                    name="putts2"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts2}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#3</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes3"
                    name="strokes3"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes3}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts3"
                    name="putts3"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts3}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#4</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes4"
                    name="strokes4"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes4}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts4"
                    name="putts4"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts4}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#5</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes5"
                    name="strokes5"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes5}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts5"
                    name="putts5"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts5}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#6</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes6"
                    name="strokes6"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes6}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts6"
                    name="putts6"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts6}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#7</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes7"
                    name="strokes7"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes7}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts7"
                    name="putts7"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts7}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#8</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes8"
                    name="strokes8"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes8}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts8"
                    name="putts8"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts8}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#9</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes9"
                    name="strokes9"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes9}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts9"
                    name="putts9"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts9}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#10</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes10"
                    name="strokes10"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes10}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts10"
                    name="putts10"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts10}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#11</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes11"
                    name="strokes11"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes11}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts11"
                    name="putts11"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts11}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#12</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes12"
                    name="strokes12"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes12}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts12"
                    name="putts12"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts12}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#13</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes13"
                    name="strokes13"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes13}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts13"
                    name="putts13"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts13}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#14</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes14"
                    name="strokes14"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes14}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts14"
                    name="putts14"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts14}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#15</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes15"
                    name="strokes15"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes15}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts15"
                    name="putts15"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts15}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#16</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes16"
                    name="strokes16"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes16}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts16"
                    name="putts16"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts16}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#17</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes17"
                    name="strokes17"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes17}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts17"
                    name="putts17"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts17}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <Label className="fw-bold">#18</Label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="strokes18"
                    name="strokes18"
                    type="number"
                    onChange={handleChange}
                    value={formData.strokes18}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="putts18"
                    name="putts18"
                    type="number"
                    onChange={handleChange}
                    value={formData.putts18}
                    required
                  ></Input>
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EditRoundForm;
