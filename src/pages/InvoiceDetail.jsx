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

function InvoiceDetail() {
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
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Invoice Details
      </Typography>

      {/* Invoice Header */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="subtitle1">
          <strong>Invoice No:</strong> INV-{Number(id) + 1}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Date:</strong> {invoice.date}
        </Typography>
      </Paper>

      {/* Customer Details */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Customer Details</Typography>
        <Divider sx={{ marginY: 1 }} />
        <Typography>Name: {customer?.name}</Typography>
        <Typography>Organization: {customer?.organization}</Typography>
        <Typography>Phone: {customer?.phone}</Typography>
        <Typography>GST: {customer?.gst}</Typography>
      </Paper>

      {/* Items Table */}
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Invoice Items
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>CAS No</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price (₹)</TableCell>
              <TableCell>Total (₹)</TableCell>
              <TableCell>Hazard</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoice.items.map((item, index) => {
              const product = getProductDetails(item.product);

              return (
                <TableRow key={index}>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{product?.casNumber || "-"}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell>{product?.hazardLevel}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      {/* Grand Total */}
      <Box sx={{ marginTop: 3, textAlign: "right" }}>
        <Typography variant="h6">Grand Total: ₹{grandTotal}</Typography>
      </Box>

      {/* Safety Notes */}
      <Paper sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant="h6">Safety Notes</Typography>
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
  );
}

export default InvoiceDetail;
