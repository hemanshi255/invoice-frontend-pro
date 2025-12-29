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
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Customers
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Add Customer</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Organization"
          name="organization"
          value={form.organization}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="GST Number"
          name="gst"
          value={form.gst}
          onChange={handleChange}
        />

        <Button variant="contained" sx={{ marginTop: 2 }} onClick={addCustomer}>
          Add Customer
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Customer List
      </Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Organization</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>GST</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((c, index) => (
            <TableRow key={index}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.organization}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>{c.gst}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Customers;
