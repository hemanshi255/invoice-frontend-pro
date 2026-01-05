// src/pages/Dashboard.jsx

import React, { useState } from "react";
import { Box } from "@mui/material";
import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardCards from "../components/dashboard/DashboardCards";
import Products from "./Products";
import Inventory from "./Inventory";
import Customers from "./Customers";
import CreateInvoice from "./CreateInvoice";
import Invoices from "./Invoices";
import dashboardTheme from "../styles/dashboardTheme";

const TOPBAR_HEIGHT = 72;

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: dashboardTheme.colors.background,
      }}
    >
      {/* SIDEBAR */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          pt: `${TOPBAR_HEIGHT}px`,
        }}
      >
        {/* TOPBAR */}
        <Topbar onMenuClick={() => setMobileOpen(true)} />

        {/* PAGE CONTENT */}
        <Box sx={{ p: { xs: 4, sm: 4, md: 4 } }}>
          {activePage === "dashboard" && <DashboardCards />}
          {activePage === "products" && <Products />}
          {activePage === "inventory" && <Inventory />}
          {activePage === "customers" && <Customers />}
          {activePage === "create-invoice" && <CreateInvoice />}
          {activePage === "invoices" && <Invoices />}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
