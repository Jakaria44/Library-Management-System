import styled from "@emotion/styled";
import { LockPersonOutlined } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Grid,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
const SignupDialog = ({ showMessage, message, HandleModalClosed }) => {
  const theme = useTheme();
  const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showMessage}
      onClose={HandleModalClosed}
    >
      <StyledModal open={showMessage} onClose={HandleModalClosed}>
        <div
          className="success-modal-content"
          style={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "12px",
          }} // Use theme color
        >
          <Box p={2} display="flex" flexDirection="column" alignItems="center">
            <LockPersonOutlined fontSize="large" sx={{ color: "green" }} />
            <Typography margin={2} variant="h4">
              {message}
            </Typography>
            <Grid
              mt={2}
              p={0}
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                margin={2}
                padding={2}
                variant="text"
                color="primary"
                onClick={HandleModalClosed}
              >
                Close
              </Button>
              <Button
                component={Link}
                to="/signin"
                variant="contained"
                color="success"
                onClick={() => {
                  HandleModalClosed();
                }}
                sx={{ marginLeft: theme.spacing(1) }}
              >
                sign in
              </Button>
            </Grid>
          </Box>
        </div>
      </StyledModal>
    </Backdrop>
  );
};

export default SignupDialog;
