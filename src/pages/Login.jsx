// ==Login.jsx===

import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { AppContext } from "../context/AppContext";

const textFieldStyle = {
  "& .MuiInputBase-input": {
    color: "#a8a7a7ff",
    WebkitTextFillColor: "#a8a7a7ff",
  },
  "& .MuiInputLabel-root": { color: "#00e5ff" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1de9b6" },
    "&:hover fieldset": { borderColor: "#1de9b6" },
  },
};

const Login = () => {
  const history = useHistory();
  const { setIsLoggedIn } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      history.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <>
      <Box
        sx={{
          py: 10,
          background: "#2c5364",
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: `
          linear-gradient(
              rgba(15, 32, 39, 0.45),
              rgba(44, 83, 100, 0.45)
            ),
            url("/img/hero-bg.png")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            sx={{
              p: 4,
              backgroundColor: "#030709",
              color: "#fff",
              boxShadow: " 0px 0px 15px 5px #1de9b6",
              animation: "pulse 2.0s ease-in-out infinite",
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                },
                "50%": {
                  transform: "scale(1.03)",
                },
                "100%": {
                  transform: "scale(1)",
                },
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={textFieldStyle}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                fontWeight: 600,
                color: "#000",
                background: "linear-gradient(90deg, #00e5ff, #1de9b6)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1de9b6, #00e5ff)",
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;
