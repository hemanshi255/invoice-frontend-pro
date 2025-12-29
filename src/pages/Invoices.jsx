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
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function Invoices() {
  const { invoices } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Invoice History
      </Typography>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total (₹)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {invoices.map((inv, index) => (
            <TableRow
              key={index}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/invoices/${index}`)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell>{inv.date}</TableCell>
              <TableCell>{inv.items.length}</TableCell>
              <TableCell>
                {inv.items.reduce((sum, i) => sum + i.total, 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Invoices;
