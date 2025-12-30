// ==Header.jsx==

import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar>
          <Button color="inherit" component={Link} to="/products">
            PRODUCTS
          </Button>

          <Button color="inherit" component={Link} to="/inventory">
            INVENTORY
          </Button>

          <Button color="inherit" component={Link} to="/customers">
            CUSTOMERS
          </Button>

          <Button color="inherit" component={Link} to="/create-invoice">
            INVOICE
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
