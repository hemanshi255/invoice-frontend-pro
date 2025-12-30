// /src/pages/Dashboard.jsx
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Container, Typography, Paper, Grid, Box } from "@mui/material";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const { products, inventory, customers, invoices } = useContext(AppContext);
  const history = useHistory();

  const cardStyle = {
    padding: 3,
    textAlign: "center",
    background: "#030709",
    color: "#fff",
    cursor: "pointer",
    "&:hover": { background: "#1de9b6", color: "#000" },
  };

  return (
    <Box sx={{ py: 8, background: "#2c5364", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
          Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={cardStyle} onClick={() => history.push("/products")}>
              <Typography variant="h6">Products</Typography>
              <Typography variant="h4">{products.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={cardStyle} onClick={() => history.push("/inventory")}>
              <Typography variant="h6">Inventory</Typography>
              <Typography variant="h4">{inventory.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={cardStyle} onClick={() => history.push("/customers")}>
              <Typography variant="h6">Customers</Typography>
              <Typography variant="h4">{customers.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={cardStyle} onClick={() => history.push("/invoices")}>
              <Typography variant="h6">Invoices</Typography>
              <Typography variant="h4">{invoices.length}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
