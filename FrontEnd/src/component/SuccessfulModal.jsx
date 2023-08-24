import styled from "@emotion/styled";
import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Modal, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SuccessfulModal = ({
  showSuccessMessage,
  setShowSuccessMessage,
  successMessage,
  HandleModalClosed,
}) => {
  const theme = useTheme();
  const StyledSuccessModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return (
    <StyledSuccessModal open={showSuccessMessage} onClose={HandleModalClosed}>
      <div
        className="success-modal-content"
        style={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "12px",
        }} // Use theme color
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <CheckCircleOutline fontSize="large" sx={{ color: "green" }} />
          <Typography margin={2} variant="h4">
            {successMessage}
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
    </StyledSuccessModal>
  );
};

export default SuccessfulModal;
