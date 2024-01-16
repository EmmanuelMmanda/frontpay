import { useState } from "react";
import { useAuth } from "../../store/authContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Assuming ApiCallForLogin is properly implemented
      const userData = await ApiCallForLogin(username, password);
      console.log(userData);
      login(userData);
      navigate("/tasks");

      
    } catch (error) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container
      style={{
        boxSizing: "border-box",
        width: "100vw",
        marginTop: "50px",
        padding: "16px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box
        style={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "0.7em",
        }}
      >
        <h2 style={{ color: "#000" }}>Login</h2>

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            style={{ marginBottom: "16px", width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            style={{ marginBottom: "16px", width: "100%" }}
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

// Function to API call for login
const ApiCallForLogin = async (username, password) => {

  const apiUrl = import.meta.env.VITE_API_CREATE_TOKEN_URL; 
  try {
    const response = await axios.post(apiUrl, {
      email: username,
      password: password,
    });

    const { username: Username, access_token: AccessToken } = response.data;
    return {
      username: Username,
      access_token: AccessToken,
    };
  } catch (error) {
    // Handle errors appropriately
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server');
    } else {
      console.error('Error during request setup:', error.message);
    }

    throw new Error('Failed to authenticate. Please check your credentials.');
  }
};