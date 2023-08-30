import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

const TextArea = (props) => {
  const { open, handleClose, handleSubmit, setValue, title, buttonText } =
    props;
  return (
    <Box fullWidth>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          handleClose(event);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle variant="h3">{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            multiline
            maxRows={10}
            id="name"
            label="Write news here"
            fullWidth
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="success" type="submit" onClick={handleSubmit}>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TextArea;
