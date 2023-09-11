import React, { useState } from "react";
import SignupDialog from "../src/component/SignupDialog";

const useSignupDialog = () => {
  const commonCondition = ["user", "employee", "admin"].includes(
    localStorage.getItem("role")
  );
  const message = "Please sign up to continue.";

  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  if (!commonCondition) {
    handleOpenDialog();
  }

  const DialogComponent = () => (
    <SignupDialog
      open={showDialog}
      message={message}
      onClose={handleCloseDialog}
    />
    // <CustomDialog open={showDialog} onClose={handleCloseDialog} message={message} />
  );

  return DialogComponent;
};

export default useSignupDialog;
