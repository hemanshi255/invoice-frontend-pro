// ==DashBoard.jsx==

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MdOutlineInventory } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { IoPersonAddOutline } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { Paper, Grid } from "@mui/material";
import Products from "./Products";
import Inventory from "./Inventory";
import Customers from "./Customers";
import CreateInvoice from "./CreateInvoice";
import { Button } from "@mui/material";
import Invoices from "./Invoices";
import { MdChecklist } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const COLORS = {
  bg: "#050a0e",
  sidebar: "#050a0e",
  header: "rgba(5,10,14,0.85)",
  panel: "#0b141b",
  card: "#060b10",
  neon: "#21f3c6",
  neonSoft: "rgba(33,243,198,0.35)",
  text: "#e8fefe",
  muted: "#7aa5a0",
};

const drawerWidth = 240;

const Dashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [activePage, setActivePage] = React.useState("products");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { products, inventory, customers, invoices, setIsLoggedIn } =
    useContext(AppContext);
  const history = useHistory();

  const cardStyle = {
    p: 3,
    textAlign: "center",
    background: COLORS.card,
    color: COLORS.text,
    borderRadius: "18px",
    border: `1px solid ${COLORS.neonSoft}`,
    boxShadow: `0 0 25px ${COLORS.neonSoft}`,
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    history.push("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box
      sx={{
        minHeight: "100%",
        background: `linear-gradient(180deg, ${COLORS.sidebar}, #020608)`,
        px: 1,
      }}
    >
      <Toolbar />

      <List>
        {[
          { key: "products", label: "Products", icon: <AiOutlineProduct /> },
          {
            key: "inventory",
            label: "Inventory",
            icon: <MdOutlineInventory />,
          },
          { key: "customers", label: "Customer", icon: <IoPersonAddOutline /> },
          {
            key: "create-invoice",
            label: "Create Invoice",
            icon: <LiaFileInvoiceDollarSolid />,
          },
          { key: "invoices", label: "Invoices", icon: <MdChecklist /> },
        ].map((item) => (
          <ListItem
            key={item.key}
            disablePadding
            onClick={() => setActivePage(item.key)}
            sx={{
              mb: 1,
              borderRadius: "14px",
              background:
                activePage === item.key
                  ? `linear-gradient(90deg, ${COLORS.neonSoft}, transparent)`
                  : "transparent",
              border:
                activePage === item.key
                  ? `1px solid ${COLORS.neon}`
                  : "1px solid transparent",
            }}
          >
            <ListItemButton sx={{ borderRadius: "14px" }}>
              <ListItemIcon sx={{ color: COLORS.neon, fontSize: "22px" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  color: COLORS.text,
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* --header--- */}

        <AppBar
          position="fixed"
          sx={{
            background: COLORS.header,
            backdropFilter: "blur(10px)",
            borderBottom: `1px solid ${COLORS.neonSoft}`,
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

            {/* ---Account & login--- */}

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: "#030709",
                    color: "#ff5252",
                    "&:hover": {
                      background: "#242525ff",
                    },
                  }}
                >
                  Logout
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/account"
                  sx={{
                    backgroundColor: "#030709",
                    color: "#00e5ff",
                    "&:hover": {
                      background: "#242525ff",
                    },
                  }}
                >
                  Account
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            slotProps={{
              root: {
                keepMounted: true,
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Box sx={{ background: COLORS.bg, minHeight: "100vh" }}>
            {/* ---counter-card--- */}

            <Box sx={{ px: 2, py: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <Paper sx={cardStyle}>
                    <Typography>
                      <AiOutlineProduct
                        style={{
                          color: COLORS.neon,
                          fontSize: "22px",
                        }}
                      />
                    </Typography>
                    <Typography variant="h6">Products</Typography>
                    <Typography variant="h4">{products.length}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <Paper sx={cardStyle}>
                    <Typography>
                      <MdOutlineInventory
                        style={{
                          color: COLORS.neon,
                          fontSize: "22px",
                        }}
                      />
                    </Typography>
                    <Typography variant="h6">Inventory</Typography>
                    <Typography variant="h4">{inventory.length}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <Paper sx={cardStyle}>
                    <Typography>
                      <IoPersonAddOutline
                        style={{
                          color: COLORS.neon,
                          fontSize: "22px",
                        }}
                      />
                    </Typography>
                    <Typography variant="h6">Customers</Typography>
                    <Typography variant="h4">{customers.length}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <Paper sx={cardStyle}>
                    <Typography>
                      <LiaFileInvoiceDollarSolid
                        style={{
                          color: COLORS.neon,
                          fontSize: "22px",
                        }}
                      />
                    </Typography>
                    <Typography variant="h6">Invoices</Typography>
                    <Typography variant="h4">{invoices.length}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>

            {/* ---activepage--- */}

            <Box sx={{ mt: 4 }}>
              {activePage === "products" && <Products />}
              {activePage === "inventory" && <Inventory />}
              {activePage === "customers" && <Customers />}
              {activePage === "create-invoice" && <CreateInvoice />}
              {activePage === "invoices" && <Invoices />}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
