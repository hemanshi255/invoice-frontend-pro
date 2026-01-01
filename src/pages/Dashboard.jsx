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
    padding: 3,
    textAlign: "center",
    background: "#030709",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0px 0px 10px 3px #1de9b6",
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
    <div
      style={{
        background: "linear-gradient(360deg, #0f2027, #203a43, #2c5364)",
        minHeight: "100vh",
      }}
    >
      <Toolbar />

      {/* ---sidebarList--- */}

      <List>
        <ListItem
          disablePadding
          sx={{
            backgroundColor: "#030709",
            color: "#fff",
            mb: 3,
            boxShadow: "0px 0px 10px 2px #00e5ff",
          }}
          onClick={() => setActivePage("products")}
        >
          <ListItemButton>
            <ListItemIcon>
              <AiOutlineProduct
                style={{ color: "#fff", fontSize: "20px", fontWeight: 600 }}
              />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            backgroundColor: "#030709",
            color: "#fff",
            mb: 3,
            boxShadow: "0px 0px 10px 2px #00e5ff",
          }}
          onClick={() => setActivePage("inventory")}
        >
          <ListItemButton>
            <ListItemIcon>
              <MdOutlineInventory
                style={{ color: "#fff", fontSize: "20px", fontWeight: 600 }}
              />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            backgroundColor: "#030709",
            color: "#fff",
            mb: 3,
            boxShadow: "0px 0px 10px 2px #00e5ff",
          }}
          onClick={() => setActivePage("customers")}
        >
          <ListItemButton>
            <ListItemIcon>
              <IoPersonAddOutline
                style={{ color: "#fff", fontSize: "20px", fontWeight: 600 }}
              />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            backgroundColor: "#030709",
            color: "#fff",
            mb: 3,
            boxShadow: "0px 0px 10px 2px #00e5ff",
          }}
          onClick={() => setActivePage("create-invoice")}
        >
          <ListItemButton>
            <ListItemIcon>
              <LiaFileInvoiceDollarSolid
                style={{ color: "#fff", fontSize: "20px", fontWeight: 600 }}
              />
            </ListItemIcon>
            <ListItemText primary="Create Invoice" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          sx={{
            backgroundColor: "#030709",
            color: "#fff",
            mb: 3,
            boxShadow: "0px 0px 10px 2px #00e5ff",
          }}
          onClick={() => setActivePage("invoices")}
        >
          <ListItemButton>
            <ListItemIcon>
              <MdChecklist
                style={{ color: "#fff", fontSize: "20px", fontWeight: 600 }}
              />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
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
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
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
          <Box sx={{ background: "#2c5364", minHeight: "100vh" }}>
            {/* ---counter-card--- */}

            <Box sx={{ px: 2, py: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <Paper sx={cardStyle}>
                    <Typography>
                      <AiOutlineProduct
                        style={{
                          color: "#fff",
                          fontSize: "20px",
                          fontWeight: 600,
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
                          color: "#fff",
                          fontSize: "20px",
                          fontWeight: 600,
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
                          color: "#fff",
                          fontSize: "20px",
                          fontWeight: 600,
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
                          color: "#fff",
                          fontSize: "20px",
                          fontWeight: 600,
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
