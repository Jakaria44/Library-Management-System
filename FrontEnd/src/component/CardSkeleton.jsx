import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import * as React from "react";

export default function CardSkeleton() {
  return (
    <Stack spacing={1} width="100%">
      <Skeleton animation="wave" variant="rectangular" height={220} />
      <Skeleton variant="text" width="100%" height={25} />
      <Skeleton animation="wave" variant="text" width="100%" height={25} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="circular" width={25} height={25} />
        <Skeleton variant="circular" width={25} height={25} />
        <Skeleton variant="circular" width={25} height={25} />
      </Box>
    </Stack>
  );
}
