import { useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
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

function CreateInvoice() {
  const customers = ["ABC Labs", "XYZ Pharma"];
  const products = [
    { name: "Hydrochloric Acid", price: 800 },
    { name: "Sodium Hydroxide", price: 600 },
  ];

  const inventory = [
    {
      product: "Hydrochloric Acid",
      batch: "HCL-2025-A",
      expiry: "2027-06-30",
      quantity: 50,
    },
  ];

  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    product: "",
    batch: "",
    quantity: "",
  });

  const handleItemChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (!currentItem.product || !currentItem.quantity) {
      alert("Product and quantity required");
      return;
    }

    const productData = products.find((p) => p.name === currentItem.product);

    const total = productData.price * currentItem.quantity;

    setItems([
      ...items,
      {
        ...currentItem,
        price: productData.price,
        total,
      },
    ]);

    setCurrentItem({
      product: "",
      batch: "",
      quantity: "",
    });
  };

  const grandTotal = items.reduce((sum, i) => sum + i.total, 0);

  return (
    <Box sx={{ py: "60px", background: "#2c5364" }}>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
          Create Invoice
        </Typography>

        <Paper
          sx={{
            padding: 2,
            marginBottom: 3,
            backgroundColor: "#030709",
            color: "#fff",
          }}
        >
          <Typography variant="h6">Customer</Typography>

          <FormControl fullWidth sx={{ mt: 2, ...textFieldStyle }}>
            <InputLabel>Customer</InputLabel>
            <Select name="customer" value={customer} label="Customer">
              {customers.map((c, i) => (
                <MenuItem key={i} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <Paper
          sx={{
            padding: 2,
            marginBottom: 3,
            backgroundColor: "#030709",
            color: "#fff",
          }}
        >
          <Typography variant="h6">Add Item</Typography>

          <FormControl fullWidth sx={{ mt: 2, ...textFieldStyle }}>
            <InputLabel>Product</InputLabel>
            <Select
              name="product"
              value={currentItem.product}
              onChange={handleItemChange}
              label="Product"
            >
              {products.map((p, i) => (
                <MenuItem key={i} value={p.name}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2, ...textFieldStyle }}>
            <InputLabel>Batch</InputLabel>
            <Select
              name="batch"
              value={currentItem.batch}
              onChange={handleItemChange}
              label="Batch"
            >
              {inventory
                .filter((i) => i.product === currentItem.product)
                .map((i, index) => (
                  <MenuItem key={index} value={i.batch}>
                    {i.batch} (Exp: {i.expiry})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            type="number"
            name="quantity"
            value={currentItem.quantity}
            onChange={handleItemChange}
            sx={textFieldStyle}
          />

          <Button
            variant="contained"
            onClick={addItem}
            sx={{
              marginTop: 2,
              fontWeight: 600,
              color: "#000",
              background: "linear-gradient(90deg, #00e5ff, #1de9b6)",
              "&:hover": {
                background: "linear-gradient(90deg, #1de9b6, #00e5ff)",
              },
            }}
          >
            Add Item
          </Button>
        </Paper>

        <Typography variant="h6" sx={{ color: "#fff" }}>
          Invoice Items
        </Typography>

        <Table
          component={Paper}
          sx={{ backgroundColor: "#030709", color: "#fff" }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#00e5ff" }}>Product</TableCell>
              <TableCell sx={{ color: "#00e5ff" }}>Batch</TableCell>
              <TableCell sx={{ color: "#00e5ff" }}>Qty</TableCell>
              <TableCell sx={{ color: "#00e5ff" }}>Price</TableCell>
              <TableCell sx={{ color: "#00e5ff" }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((i, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#fff" }}>{i.product}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{i.batch}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{i.quantity}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{i.price}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{i.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography variant="h6" sx={{ marginTop: 2, color: "#fff" }}>
          Grand Total: ₹{grandTotal}
        </Typography>

        <Button variant="contained" color="success" sx={{ marginTop: 2 }}>
          Save Invoice
        </Button>
      </Container>
    </Box>
  );
}

export default CreateInvoice;
