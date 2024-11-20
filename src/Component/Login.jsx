import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FaGoogle, FaFacebook } from "react-icons/fa";

function Login() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: '"Roboto", sans-serif',
          mt: 3,
          padding: 3,
          border: "1px solid #ccc", // Added border
          borderRadius: "8px", // Rounded corners
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <Typography variant="h6" component="div" gutterBottom>
          <img
            src="https://github.com/7oSkaaa/7oSkaaa/blob/main/Images/about_me.gif?raw=true" // Replace with your logo URL
            alt="Sitemark Logo"
            width = "50px"
            style={{ marginBottom: 10 }}
          />
        </Typography>

        {/* Sign in Header */}
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: "bold", // Header bold
          }}
        >
         LOGIN
        </Typography>

        {/* Form */}
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#000",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Sign in
          </Button>

          {/* Forgot Password */}
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "blue", cursor: "pointer", mt: 1 }}
          >
            Forgot your password?
          </Typography>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>or</Divider>

          {/* Social Buttons */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FaGoogle />}
            sx={{ mb: 2 }}
          >
            Sign in with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FaFacebook />}
            sx={{ mb: 2 }}
          >
            Sign in with Facebook
          </Button>

          {/* Sign up */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "blue",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
