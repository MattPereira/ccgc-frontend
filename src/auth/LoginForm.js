import React, { useState } from "react";
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
  CardImg,
} from "reactstrap";

/** Login form.
 *
 * Shows form and manages updates to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to "/" route
 *
 * Routes -> SignupForm
 * Routed as /login
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
    let result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-8">
        <Card className="shadow mb-5">
          <CardTitle className="display-2 text-center bg-dark text-white py-2 mb-0">
            Login
          </CardTitle>

          <CardImg
            src="https://images.unsplash.com/photo-1623567341691-1f47b5cf949e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80"
            alt="Login card image"
          />
          <CardBody className="px-5 py-5">
            {/* <CardTitle className="display-4 text-center">Login</CardTitle> */}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="form-control"
                  id="email"
                  name="email"
                  type="text"
                  onChange={handleChange}
                  required
                  autoComplete="email"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  className="form-control"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                ></Input>
              </FormGroup>

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
                    Login
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

export default LoginForm;
