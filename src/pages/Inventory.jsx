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
  const { inventory, setInventory, products } = useContext(AppContext);
  const [form, setForm] = useState({
    product: "",
    batch: "",
    expiry: "",
    quantity: "",
    location: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addInventory = () => {
    if (!form.product || !form.batch || !form.quantity) {
      alert("Product, batch and quantity required");
      return;
    }
    setInventory([...inventory, { ...form, quantity: Number(form.quantity) }]);
    setForm({ product: "", batch: "", expiry: "", quantity: "", location: "" });
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Inventory
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Add Inventory</Typography>

        <Select
          fullWidth
          margin="normal"
          name="product"
          value={form.product}
          onChange={handleChange}
        >
          {products.map((p, i) => (
            <MenuItem key={i} value={p.name}>
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

        <Button variant="contained" onClick={addInventory}>
          Add Stock
        </Button>
      </Paper>

      <Typography variant="h6">Inventory List</Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Qty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((i, index) => (
            <TableRow key={index}>
              <TableCell>{i.product}</TableCell>
              <TableCell>{i.batch}</TableCell>
              <TableCell>{i.expiry}</TableCell>
              <TableCell>{i.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Inventory;
