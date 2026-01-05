// ==Products.jsx===

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
  Alert,
  Snackbar,
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

const Products = () => {
  const { products, setProducts } = useContext(AppContext);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    casNumber: "",
    hazardLevel: "",
  });

  const [form, setForm] = useState({
    name: "",
    category: "",
    casNumber: "",
    price: "",
    tax: 18,
    hazardLevel: "",
    safetyNotes: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (!form.name || !form.price) {
      setSnackbar({
        open: true,
        message: "Product,Name and Price required",
        severity: "error",
      });
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

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${products[index].name}?`
    );
    if (confirmDelete) {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditForm({ ...products[index] });
  };

  const saveEdit = () => {
    const updatedProducts = [...products];
    updatedProducts[editIndex] = editForm;
    setProducts(updatedProducts);
    setEditIndex(null);
  };

  return (
    <>
      <Box
        sx={{
          py: "60px",
          background:
            "radial-gradient(circle at top, rgba(0,229,255,0.08), transparent 40%), #0b1220",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#fff",
              mb: 2,
            }}
          >
            Products
          </Typography>

          {/* ---product-form--- */}

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
              Add Product
            </Typography>

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
                disabled={form.category === "Equipment"}
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

          <Typography variant="h6" gutterBottom sx={{ color: "#fff", mb: 2 }}>
            Product List
          </Typography>

          {/* ---product-list-table--- */}

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
              sx={{
                background: "transparent",
                color: "#fff",
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    background: "rgba(0,229,255,0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <TableCell sx={{ color: "#00e5ff" }}>Name</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Category</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Price (₹)</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Tax (%)</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Hazard</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Edit</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((p, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ color: "#fff", textTransform: "capitalize" }}
                    >
                      {p.name}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>{p.category}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{p.price}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{p.tax}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {p.hazardLevel}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(index)}
                        sx={{
                          borderColor: "#00e5ff",
                          color: "#00e5ff",
                          boxShadow: "0 0 12px rgba(0,229,255,0.45)",
                        }}
                      >
                        EDIT
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(index)}
                        sx={{
                          borderColor: "#ff5252",
                          color: "#ff5252",
                          boxShadow: "0 0 12px rgba(255,82,82,0.45)",
                        }}
                      >
                        DELETE
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* ---edit-table--- */}

          {editIndex !== null && (
            <Paper
              sx={{
                p: 2,
                mb: 3,
                backgroundColor: "#030709",
                color: "#fff",
              }}
            >
              <Typography variant="h6">Edit Product</Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Product Name"
                name="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                sx={textFieldStyle}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Price (₹)"
                type="number"
                name="price"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: Number(e.target.value) })
                }
                sx={textFieldStyle}
              />

              <TextField
                fullWidth
                margin="normal"
                label="CAS Number"
                name="casNumber"
                value={editForm.casNumber}
                onChange={(e) =>
                  setEditForm({ ...editForm, casNumber: e.target.value })
                }
                sx={textFieldStyle}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Hazard Level"
                name="hazardLevel"
                value={editForm.hazardLevel}
                onChange={(e) =>
                  setEditForm({ ...editForm, hazardLevel: e.target.value })
                }
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
                onClick={saveEdit}
              >
                Save Changes
              </Button>
            </Paper>
          )}

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

export default Products;
