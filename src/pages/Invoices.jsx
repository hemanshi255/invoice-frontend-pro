// ==src/pages/Invoices.jsx===

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

const glassBg = "rgba(255,255,255,0.04)";
const glassBorder = "rgba(0,229,255,0.25)";
const glowCyan = "0 0 22px rgba(0,229,255,0.45)";
const glowTeal = "0 0 22px rgba(29,233,182,0.45)";

const Invoices = () => {
  const { invoices } = useContext(AppContext);
  const history = useHistory();

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
          <Typography variant="h5" gutterBottom sx={{ mb: 2, color: "#fff" }}>
            Invoice History
          </Typography>

          {/* ---invoice-history-table--- */}

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
                  <TableCell sx={{ color: "#00e5ff" }}>Inv No.</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Customer</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Date</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Items</TableCell>
                  <TableCell sx={{ color: "#00e5ff" }}>Total (₹)</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoices.map((inv, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => history.push(`/invoices/${index}`)}
                  >
                    <TableCell sx={{ color: "#fff" }}>
                      {inv.invoiceNumber}
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", textTransform: "capitalize" }}
                    >
                      {inv.customer}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>{inv.date}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {inv.items.length}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {inv.items.reduce((sum, i) => sum + i.total, 0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Invoices;
