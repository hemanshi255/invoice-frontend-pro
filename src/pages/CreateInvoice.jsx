// ===createInvoice.jsx===

import { useState, useContext } from "react";
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
import { AppContext } from "../context/AppContext";
import { useHistory } from "react-router-dom";

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

const CreateInvoice = () => {
  const history = useHistory();

  const {
    customers,
    products,
    inventory,
    invoices,
    setInvoices,
    lastInvoiceNumber,
    setLastInvoiceNumber,
  } = useContext(AppContext);

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

    const inventoryItem = inventory.find(
      (i) => i.product === currentItem.product && i.batch === currentItem.batch
    );

    if (!inventoryItem) {
      alert("Selected batch not available in inventory");
      return;
    }

    if (currentItem.quantity > inventoryItem.quantity) {
      alert(
        `Insufficient stock. Available quantity: ${inventoryItem.quantity}`
      );
      return;
    }
    const total = productData.price * currentItem.quantity;

    setItems([
      ...items,
      {
        ...currentItem,
        price: productData.price,
        tax: productData.tax,
        total,
      },
    ]);

    setCurrentItem({ product: "", batch: "", quantity: "" });
  };

  const saveInvoice = () => {
    if (!customer || items.length === 0) {
      alert("Select customer and add items");
      return;
    }

    const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const gstAmount = items.reduce(
      (sum, i) => sum + (i.price * i.quantity * i.tax) / 100,
      0
    );
    const grandTotal = subTotal + gstAmount;

    const newInvoiceNumber = lastInvoiceNumber + 1;

    const newInvoice = {
      invoiceNumber: `INV-${newInvoiceNumber.toString().padStart(4, "0")}`,
      customer,
      date: new Date().toLocaleDateString(),
      items: items.map((i) => ({
        product: i.product,
        batch: i.batch,
        quantity: i.quantity,
        price: i.price,
        tax: i.tax || 0,
        total: i.total,
      })),
      subTotal,
      gstAmount,
      grandTotal,
    };

    const updatedInventory = [...inventory];
    items.forEach((item) => {
      const index = updatedInventory.findIndex(
        (i) => i.product === item.product && i.batch === item.batch
      );
      if (index !== -1) {
        updatedInventory[index].quantity -= item.quantity;
      }
    });

    setInvoices((prev) => [...prev, newInvoice]);
    setLastInvoiceNumber(newInvoiceNumber);
    history.push("/invoices");
  };

  const subTotal = items.reduce((sum, i) => sum + i.total, 0);
  const gstAmount = subTotal * 0.18;
  const grandTotal = subTotal + gstAmount;
  return (
    <>
      <Box sx={{ py: "60px", background: "#2c5364" }}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
            Create Invoice
          </Typography>

          {/* CUSTOMER */}
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
              <Select
                value={customer}
                label="Customer"
                onChange={(e) => setCustomer(e.target.value)}
              >
                {customers.map((c, i) => (
                  <MenuItem key={i} value={c.name}>
                    {c.organization} ({c.name})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          {/* ADD ITEM */}
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

          {/* ITEMS TABLE */}
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

          <Typography sx={{ marginTop: 2, color: "#fff" }}>
            Sub Total: ₹{subTotal.toFixed(2)}
          </Typography>

          <Typography sx={{ color: "#fff" }}>
            GST (18%): ₹{gstAmount.toFixed(2)}
          </Typography>

          <Typography variant="h6" sx={{ color: "#fff" }}>
            Grand Total: ₹{grandTotal.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 2 }}
            onClick={saveInvoice}
          >
            Save Invoice
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default CreateInvoice;
