import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularSpinner() {
  return (
    <Box color="heading.main" sx={{ margin: "auto" }}>
      <CircularProgress />
    </Box>
  );
}
