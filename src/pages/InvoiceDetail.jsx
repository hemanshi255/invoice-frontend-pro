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
import Stack from "@mui/material/Stack";

const glassBg = "rgba(255,255,255,0.04)";
const glassBorder = "rgba(0,229,255,0.25)";
const glowCyan = "0 0 22px rgba(0,229,255,0.45)";
const glowTeal = "0 0 22px rgba(29,233,182,0.45)";

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
            Invoice Details
          </Typography>

          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: glassBg,
              backdropFilter: "blur(16px)",
              borderRadius: "18px",
              border: `1px solid ${glassBorder}`,
              boxShadow: glowTeal,
              color: "#fff",
            }}
          >
            <Stack spacing={3}>
              {/*--- Invoice Header [inv-No. & Date]---*/}

              <Box>
                <Typography variant="subtitle1">
                  <strong>Invoice No:</strong> {invoice.invoiceNumber}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Date:</strong> {invoice.date}
                </Typography>
              </Box>

              {/*--- Customer Details ---*/}
              <Box sx={{ marginTop: "0px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "monospace",
                    fontStyle: "italic",
                    color: "#1de9b6",
                  }}
                >
                  Customer Details
                </Typography>
                <Divider sx={{ marginY: 1, backgroundColor: "#fff" }} />
                <Typography
                  sx={{ mb: 0.5, mt: 1.5, textTransform: "capitalize" }}
                >
                  <strong>Name:</strong> {customer?.name}
                </Typography>
                <Typography sx={{ mb: 0.5, textTransform: "capitalize" }}>
                  <strong>Organization:</strong> {customer?.organization}
                </Typography>
                <Typography sx={{ mb: 0.5 }}>
                  <strong>Phone:</strong> {customer?.phone}
                </Typography>
                <Typography sx={{ mb: 0.5 }}>
                  <strong>GST:</strong> {customer?.gst}
                </Typography>
              </Box>

              {/* ---Item-table--- */}

              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "monospace",
                    fontStyle: "italic",
                    color: "#1de9b6",
                  }}
                >
                  Invoice Items
                </Typography>
                <Divider sx={{ marginY: 1, backgroundColor: "#fff" }} />

                <Box sx={{ overflowX: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: "#00e5ff" }}>Product</TableCell>
                        <TableCell sx={{ color: "#00e5ff" }}>CAS No</TableCell>
                        <TableCell sx={{ color: "#00e5ff" }}>Batch</TableCell>
                        <TableCell sx={{ color: "#00e5ff" }}>Qty</TableCell>
                        <TableCell sx={{ color: "#00e5ff" }}>
                          Price (₹)
                        </TableCell>
                        <TableCell sx={{ color: "#00e5ff" }}>
                          Total (₹)
                        </TableCell>
                        <TableCell sx={{ color: "#00e5ff" }}>Hazard</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {invoice.items.map((item, index) => {
                        const product = getProductDetails(item.product);

                        return (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                color: "#fff",
                                textTransform: "capitalize",
                              }}
                            >
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
              </Box>

              {/* ---Grand Total--- */}
              <Box>
                <Box sx={{ marginTop: 3, textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", textAlign: "left" }}
                  >
                    <strong style={{ color: "#1de9b6" }}> Grand Total: </strong>
                    ₹{grandTotal}
                  </Typography>
                </Box>
              </Box>

              {/* ---Safety Notes--- */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1de9b6",
                    fontStyle: "italic",
                    fontFamily: "monospace",
                  }}
                >
                  Safety Notes
                </Typography>
                <Divider sx={{ marginY: 1, backgroundColor: "#fff" }} />
                {invoice.items.map((item, index) => {
                  const product = getProductDetails(item.product);
                  return (
                    <Typography key={index} sx={{ mt: 1.5 }}>
                      •{" "}
                      <strong style={{ textTransform: "capitalize" }}>
                        {item.product}:
                      </strong>{" "}
                      {product?.safetyNotes || "No special instructions"}
                    </Typography>
                  );
                })}
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default InvoiceDetail;
