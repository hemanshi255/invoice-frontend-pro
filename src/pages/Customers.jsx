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
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";

const textFieldStyle = {
  "& .MuiInputBase-input": {
    color: "#a8a7a7ff",
    WebkitTextFillColor: "#a8a7a7ff",
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

const Customers = () => {
  const { customers, setCustomers } = useContext(AppContext);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    organization: "",
    phone: "",
    gst: "",
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
      alert("Name and phone are required");
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
      <Box sx={{ py: "60px", background: "#2c5364", minHeight: "87vh" }}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
            Customers
          </Typography>

          <Paper
            sx={{
              padding: 2,
              marginBottom: 3,
              backgroundColor: "#030709",
              color: "#fff",
            }}
          >
            <Typography variant="h6">Add Customer</Typography>
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

          <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
            Customer List
          </Typography>
          <Table
            component={Paper}
            sx={{ backgroundColor: "#030709", color: "#fff" }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#00e5ff" }}>Name</TableCell>
                <TableCell sx={{ color: "#00e5ff" }}>Organization</TableCell>
                <TableCell sx={{ color: "#00e5ff" }}>Phone</TableCell>
                <TableCell sx={{ color: "#00e5ff" }}>GST</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((c, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#fff" }}>{c.name}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{c.organization}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{c.phone}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{c.gst}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(index)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
        </Container>
      </Box>
    </>
  );
};

export default Customers;
