import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import {
  Container,
  Button,
  Typography,
  Paper,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

import SiteHero from "../../components/SiteHero";

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "30px",
  backgroundColor: "#eeeeee",
}));

const StyledTextField = styled(TextField)({
  backgroundColor: "white",
  width: "100%",
});

export default function RegisterForm({ register }) {
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
    <Box>
      <SiteHero />
      <Container sx={{ py: 5 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={0}>
              <Box sx={{ p: 3 }}>
                <Form onSubmit={handleSubmit}>
                  <Typography variant="h1" sx={{ mb: 5 }}>
                    Register
                  </Typography>
                  <Box sx={{ textAlign: "center", my: 5 }}>
                    <Typography variant="p">
                      Already have an account?{" "}
                      <Link to="/login">Login here</Link>
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <StyledTextField
                      id="email"
                      name="email"
                      label="Email"
                      type="text"
                      variant="outlined"
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      sx={{ width: "100%", bgcolor: "white" }}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <StyledTextField
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onChange={handleChange}
                      required
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <StyledTextField
                      id="firstName"
                      name="firstName"
                      type="text"
                      label="First Name"
                      variant="outlined"
                      onChange={handleChange}
                      required
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <StyledTextField
                      id="lastName"
                      name="lastName"
                      type="text"
                      label="Last Name"
                      variant="outlined"
                      onChange={handleChange}
                      required
                      sx={{ width: "100%" }}
                    />
                  </Box>

                  {formErrors.length
                    ? formErrors.map((err) => (
                        <Alert variant="danger" key={err}>
                          {err}
                        </Alert>
                      ))
                    : null}

                  <Box sx={{ textAlign: "end" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ borderRadius: "30px", px: 3, py: 1 }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
