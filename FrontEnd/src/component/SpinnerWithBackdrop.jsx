import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SpinnerWithBackdrop = ({ backdropOpen, helperText }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropOpen}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="body2" color="inherit" mt={2}>
          {helperText}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default SpinnerWithBackdrop;
