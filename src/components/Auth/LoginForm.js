import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import {
  Button,
  Typography,
  Paper,
  Container,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import ccgclogo from "../../assets/ccgc_logo.png";

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
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "30px",
  backgroundColor: "#eeeeee",
}));

const StyledCardImage = styled(Box)(({ theme }) => ({
  width: "50%",
  borderRadius: "30px",
}));

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
    <Container sx={{ py: 5 }}>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Login
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={5}>
            <Box
              sx={{
                backgroundColor: "black",
                borderRadius: "30px",
                textAlign: "center",
                py: 3,
              }}
            >
              <StyledCardImage component="img" src={ccgclogo} />
            </Box>

            <Box sx={{ pt: 4, pb: 3, px: 3 }}>
              <Form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    required
                    autoComplete="email"
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
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="p">
          Don't have an account yet? <Link to="/register">Register here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
