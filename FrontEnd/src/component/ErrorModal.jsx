import styled from "@emotion/styled";
import { ErrorOutline } from "@mui/icons-material";
import { Button, Modal, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ErrorModal = ({ showErrorMessage, errorMessage, HandleModalClosed }) => {
  const theme = useTheme();
  const StyledErrorModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return (
    <StyledErrorModal open={showErrorMessage} onClose={HandleModalClosed}>
      <div
        className="error-modal-content"
        style={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "12px",
        }}
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <ErrorOutline fontSize="large" sx={{ color: "red" }} />
          <Typography margin={2} variant="h4">
            {errorMessage}
          </Typography>
          <Button
            margin={2}
            padding={2}
            variant="contained"
            color="primary"
            onClick={HandleModalClosed}
          >
            Close
          </Button>
        </Box>
      </div>
    </StyledErrorModal>
  );
};

export default ErrorModal;
