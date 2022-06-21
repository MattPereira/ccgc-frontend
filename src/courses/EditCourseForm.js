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
import "./CourseForms.css";

/** Form to edit a course
 *
 * Displays edit course form and handles changes to local form state.
 * Submission of form calls the API to save the course and redirects
 * to the courses list page.
 *
 * Redirects to CourseDetails page upon form submission.
 *
 * Routed as /courses/:handle/edit
 * Routes -> EditCourse -> EditCourseForm
 */

const EditCourseForm = ({ course }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: course.name,
    rating: course.rating,
    slope: course.slope,
    par1: course.pars.hole1,
    par2: course.pars.hole2,
    par3: course.pars.hole3,
    par4: course.pars.hole4,
    par5: course.pars.hole5,
    par6: course.pars.hole6,
    par7: course.pars.hole7,
    par8: course.pars.hole8,
    par9: course.pars.hole9,
    par10: course.pars.hole10,
    par11: course.pars.hole11,
    par12: course.pars.hole12,
    par13: course.pars.hole13,
    par14: course.pars.hole14,
    par15: course.pars.hole15,
    par16: course.pars.hole16,
    par17: course.pars.hole17,
    par18: course.pars.hole18,
    handicap1: course.handicaps.hole1,
    handicap2: course.handicaps.hole2,
    handicap3: course.handicaps.hole3,
    handicap4: course.handicaps.hole4,
    handicap5: course.handicaps.hole5,
    handicap6: course.handicaps.hole6,
    handicap7: course.handicaps.hole7,
    handicap8: course.handicaps.hole8,
    handicap9: course.handicaps.hole9,
    handicap10: course.handicaps.hole10,
    handicap11: course.handicaps.hole11,
    handicap12: course.handicaps.hole12,
    handicap13: course.handicaps.hole13,
    handicap14: course.handicaps.hole14,
    handicap15: course.handicaps.hole15,
    handicap16: course.handicaps.hole16,
    handicap17: course.handicaps.hole17,
    handicap18: course.handicaps.hole18,
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "EditCourseForm",
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
    let courseData = {
      name: formData.name,
      rating: +formData.rating,
      slope: +formData.slope,
      pars: {
        hole1: +formData.par1,
        hole2: +formData.par2,
        hole3: +formData.par3,
        hole4: +formData.par4,
        hole5: +formData.par5,
        hole6: +formData.par6,
        hole7: +formData.par7,
        hole8: +formData.par8,
        hole9: +formData.par9,
        hole10: +formData.par10,
        hole11: +formData.par11,
        hole12: +formData.par12,
        hole13: +formData.par13,
        hole14: +formData.par14,
        hole15: +formData.par15,
        hole16: +formData.par16,
        hole17: +formData.par17,
        hole18: +formData.par18,
      },
      handicaps: {
        hole1: +formData.handicap1,
        hole2: +formData.handicap2,
        hole3: +formData.handicap3,
        hole4: +formData.handicap4,
        hole5: +formData.handicap5,
        hole6: +formData.handicap6,
        hole7: +formData.handicap7,
        hole8: +formData.handicap8,
        hole9: +formData.handicap9,
        hole10: +formData.handicap10,
        hole11: +formData.handicap11,
        hole12: +formData.handicap12,
        hole13: +formData.handicap13,
        hole14: +formData.handicap14,
        hole15: +formData.handicap15,
        hole16: +formData.handicap16,
        hole17: +formData.handicap17,
        hole18: +formData.handicap18,
      },
    };

    try {
      await CcgcApi.updateCourse(course.handle, courseData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    //redirect or "navigate" to the course detail page for the new course?
    navigate(`/courses/${course.handle}`);
    // setFormErrors([]);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card className="px-5 py-3">
          <CardBody>
            <CardTitle className="display-4 text-center mb-3">
              Update Course
            </CardTitle>

            <Form onSubmit={handleSubmit}>
              <div className="row">
                <FormGroup>
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  ></Input>
                </FormGroup>
              </div>

              <div className="row">
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      className="form-control"
                      id="rating"
                      name="rating"
                      type="number"
                      step="0.1"
                      onChange={handleChange}
                      value={formData.rating}
                      required
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-6">
                  <FormGroup>
                    <Label htmlFor="slope">Slope</Label>
                    <Input
                      className="form-control"
                      id="slope"
                      name="slope"
                      type="number"
                      onChange={handleChange}
                      value={formData.slope}
                      required
                    ></Input>
                  </FormGroup>
                </div>
              </div>

              <div className="row text-center">
                <div className="col-2">
                  <Label>Hole</Label>
                </div>
                <div className="col-5">
                  <Label>Par</Label>
                </div>
                <div className="col-5">
                  <Label>Handicap</Label>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#1</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par1"
                    name="par1"
                    type="number"
                    onChange={handleChange}
                    value={formData.par1}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap1"
                    name="handicap1"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap1}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#2</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par2"
                    name="par2"
                    type="number"
                    onChange={handleChange}
                    value={formData.par2}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap2"
                    name="handicap2"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap2}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#3</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par3"
                    name="par3"
                    type="number"
                    onChange={handleChange}
                    value={formData.par3}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap3"
                    name="handicap3"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap3}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#4</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par4"
                    name="par4"
                    type="number"
                    onChange={handleChange}
                    value={formData.par4}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap4"
                    name="handicap4"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap4}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#5</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par5"
                    name="par5"
                    type="number"
                    onChange={handleChange}
                    value={formData.par5}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap5"
                    name="handicap5"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap5}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#6</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par6"
                    name="par6"
                    type="number"
                    onChange={handleChange}
                    value={formData.par6}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap6"
                    name="handicap6"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap6}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#7</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par7"
                    name="par7"
                    type="number"
                    onChange={handleChange}
                    value={formData.par7}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap7"
                    name="handicap7"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap7}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#8</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par8"
                    name="par8"
                    type="number"
                    onChange={handleChange}
                    value={formData.par8}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap8"
                    name="handicap8"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap8}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#9</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par9"
                    name="par9"
                    type="number"
                    onChange={handleChange}
                    value={formData.par9}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap9"
                    name="handicap9"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap9}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#10</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par10"
                    name="par10"
                    type="number"
                    onChange={handleChange}
                    value={formData.par10}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap10"
                    name="handicap10"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap10}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#11</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par11"
                    name="par11"
                    type="number"
                    onChange={handleChange}
                    value={formData.par11}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap11"
                    name="handicap11"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap11}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#12</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par12"
                    name="par12"
                    type="number"
                    onChange={handleChange}
                    value={formData.par12}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap12"
                    name="handicap12"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap12}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#13</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par13"
                    name="par13"
                    type="number"
                    onChange={handleChange}
                    value={formData.par13}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap13"
                    name="handicap13"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap13}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#14</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par14"
                    name="par14"
                    type="number"
                    onChange={handleChange}
                    value={formData.par14}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap14"
                    name="handicap14"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap14}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#15</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par15"
                    name="par15"
                    type="number"
                    onChange={handleChange}
                    value={formData.par15}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap15"
                    name="handicap15"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap15}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#16</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par16"
                    name="par16"
                    type="number"
                    onChange={handleChange}
                    value={formData.par16}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap16"
                    name="handicap16"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap16}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#17</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par17"
                    name="par17"
                    type="number"
                    onChange={handleChange}
                    value={formData.par17}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap17"
                    name="handicap17"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap17}
                    required
                  ></Input>
                </div>
              </div>

              <div className="row align-items-center mb-3">
                <div className="col-2 text-center">
                  <label>#18</label>
                </div>
                <div className="col-5 align-self-center">
                  <Input
                    className="form-control"
                    id="par18"
                    name="par18"
                    type="number"
                    onChange={handleChange}
                    value={formData.par18}
                    required
                  ></Input>
                </div>
                <div className="col-5">
                  <Input
                    className="form-control"
                    id="handicap18"
                    name="handicap18"
                    type="number"
                    onChange={handleChange}
                    value={formData.handicap18}
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

export default EditCourseForm;
