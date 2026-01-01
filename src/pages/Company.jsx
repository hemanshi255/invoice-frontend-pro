// ==company.jsx==

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
import { AppContext } from "../context/AppContext";

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
  const { companyProfile, setCompanyProfile } = useContext(AppContext);
  const [form, setForm] = useState(companyProfile);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  return (
    <>
      <Box sx={{ py: "60px", background: "#2c5364", minHeight: "87vh" }}>
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
              p: 4,
              backgroundColor: "#030709",
              color: "#fff",
              boxShadow: "0px 0px 15px 5px #1de9b6",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontFamily: "monospace", fontStyle: "italic", mb: 2 }}
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

            <Button
              variant="contained"
              fullWidth
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
              Company profile updated!
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};

export default Company;
