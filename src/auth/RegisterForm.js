import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Alert } from "react-bootstrap";

/** Register form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls register function prop
 * - redirects to "/" route
 *
 * Routes -> RegisterForm
 * Routed to "/register"
 */

const RegisterForm = ({ register }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "RegisterForm",
    "register=",
    typeof register,
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //register function passes form data up to parent App component
    let result = await register(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-8">
        <Card className="shadow mb-5">
          <Card.Title className="display-2 text-center bg-dark text-white py-2 mb-0">
            Register
          </Card.Title>
          <Card.Img
            src="https://images.unsplash.com/photo-1605144156683-5ebde77feed5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt="Register card image"
          />
          <Card.Body className="px-5 py-5">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                ></input>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <input
                  className="form-control"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                ></input>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <input
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                ></input>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                ></input>
              </Form.Group>

              {formErrors.length
                ? formErrors.map((err) => (
                    <Alert color="danger" key={err}>
                      {err}
                    </Alert>
                  ))
                : null}

              <div className="row justify-content-end">
                <div className="col-auto">
                  <button className="btn btn-primary btn-block px-4">
                    Register
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

export default RegisterForm;
