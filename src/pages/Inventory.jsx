// ==src/pages/Inventory.jsx===

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
  TableHead,
  TableRow,
  TableCell,
  Alert,
  Snackbar,
  TableBody,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";

const textFieldStyle = {
  "& .MuiInputBase-input": {
    color: "#a8a7a7ff",
    WebkitTextFillColor: "#a8a7a7ff",
    textTransform: "capitalize",
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

const glassBg = "rgba(255,255,255,0.04)";
const glassBorder = "rgba(0,229,255,0.25)";
const glowCyan = "0 0 22px rgba(0,229,255,0.45)";
const glowTeal = "0 0 22px rgba(29,233,182,0.45)";

const Inventory = () => {
  const { inventory, setInventory, products } = useContext(AppContext);
  const [form, setForm] = useState({
    product: "",
    batch: "",
    expiry: "",
    quantity: "",
    location: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addInventory = () => {
    if (!form.product || !form.batch || !form.quantity) {
      setSnackbar({
        open: true,
        message: "Product,Batch and Quantity required",
        severity: "error",
      });
      return;
    }
    setInventory([...inventory, { ...form, quantity: Number(form.quantity) }]);
    setForm({ product: "", batch: "", expiry: "", quantity: "", location: "" });
  };

  return (
    <>
      <Box
        sx={{
          py: "60px",
          background:
            "radial-gradient(circle at top, rgba(0,229,255,0.08), transparent 40%), #0b1220",
          minHeight: "87vh",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom sx={{ color: "#fff", mb: 2 }}>
            Inventory
          </Typography>

          {/* ---Inventory-form--- */}

          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: glassBg,
              backdropFilter: "blur(16px)",
              borderRadius: "18px",
              border: `1px solid ${glassBorder}`,
              boxShadow: glowTeal,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "monospace",
                fontStyle: "italic",
                color: "#fff",
              }}
            >
              Add Inventory
            </Typography>

            <FormControl fullWidth sx={{ mt: 2, ...textFieldStyle }}>
              <InputLabel>product</InputLabel>
              <Select
                name="product"
                value={form.product}
                onChange={handleChange}
                label="product"
              >
                {products.map((p, i) => (
                  <MenuItem key={i} value={p.name}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Batch Number"
              name="batch"
              value={form.batch}
              onChange={handleChange}
              sx={textFieldStyle}
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
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Quantity"
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Storage Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              sx={textFieldStyle}
            />

            <Button
              variant="contained"
              onClick={addInventory}
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
              Add Stock
            </Button>
          </Paper>

          <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
            Inventory List
          </Typography>

          {/* ---Inventory-list-table--- */}

          <Box
            sx={{
              overflowX: "auto",
              background: glassBg,
              backdropFilter: "blur(16px)",
              borderRadius: "18px",
              border: `1px solid ${glassBorder}`,
              boxShadow: glowCyan,
            }}
          >
            <Table
              component={Paper}
              sx={{ background: "transparent", color: "#fff" }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    background: "rgba(0,229,255,0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <TableCell sx={{ color: "#00e5ff" }}>Product</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Batch</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Expiry</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Qty</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map((i, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ color: "#fff", textTransform: "capitalize" }}
                    >
                      {i.product}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>{i.batch}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{i.expiry}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{i.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* ---snackbar--- */}

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};

export default Inventory;
