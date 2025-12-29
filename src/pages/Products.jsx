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
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function Products() {
  const { products, setProducts } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "",
    category: "Chemical",
    casNumber: "",
    price: "",
    tax: 18,
    hazardLevel: "Low",
    safetyNotes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (!form.name || !form.price) {
      alert("Product name and price are required");
      return;
    }
    const newProduct = {
      ...form,
      price: Number(form.price),
      tax: Number(form.tax),
    };
    setProducts([...products, newProduct]);
    setForm({
      name: "",
      category: "Chemical",
      casNumber: "",
      price: "",
      tax: 18,
      hazardLevel: "Low",
      safetyNotes: "",
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Add Product</Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Select
          fullWidth
          name="category"
          value={form.category}
          onChange={handleChange}
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="Chemical">Chemical</MenuItem>
          <MenuItem value="Reagent">Reagent</MenuItem>
          <MenuItem value="Equipment">Equipment</MenuItem>
        </Select>

        <TextField
          fullWidth
          margin="normal"
          label="CAS Number"
          name="casNumber"
          value={form.casNumber}
          onChange={handleChange}
          disabled={form.category === "Equipment"}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Price (₹)"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Tax (%)"
          type="number"
          name="tax"
          value={form.tax}
          onChange={handleChange}
        />

        <Select
          fullWidth
          name="hazardLevel"
          value={form.hazardLevel}
          onChange={handleChange}
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>

        <TextField
          fullWidth
          margin="normal"
          label="Safety Notes"
          name="safetyNotes"
          multiline
          rows={3}
          value={form.safetyNotes}
          onChange={handleChange}
        />

        <Button variant="contained" sx={{ marginTop: 2 }} onClick={addProduct}>
          Add Product
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Product List
      </Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price (₹)</TableCell>
            <TableCell>Tax (%)</TableCell>
            <TableCell>Hazard</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p, index) => (
            <TableRow key={index}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.tax}</TableCell>
              <TableCell>{p.hazardLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Products;
