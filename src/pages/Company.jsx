// ==src/pages/company.jsx==

import { useContext, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const glassBg = "rgba(255,255,255,0.04)";
const glassBorder = "rgba(0,229,255,0.25)";
const glowCyan = "0 0 22px rgba(0,229,255,0.45)";
const glowTeal = "0 0 22px rgba(29,233,182,0.45)";

const textFieldStyle = {
  "& .MuiInputBase-input": {
    color: "#a8a7a7ff",
    WebkitTextFillColor: "#a8a7a7ff",
  },
  "& .MuiInputLabel-root": {
    color: "#00e5ff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1de9b6",
    },
    "&:hover fieldset": {
      borderColor: "#1de9b6",
    },
  },
};

const Company = () => {
  const { companyProfile, setCompanyProfile, setIsLoggedIn } =
    useContext(AppContext);
  const [form, setForm] = useState(companyProfile);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setCompanyProfile(form);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <>
      <Box
        sx={{
          py: "60px",
          background:
            "radial-gradient(circle at top, rgba(0,229,255,0.08), transparent 40%), #0b1220",
          minHeight: "87vh",
        }}
      >
        <Container maxWidth="sm">
          {/* Company Title */}
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            {form.name || "Company Name"}
          </Typography>

          {/* Profile Form */}
          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: glassBg,
              backdropFilter: "blur(16px)",
              borderRadius: "18px",
              border: `1px solid ${glassBorder}`,
              boxShadow: glowTeal,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontFamily: "monospace",
                fontStyle: "italic",
                mb: 2,
                color: "#fff",
              }}
            >
              Company Profile
            </Typography>

            <TextField
              fullWidth
              margin="normal"
              label="Company Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              margin="normal"
              label="GST Number"
              name="gst"
              value={form.gst}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              multiline
              rows={3}
              sx={textFieldStyle}
            />

            <Box sx={{ display: "flex", gap: "30px" }}>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  fontWeight: 600,
                  color: "#000",
                  background: "linear-gradient(90deg, #00e5ff, #1de9b6)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1de9b6, #00e5ff)",
                  },
                }}
                onClick={handleSave}
              >
                Save Profile
              </Button>

              <Button
                variant="contained"
                onClick={handleLogout}
                color="error"
                sx={{ mt: 3, fontWeight: 600 }}
              >
                Logout
              </Button>
            </Box>
          </Paper>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Company Profile Updated!
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};

export default Company;
