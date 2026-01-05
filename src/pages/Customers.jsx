// ==Cutomer.jsx==

import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  Alert,
  Snackbar,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";

const textFieldStyle = {
  "& .MuiInputBase-input": {
    color: "#a8a7a7ff",
    WebkitTextFillColor: "#a8a7a7ff",
    textTransform: "capitalize",
  },
  "& .MuiInputLabel-root": {
    color: "#00e5ff",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "#00e5ff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1de9b6",
    },
    "&:hover fieldset": {
      borderColor: "#1de9b6",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "#1de9b6",
    },
  },
};

const glassBg = "rgba(255,255,255,0.04)";
const glassBorder = "rgba(0,229,255,0.25)";
const glowCyan = "0 0 22px rgba(0,229,255,0.45)";
const glowTeal = "0 0 22px rgba(29,233,182,0.45)";

const Customers = () => {
  const { customers, setCustomers } = useContext(AppContext);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    organization: "",
    phone: "",
    gst: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const [form, setForm] = useState({
    name: "",
    organization: "",
    phone: "",
    gst: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addCustomer = () => {
    if (!form.name || !form.phone) {
      setSnackbar({
        open: true,
        message: "Name and Phone required",
        severity: "error",
      });
      return;
    }
    setCustomers([...customers, form]);
    setForm({ name: "", organization: "", phone: "", gst: "" });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditForm({ ...customers[index] });
  };

  const saveEdit = () => {
    const updatedCustomers = [...customers];
    updatedCustomers[editIndex] = editForm;
    setCustomers(updatedCustomers);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${customers[index].name}?`
    );
    if (confirmDelete) {
      const updatedCustomers = customers.filter((_, i) => i !== index);
      setCustomers(updatedCustomers);
    }
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
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom sx={{ color: "#fff", mb: 2 }}>
            Customers
          </Typography>

          {/* ---customer-table--- */}

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
              variant="h6"
              sx={{
                fontFamily: "monospace",
                fontStyle: "italic",
                color: "#fff",
              }}
            >
              Add Customer
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Organization"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={form.phone}
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

            <Button
              variant="contained"
              sx={{
                marginTop: 2,
                fontWeight: 600,
                color: "#000",
                background: "linear-gradient(90deg, #00e5ff, #1de9b6)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1de9b6, #00e5ff)",
                },
              }}
              onClick={addCustomer}
            >
              Add Customer
            </Button>
          </Paper>

          <Typography variant="h6" gutterBottom sx={{ color: "#fff", mb: 2 }}>
            Customer List
          </Typography>

          {/* ---customer-list-table--- */}

          <Box
            sx={{
              overflowX: "auto",
              background: glassBg,
              backdropFilter: "blur(16px)",
              borderRadius: "18px",
              border: `1px solid ${glassBorder}`,
              boxShadow: glowCyan,
            }}
          >
            <Table
              component={Paper}
              sx={{
                background: "transparent",
                color: "#fff",
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    background: "rgba(0,229,255,0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <TableCell sx={{ color: "#00e5ff" }}>Name</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Organization</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Phone</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>GST</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>EDIT</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((c, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ color: "#fff", textTransform: "capitalize" }}
                    >
                      {c.name}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", textTransform: "capitalize" }}
                    >
                      {c.organization}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>{c.phone}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{c.gst}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(index)}
                        sx={{
                          borderColor: "#00e5ff",
                          color: "#00e5ff",
                          boxShadow: "0 0 12px rgba(0,229,255,0.45)",
                        }}
                      >
                        EDIT
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(index)}
                        sx={{
                          borderColor: "#ff5252",
                          color: "#ff5252",
                          boxShadow: "0 0 12px rgba(255,82,82,0.45)",
                        }}
                      >
                        DELETE
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* ---edit-table--- */}

          {editIndex !== null && (
            <Paper
              sx={{ p: 2, mt: 3, backgroundColor: "#030709", color: "#fff" }}
            >
              <Typography variant="h6">Edit Customer</Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Organization"
                name="organization"
                value={editForm.organization}
                onChange={(e) =>
                  setEditForm({ ...editForm, organization: e.target.value })
                }
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone"
                name="phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                margin="normal"
                label="GST Number"
                name="gst"
                value={editForm.gst}
                onChange={(e) =>
                  setEditForm({ ...editForm, gst: e.target.value })
                }
                sx={textFieldStyle}
              />

              <Button
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
                onClick={saveEdit}
              >
                Save Changes
              </Button>
            </Paper>
          )}

          {/* ---snackbar--- */}

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};

export default Customers;
