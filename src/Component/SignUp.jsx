import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/signup', {
        email: formData.email,
        password: formData.password
      });
      navigate('/login'); // Navigate to login page after successful signup
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

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

        {/* Sign up Header */}
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: "bold", // Header bold
          }}
        >
          Sign up
        </Typography>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>

        {/* Form */}
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="terms" color="primary" />}
            label="I agree to the terms and conditions"
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
            Sign up
          </Button>

          {/* Already have an account */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Don’t have an account?{" "}
            <Link
              to="/"
              style={{
                color: "blue",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>or</Divider>

          {/* Social Sign-Up Buttons */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FaGoogle />}
            sx={{ mb: 2 }}
          >
            Sign up with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FaFacebook />}
            sx={{ mb: 2 }}
          >
            Sign up with Facebook
          </Button>
        </Box>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp;
