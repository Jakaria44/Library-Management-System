import React from "react";
import RentStat from "./RentStat";
import { Box, Stack, Typography } from "@mui/material";
import FineStat from "./FineStat";

const Statistics = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h1" gutterBottom component="div" textAlign="center">
        Statistics
      </Typography>
      <RentStat />
      <FineStat />
    </Stack>
  );
};

export default Statistics;
