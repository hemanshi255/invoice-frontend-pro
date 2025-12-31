// ==Account.jsx==

import React, { useContext, useHistory } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { AppContext } from "../context/AppContext";

const Company = () => {
  return (
    <>
      <Box>
        <Button variant="contained" color="error" sx={{ p: 2 }}>
          Logout
        </Button>
      </Box>
    </>
  );
};

export default Company;
