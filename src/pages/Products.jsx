import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  Container,
  TextField,
  Select,
  FormControl,
  InputLabel,
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

function Products() {
  const { products, setProducts } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "",
    category: "",
    casNumber: "",
    price: "",
    tax: 18,
    hazardLevel: "",
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
      category: "",
      casNumber: "",
      price: "",
      tax: 18,
      hazardLevel: "",
      safetyNotes: "",
    });
  };

  return (
    <Box sx={{ py: "60px", background: "#2c5364" }}>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
          Products
        </Typography>

        <Paper
          sx={{
            padding: 2,
            marginBottom: 3,
            backgroundColor: "#030709",
            color: "#fff",
          }}
        >
          <Typography variant="h6">Add Product</Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <FormControl fullWidth sx={{ mt: 2, ...textFieldStyle }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={form.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="Chemical">Chemical</MenuItem>
              <MenuItem value="Reagent">Reagent</MenuItem>
              <MenuItem value="Equipment">Equipment</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="CAS Number"
            name="casNumber"
            value={form.casNumber}
            onChange={handleChange}
            disabled={form.category === "Equipment"}
            sx={textFieldStyle}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Price (₹)"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Tax (%)"
            type="number"
            name="tax"
            value={form.tax}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <FormControl fullWidth sx={{ mt: 2, ...textFieldStyle }}>
            <InputLabel>Hazard Level</InputLabel>
            <Select
              name="hazardLevel"
              value={form.hazardLevel}
              onChange={handleChange}
              label="Hazard Level"
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Safety Notes"
            name="safetyNotes"
            multiline
            rows={3}
            value={form.safetyNotes}
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
            onClick={addProduct}
          >
            Add Product
          </Button>
        </Paper>

        <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
          Product List
        </Typography>
        <Table
          component={Paper}
          sx={{ backgroundColor: "#030709", color: "#fff" }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#00e5ff" }}>Name</TableCell>
              <TableCell sx={{ color: "#00e5ff" }}>Category</TableCell>
              <TableCell sx={{ color: "#00e5ff" }}>Price (₹)</TableCell>
              <TableCell sx={{ color: "#00e5ff" }}>Tax (%)</TableCell>
              <TableCell sx={{ color: "#00e5ff" }}>Hazard</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#fff" }}>{p.name}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.category}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.price}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.tax}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.hazardLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}

export default Products;
