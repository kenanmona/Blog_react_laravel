import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const LoaderButton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin:"auto !important"
      }}
    >
      <CircularProgress size={22} sx={{ color: "#00ffff !important",margin:"auto !important" }} />
    </Box>
  );
};

export default LoaderButton;
