import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    () => JSON.parse(localStorage.getItem("authToken")) || null
  );

  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    authToken ? authToken.accessToken : null
  );
  const [loading, setLoading] = useState(false);

  // Check local storage and set token & user on first render
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (token) {
      setAuthToken(token);
      setUser(token.accessToken);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  }, [navigate]);

  // Update Token function
  const updateToken = useCallback(async () => {
    console.log("Updating token...");
    const response = await fetch("http://localhost:5175/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: authToken?.refreshToken }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(data.accessToken);
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      logout();
    }
    setLoading(false);
  }, [authToken, logout]);

  // Token refresh every 4 minutes
  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, 240000); // 4-minute interval
    return () => clearInterval(interval);
  }, [authToken, loading, updateToken]);

  // Login function
  const login = async (formData) => {
    console.log("Logging in...");
    try {
      const response = await fetch("http://localhost:5175/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        const { tokenType, accessToken, expiresIn, refreshToken } = data;

        console.log("Login successful:", accessToken);

        const authToken = {
          tokenType,
          accessToken,
          expiresIn,
          refreshToken,
        };

        localStorage.setItem("authToken", JSON.stringify(authToken));
        setAuthToken(authToken);
        setUser(accessToken); // Decode the access token and set the user

        navigate("/");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  // Registration function
  const Registration = async (formData) => {
    console.log("Registration...");

    try {
      const response = await fetch("http://localhost:5175/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Registration error:", data);
        const errorMessages = data.map((error) => error.description).join("\n");
        alert(`Registration failed:\n${errorMessages}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(`Registration failed: ${error.message}. Please try again.`);
    }
  };

  // Context value
  const contextData = {
    login,
    user,
    logout,
    authToken,
    Registration,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

// Add prop types validation for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is required and is a node
};