// ==Invoices.jsx===

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

const Invoices = () => {
  const { invoices } = useContext(AppContext);
  const history = useHistory();

  return (
    <>
      <Box sx={{ py: "60px", background: "#2c5364", minHeight: "87vh" }}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom sx={{ mb: 2, color: "#fff" }}>
            Invoice History
          </Typography>

          <Box sx={{ overflow: "auto", boxShadow: "0px 0px 10px 5px #1de9b6" }}>
            <Table
              component={Paper}
              sx={{ backgroundColor: "#030709", color: "#fff" }}
            >
              <TableHead>
                <TableRow>
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
                    <TableCell sx={{ color: "#fff" }}>{inv.customer}</TableCell>
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
