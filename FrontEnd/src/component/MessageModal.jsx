import styled from "@emotion/styled";
import { NotificationsNone } from "@mui/icons-material";
import { Button, Grid, Modal, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const MessageModal = ({ showMessage, message, HandleClosed, HandleDelete }) => {
  const theme = useTheme();
  const StyledModal = styled(Modal)`
    margin: auto;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  return (
    <StyledModal open={showMessage} onClose={HandleClosed}>
      <div
        className="-modal-content"
        style={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "12px",
        }} // Use theme color
      >
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
          <NotificationsNone fontSize="large" sx={{ color: "green" }} />
          <Typography margin={2} variant="h4">
            {message}
          </Typography>
          <Grid
            container
            justifyContent="space-around"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Button
                margin={2}
                padding={2}
                variant="outlined"
                color="primary"
                onClick={HandleClosed}
              >
                Close
              </Button>
            </Grid>
            <Grid item>
              <Button
                margin={2}
                padding={2}
                variant="outlined"
                color="error"
                onClick={HandleDelete}
              >
                Delete Message
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </StyledModal>
  );
};

export default MessageModal;
