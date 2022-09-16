import React from "react";
import { Box, Typography } from "@mui/material";

function Success() {
  return (
    <Box sx={{ color: "#fff", textAlign: "center" }}>
      <img className="download-img" src="/assets/img/ic-success.svg" alt="success-check" />
      <Typography fontSize={26} sx={{ fontWeight: 500 }}>
          {"You have now your pass"}
      </Typography>
    </Box>
  );
}

export default Success;
