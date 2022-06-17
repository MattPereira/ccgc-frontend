import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import CcgcApi from "../api/api";
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

/** Form to create (and maybe edit?) a course
 *
 * Displays course form and handles changes to local form state.
 * Submission of form calls the API to save the course and redirects
 * to the courses list page.
 *
 * Redirects to CourseDetails page upon form submission.
 *
 * Routed as /courses/new
 * Routes -> CourseForm -> Alert
 */

///MAKE A COURSE_HANDLE BY SPLITTING NAME BY SPACES AND JOINING WITH '-'

const CourseForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    slope: "",
    pars: {
      hole1: "",
      hole2: "",
      hole3: "",
      hole4: "",
      hole5: "",
    },
  });

  const [formErrors, setFormErrors] = useState([]);
  const [updateConfirmed, setUpdateConfirmed] = useState(false);

  console.debug(
    "ProfileForm",
    "currentUser=",
    currentUser,
    "formData=",
    formData,
    "formErrors=",
    formErrors,
    "updateConfirmed=",
    updateConfirmed
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

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      bio: formData.bio,
    };

    let updatedUser;

    try {
      updatedUser = await CcgcApi.updateProfile(
        currentUser.username,
        profileData
      );
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData((fData) => ({ ...fData, password: "" }));
    setFormErrors([]);
    setUpdateConfirmed(true);

    //trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Card className="px-5 py-3">
          <CardBody>
            <CardTitle className="display-4 text-center">New Course</CardTitle>

            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="">
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
                <div className="col-lg-6"></div>
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
                      type="slope"
                      onChange={handleChange}
                      value={formData.slope}
                      required
                    ></Input>
                  </FormGroup>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <label>Hole</label>
                </div>
                <div className="col-5">
                  <Label htmlFor="par1">Par</Label>
                </div>
                <div className="col-5">
                  <Label htmlFor="handicap1">Handicap</Label>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <label>#1</label>
                </div>
                <div className="col-5">
                  <FormGroup>
                    <Input
                      className="form-control"
                      id="par1"
                      name="par1"
                      type="text"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-5">
                  <FormGroup>
                    <Input
                      className="form-control"
                      id="handicap1"
                      name="handicap1"
                      type="handicap1"
                      onChange={handleChange}
                      value={formData.password}
                      required
                      autoComplete="current-password"
                    ></Input>
                  </FormGroup>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <label className="align-self-center">#2</label>
                </div>
                <div className="col-5">
                  <FormGroup>
                    <Input
                      className="form-control"
                      id="par1"
                      name="par1"
                      type="text"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-5">
                  <FormGroup>
                    <Input
                      className="form-control"
                      id="handicap1"
                      name="handicap1"
                      type="handicap1"
                      onChange={handleChange}
                      value={formData.password}
                      required
                      autoComplete="current-password"
                    ></Input>
                  </FormGroup>
                </div>
              </div>

              {formErrors.length
                ? formErrors.map((err) => (
                    <Alert key={err} color="danger">
                      {err}
                    </Alert>
                  ))
                : null}

              {updateConfirmed ? (
                <Alert type="success">Profile information updated!</Alert>
              ) : null}

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

export default CourseForm;
