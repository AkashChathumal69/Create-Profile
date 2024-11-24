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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/dashboard'); // Navigate to dashboard after successful login
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

        {/* Sign in Header */}
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: "bold", // Header bold
          }}
        >
         LOG IN
        </Typography>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>

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
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
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
        </form>
      </Box>
    </Container>
  );
}

export default Login;
