// src/components/layout/DashboardLayout.jsx

import { Box, Toolbar } from "@mui/material";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard";

const SIDEBAR_WIDTH = 260;

const DashboardLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#061629,#0b2c45)",
      }}
    >
      {/* FULL WIDTH HEADER */}
      <Topbar />

      {/* CONTENT AREA */}
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: `${SIDEBAR_WIDTH}px`,
          }}
        >
          {/* Push content below AppBar */}
          <Toolbar />
          <Dashboard />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
