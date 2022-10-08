import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Form, Alert, Container } from "react-bootstrap";
import { Button, Typography, Divider, Box } from "@mui/material";

/** Login form.
 *
 * Shows form and manages updates to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to "/" route
 *
 * Router -> RegisterForm
 * Routed to "/login"
 */

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
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

    formData.email = formData.email.toLowerCase();
    console.log(formData.email);
    let result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <Container className="py-5">
      <Typography variant="h1" sx={{ mb: 5 }}>
        Login
      </Typography>

      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-6">
          <Card className="shadow">
            <Card.Img
              src="https://images.unsplash.com/photo-1623567341691-1f47b5cf949e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80"
              alt="Login card image"
            />
            <p className="text-center mt-3">
              Don't have an account yet? Register{" "}
              <Link to="/register">here</Link>.{" "}
            </p>
            <Card.Body className="px-5 pb-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="text"
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  ></input>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  ></input>
                </Form.Group>

                {formErrors.length
                  ? formErrors.map((err) => (
                      <Alert variant="danger" key={err}>
                        {err}
                      </Alert>
                    ))
                  : null}

                <div className="text-end">
                  <Button variant="contained" type="submit">
                    Login
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

export default LoginForm;
