import { Telegram } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ErrorModal from "../../component/ErrorModal";
import SuccessfullModal from "../../component/SuccessfulModal";
import TextArea from "../../component/TextArea";
import server from "./../../HTTP/httpCommonParam";
const SendMessage = ({ user }) => {
  const [showWriteMessage, setShowWriteMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSendMessage = async () => {
    try {
      console.log(user.USER_ID, message);
      const body = {
        USER_ID: user.USER_ID,
        MESSAGE: message,
      };
      const res = await server.post("/send-message", {
        USER_ID: user.USER_ID,
        MESSAGE: message,
      });
      setSuccessMessage(res.data.message);
      setShowSuccessMessage(true);
      setShowWriteMessage(false);
      setMessage("");
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setShowErrorMessage(true);
      console.log(err);
    }
  };
  return (
    <>
      <Grid item xs={2}>
        <Tooltip title="Send Message">
          <IconButton
            size="medium"
            color="primary"
            onClick={() => {
              setShowWriteMessage(true);
            }}
          >
            <Telegram />
          </IconButton>
        </Tooltip>
      </Grid>
      <SuccessfullModal
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
          setShowWriteMessage(false);
        }}
      />

      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
          setShowWriteMessage(false);
        }}
      />

      <TextArea
        open={showWriteMessage}
        setValue={setMessage}
        title="Write Message"
        buttonText="Send"
        handleClose={() => setShowWriteMessage(false)}
        handleSubmit={handleSendMessage}
      />
    </>
  );
};

export default function Message({ user }) {
  return <SendMessage user={user} />;
}
