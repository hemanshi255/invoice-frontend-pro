import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

function Inventory() {
  const { products, inventory, setInventory } = useContext(AppContext);

  const [form, setForm] = useState({
    product: "",
    batch: "",
    expiry: "",
    quantity: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addInventory = () => {
    if (!form.product || !form.batch || !form.quantity) {
      alert("Product, batch, and quantity are required");
      return;
    }

    setInventory([
      ...inventory,
      {
        ...form,
        quantity: Number(form.quantity),
      },
    ]);

    // Reset form after adding
    setForm({
      product: "",
      batch: "",
      expiry: "",
      quantity: "",
      location: "",
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Inventory
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Inventory
        </Typography>

        {/* Product Dropdown */}
        <Select
          fullWidth
          margin="normal"
          name="product"
          value={form.product}
          onChange={handleChange}
        >
          <MenuItem value="">Select Product</MenuItem>
          {products.map((p, index) => (
            <MenuItem key={index} value={p.name}>
              {p.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          margin="normal"
          label="Batch Number"
          name="batch"
          value={form.batch}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Expiry Date"
          InputLabelProps={{ shrink: true }}
          name="expiry"
          value={form.expiry}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Quantity"
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Storage Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={addInventory}
        >
          Add Stock
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Inventory List
      </Typography>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((i, index) => (
            <TableRow key={index}>
              <TableCell>{i.product}</TableCell>
              <TableCell>{i.batch}</TableCell>
              <TableCell>{i.expiry}</TableCell>
              <TableCell>{i.quantity}</TableCell>
              <TableCell>{i.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Inventory;
