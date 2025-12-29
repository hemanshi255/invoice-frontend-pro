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
    color: "#666",
    WebkitTextFillColor: "#666",
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

function Customers() {
  const { customers, setCustomers } = useContext(AppContext);
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

  return (
    <Box sx={{ py: "60px", background: "#2c5364" }}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}

export default Customers;
