import { useState } from "react";
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

function CreateInvoice() {
  // MOCK DATA (later from backend)
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
    <Container>
      <Typography variant="h5" gutterBottom>
        Create Invoice
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Customer</Typography>

        <Select
          fullWidth
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        >
          {customers.map((c, i) => (
            <MenuItem key={i} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Add Item</Typography>

        <Select
          fullWidth
          margin="normal"
          name="product"
          value={currentItem.product}
          onChange={handleItemChange}
        >
          {products.map((p, i) => (
            <MenuItem key={i} value={p.name}>
              {p.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          fullWidth
          margin="normal"
          name="batch"
          value={currentItem.batch}
          onChange={handleItemChange}
        >
          {inventory
            .filter((i) => i.product === currentItem.product)
            .map((i, index) => (
              <MenuItem key={index} value={i.batch}>
                {i.batch} (Exp: {i.expiry})
              </MenuItem>
            ))}
        </Select>

        <TextField
          fullWidth
          margin="normal"
          label="Quantity"
          type="number"
          name="quantity"
          value={currentItem.quantity}
          onChange={handleItemChange}
        />

        <Button variant="contained" onClick={addItem}>
          Add Item
        </Button>
      </Paper>

      <Typography variant="h6">Invoice Items</Typography>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((i, index) => (
            <TableRow key={index}>
              <TableCell>{i.product}</TableCell>
              <TableCell>{i.batch}</TableCell>
              <TableCell>{i.quantity}</TableCell>
              <TableCell>{i.price}</TableCell>
              <TableCell>{i.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Grand Total: ₹{grandTotal}
      </Typography>

      <Button variant="contained" color="success" sx={{ marginTop: 2 }}>
        Save Invoice
      </Button>
    </Container>
  );
}

export default CreateInvoice;
