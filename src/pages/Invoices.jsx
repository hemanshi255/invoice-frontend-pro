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

function Invoices() {
  const { invoices } = useContext(AppContext);
  const history = useHistory();

  return (
    <Container maxWidth="md">
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#fff", marginTop: "60px" }}
      >
        Invoice History
      </Typography>

      <Table
        component={Paper}
        sx={{ backgroundColor: "#030709", color: "#fff" }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#00e5ff" }}>#</TableCell>
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
              <TableCell sx={{ color: "#fff" }}>{index + 1}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{inv.customer}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{inv.date}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{inv.items.length}</TableCell>
              <TableCell sx={{ color: "#fff" }}>
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
