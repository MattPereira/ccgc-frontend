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

/** Form to edit user profile
 *
 * Displays profile form and handles changes to local form state.
 * Submission of form calls the API to save, and triggers user
 * reloading throughout the site.
 *
 * Confirmation of a successful save is a simple bootsrap <Alert>.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    bio: currentUser.bio,
    email: currentUser.email,
    password: "",
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
            <CardTitle className="display-4 text-center">
              Edit Profile
            </CardTitle>

            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={handleChange}
                      value={formData.firstName}
                      required
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-lg-6">
                  <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={handleChange}
                      value={formData.lastName}
                      required
                    ></Input>
                  </FormGroup>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="form-control"
                      id="email"
                      name="email"
                      type="text"
                      onChange={handleChange}
                      value={formData.email}
                      autoComplete="email"
                      required
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-lg-6">
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      className="form-control"
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={formData.password}
                      required
                      autoComplete="current-password"
                    ></Input>
                  </FormGroup>
                </div>

                <FormGroup>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    className="form-control"
                    id="bio"
                    name="bio"
                    type="textarea"
                    onChange={handleChange}
                    value={formData.bio}
                    required
                  ></Input>
                </FormGroup>
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
                    Update
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

export default ProfileForm;
