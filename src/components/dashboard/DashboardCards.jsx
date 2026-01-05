// src/components/dashboard/DashboardCards.jsx

import React, { useContext } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import dashboardTheme from "../../styles/dashboardTheme";

const cards = [
  {
    label: "Total Products",
    icon: <AiOutlineProduct />,
    valueKey: "products",
    glow: "#00e5ff",
  },
  {
    label: "Total Inventory",
    icon: <MdOutlineInventory />,
    valueKey: "inventory",
    glow: "#7CFF6B",
  },
  {
    label: "Total Customers",
    icon: <IoPersonAddOutline />,
    valueKey: "customers",
    glow: "#4DD0FF",
  },
  {
    label: "Total Invoices",
    icon: <LiaFileInvoiceDollarSolid />,
    valueKey: "invoices",
    glow: "#3DFFC3",
  },
];

const DashboardCards = () => {
  const { products, inventory, customers, invoices } = useContext(AppContext);

  const valueMap = {
    products: products.length,
    inventory: inventory.length,
    customers: customers.length,
    invoices: invoices.length,
  };

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={card.label}>
          <Paper
            sx={{
              position: "relative",
              p: 3,
              height: 130,

              background: `linear-gradient(
      135deg,
      ${card.glow}33,
      rgba(8,18,32,0.95)
    )`,

              backdropFilter: "blur(16px)",
              borderRadius: "18px",

              border: `1px solid ${card.glow}55`,

              boxShadow: `
      inset 0 -18px 35px ${card.glow}66,
      0 0 40px ${card.glow}55
    `,

              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              transition: "0.35s ease",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: `
        inset 0 -22px 40px ${card.glow}88,
        0 0 55px ${card.glow}
      `,
              },
            }}
          >
            <Box
              sx={{
                fontSize: 30,
                color: "#eaffff",
                filter: `drop-shadow(0 0 8px ${card.glow})`,
              }}
            >
              {card.icon}
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#ffffff",
                textShadow: "0 0 10px rgba(0,229,255,0.35)",
              }}
            >
              {valueMap[card.valueKey]}
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.3px",
              }}
            >
              {card.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
