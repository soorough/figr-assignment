import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Copyright from "../util/Copyright";
import { baseUrl } from "../util/Url.config";

const defaultTheme = createTheme();

export default function SignUp() {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (data) => {
    const errors = {};
    // Validate Name
    if (!data.name) {
      errors.name = "Name is required";
    }
    // Validate Email
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }
    // Validate Password
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
    };

    // Validate form data
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      // If there are validation errors, set them in state and stop submission
      setFormErrors(errors);
      return;
    }

    // If the form data is valid, proceed with the form submission
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check for successful response
      if (response.status === 201 || response.status === 200) {
        // User creation was successful
        navigate("/sign-in");
      } else {
        // Handle unsuccessful user creation
        console.error("Sign up unsuccessful:", response.status, response.data);
        setFormErrors({ form: "Sign up failed. Please try again." });
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      // Handle server errors (e.g., network issues, 4xx or 5xx responses)
      setFormErrors({ form: "Sign up failed. Please try again." });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        paddingTop: "6rem",
        backgroundColor: "lightgray",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                  />
                </Grid>
              </Grid>
              {/* Display form-level error messages */}
              {formErrors.form && (
                <Typography color="error" variant="body2" gutterBottom>
                  {formErrors.form}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign-in" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
