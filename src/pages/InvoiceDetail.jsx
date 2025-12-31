// ==InvoixeDetail.jsx===

import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Box,
} from "@mui/material";

const InvoiceDetail = () => {
  const { id } = useParams();
  const { invoices, products, customers } = useContext(AppContext);

  const invoice = invoices[id];

  if (!invoice) {
    return (
      <Container>
        <Typography variant="h6">Invoice not found</Typography>
      </Container>
    );
  }

  const customer = customers.find((c) => c.name === invoice.customer);

  const getProductDetails = (productName) => {
    return products.find((p) => p.name === productName);
  };

  const grandTotal = invoice.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <>
      <Box sx={{ py: "60px", background: "#2c5364", minHeight: "87vh" }}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
            Invoice Details
          </Typography>

          {/* Invoice Header */}
          <Paper
            sx={{
              padding: 2,
              marginBottom: 3,
              backgroundColor: "#030709",
              color: "#fff",
            }}
          >
            <Typography variant="subtitle1">
              <strong>Invoice No:</strong> {invoice.invoiceNumber}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Date:</strong> {invoice.date}
            </Typography>
          </Paper>

          {/* Customer Details */}
          <Paper
            sx={{
              padding: 2,
              marginBottom: 3,
              backgroundColor: "#030709",
              color: "#fff",
            }}
          >
            <Typography variant="h6">Customer Details</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Typography>Name: {customer?.name}</Typography>
            <Typography>Organization: {customer?.organization}</Typography>
            <Typography>Phone: {customer?.phone}</Typography>
            <Typography>GST: {customer?.gst}</Typography>
          </Paper>

          {/* Items Table */}
          <Paper sx={{ padding: 2, backgroundColor: "#030709", color: "#fff" }}>
            <Typography variant="h6" gutterBottom>
              Invoice Items
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#00e5ff" }}>Product</TableCell>
                    <TableCell sx={{ color: "#00e5ff" }}>CAS No</TableCell>
                    <TableCell sx={{ color: "#00e5ff" }}>Batch</TableCell>
                    <TableCell sx={{ color: "#00e5ff" }}>Qty</TableCell>
                    <TableCell sx={{ color: "#00e5ff" }}>Price (₹)</TableCell>
                    <TableCell sx={{ color: "#00e5ff" }}>Total (₹)</TableCell>
                    <TableCell sx={{ color: "#00e5ff" }}>Hazard</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {invoice.items.map((item, index) => {
                    const product = getProductDetails(item.product);

                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "#fff" }}>
                          {item.product}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {product?.casNumber || "-"}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {item.batch}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {item.quantity}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {item.price}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {item.total}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {product?.hazardLevel}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Paper>

          {/* Grand Total */}
          <Box sx={{ marginTop: 3, textAlign: "right" }}>
            <Typography variant="h6" sx={{ color: "#fff", textAlign: "left" }}>
              Grand Total: ₹{grandTotal}
            </Typography>
          </Box>

          {/* Safety Notes */}
          <Paper
            sx={{
              padding: 2,
              marginTop: 3,
              backgroundColor: "#030709",
              color: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Safety Notes
            </Typography>
            <Divider sx={{ marginY: 1 }} />
            {invoice.items.map((item, index) => {
              const product = getProductDetails(item.product);
              return (
                <Typography key={index}>
                  • <strong>{item.product}:</strong>{" "}
                  {product?.safetyNotes || "No special instructions"}
                </Typography>
              );
            })}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default InvoiceDetail;
