// src/components/layout/Sidebar.jsx

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineInventory, MdChecklist } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";

import dashboardTheme from "../../styles/dashboardTheme";

const drawerWidth = 260;

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: <FaHome /> },
  { key: "products", label: "Products", icon: <AiOutlineProduct /> },
  { key: "inventory", label: "Inventory", icon: <MdOutlineInventory /> },
  { key: "customers", label: "Customers", icon: <IoPersonAddOutline /> },
  {
    key: "create-invoice",
    label: "Create Invoice",
    icon: <LiaFileInvoiceDollarSolid />,
  },
  { key: "invoices", label: "Invoices", icon: <MdChecklist /> },
];

const Sidebar = ({ mobileOpen, onClose, activePage, setActivePage }) => {
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        width: drawerWidth,
        background: dashboardTheme.colors.sidebarGradient,
        backdropFilter: dashboardTheme.blur.glass,
        color: dashboardTheme.colors.textPrimary,
      }}
    >
      <Toolbar />

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = activePage === item.key;

          return (
            <ListItem key={item.key} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => setActivePage(item.key)}
                sx={{
                  borderRadius: "16px",
                  background: isActive
                    ? dashboardTheme.colors.glassBg
                    : "transparent",

                  boxShadow: isActive ? dashboardTheme.glow.active : "none",

                  border: isActive
                    ? `1px solid ${dashboardTheme.colors.glassBorder}`
                    : "1px solid transparent",
                  transition: "0.3s",
                  "&:hover": {
                    background: dashboardTheme.colors.hoverItem,
                  },
                  "&::before": isActive
                    ? {
                        content: '""',
                        position: "absolute",
                        left: "6px",
                        top: "12%",
                        height: "76%",
                        width: "4px",
                        borderRadius: "8px",
                        background: "rgba(0,229,255,0.85)",
                        filter: "blur(1.5px)",
                        boxShadow: `
          0 0 10px rgba(0,229,255,0.8),
          0 0 18px rgba(0,229,255,0.6)
        `,
                      }
                    : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    fontSize: 22,
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* MOBILE */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          width: 260,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "96px",
            height: "calc(100vh - 96px)",
            background: dashboardTheme.colors.glassBg,
            backdropFilter: dashboardTheme.blur.glass,
            borderRight: `1px solid ${dashboardTheme.colors.glassBorder}`,
            boxShadow: dashboardTheme.glow.card,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "96px",
            height: "calc(100vh - 96px)",
            background: dashboardTheme.colors.glassBg,
            backdropFilter: dashboardTheme.blur.glass,
            borderRight: `1px solid ${dashboardTheme.colors.glassBorder}`,
            boxShadow: dashboardTheme.glow.card,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
