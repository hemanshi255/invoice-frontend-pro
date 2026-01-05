// ===layout/Toprbar.jsx==

import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../../context/AppContext";
import dashboardTheme from "../../styles/dashboardTheme";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const TOPBAR_HEIGHT = 72;

const menuItemStyle = {
  gap: 1.5,
  fontSize: 14,
  color: "#fff",
  borderRadius: "10px",
  mx: 0.5,
  my: 0.5,
  transition: "0.25s",
  "&:hover": {
    background: "rgba(0,229,255,0.15)",
    boxShadow: "0 0 12px rgba(0,229,255,0.6)",
  },
};

const Topbar = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setIsLoggedIn } = useContext(AppContext);

  const history = useHistory();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: TOPBAR_HEIGHT,
        background:
          "linear-gradient(90deg, rgba(8, 24, 40, 0.85), rgba(13,76,96,0.95), rgba(0,188,212,0.95))",
        borderRadius: dashboardTheme.borderRadius.xl,
        border: "1px solid rgba(0, 229, 255, 0.75)",
        boxShadow: `
  0 0 0 1px rgba(0,229,255,0.9),
  0 0 25px rgba(0,229,255,0.6),
  0 12px 40px rgba(0,0,0,0.6)
`,
        backdropFilter: dashboardTheme.blur.glass,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        margin: "12px",
        maxWidth: "calc(100% - 24px*2)",
        mx: "auto",
      }}
    >
      <Toolbar sx={{ minHeight: TOPBAR_HEIGHT }}>
        {/* MENU ICON */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 1,
            color: dashboardTheme.colors.textPrimary,
            display: { md: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: "#fff",
            mr: 1,
          }}
        >
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* ADMIN PILL */}
        <Box
          onClick={handleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.8,
            borderRadius: dashboardTheme.borderRadius.lg,
            background: "rgba(6, 18, 32, 0.9)",
            backdropFilter: dashboardTheme.blur.glass,
            border: "1px solid rgba(0,229,255,0.6)",
            boxShadow: `
      inset 0 0 15px rgba(0,229,255,0.15),
      0 0 20px rgba(0,229,255,0.4)
    `,
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              boxShadow: `
        inset 0 0 18px rgba(0,229,255,0.25),
        0 0 30px rgba(0,229,255,0.8)
      `,
            },
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              background: dashboardTheme.colors.primaryGradient,
              fontWeight: 700,
            }}
          >
            A
          </Avatar>

          <Typography sx={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>
            Admin
          </Typography>

          <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: 20 }} />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 180,
              background: "rgba(6, 18, 32, 0.95)",
              backdropFilter: dashboardTheme.blur.glass,
              borderRadius: dashboardTheme.borderRadius.lg,
              border: "1px solid rgba(0,229,255,0.5)",
              boxShadow: `
        0 0 0 1px rgba(0,229,255,0.5),
        0 0 30px rgba(0,229,255,0.6)
      `,
            },
          }}
        >
          <MenuItem component={Link} to="/account" sx={menuItemStyle}>
            <PersonIcon fontSize="small" />
            Profile
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            sx={{ ...menuItemStyle, color: "#ff6b6b" }}
          >
            <LogoutIcon fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
