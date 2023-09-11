import { ArrowCircleUp, Delete } from "@mui/icons-material";
import {
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers";
import * as React from "react";
import ErrorModal from "../../../component/ErrorModal";
import SuccessfulModal from "../../../component/SuccessfulModal";
import server from "./../../../HTTP/httpCommonParam";
export default function EditionAdd({ formFields, setFormFields }) {
  const [successMessage, setSuccessMessage] = React.useState("");
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };
  const handlePublishYearChange = (index, value) => {
    let data = [...formFields];

    data[index].Publish_Year = value;
    // use this to upload to server
    // .toDate().getFullYear();

    setFormFields(data);
  };

  const addFields = () => {
    let object = {
      id: null,
      Edition: "",
      Publish_Year: "",
      Available: "",
    };

    setFormFields((prev) => [...prev, object]);
  };

  const removeFields = (index) => {
    if (formFields.length === 1) return;
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };
  const updateHandler = async (index) => {
    const up = {
      EDITION_NUM: formFields[index].Edition,
      NUM_OF_COPIES: formFields[index].Available,
      PUBLISH_YEAR: formFields[index].Publish_Year.toDate().getFullYear(),
    };
    try {
      const res = await server.put(
        `/getEdition?eid=${formFields[index].id}`,
        up
      );
      setSuccessMessage(res.data.message);
      setShowSuccessMessage(true);
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setShowErrorMessage(true);
      console.log(err);
    }
  };
  const deleteEditionHandler = async (index) => {
    if (!formFields[index].id) removeFields(index);
    else {
      try {
        const res = await server.delete(
          `getEdition?eid=${formFields[index].id}`
        );

        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
        removeFields(index);
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
        console.log(err);
      }
    }
  };
  return (
    <React.Fragment>
      <List>
        {formFields?.map((form, index) => {
          return (
            <ListItem key={index}>
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="space-evenly"
              >
                <Grid item xs={3}>
                  <TextField
                    name="Edition"
                    placeholder="Edition"
                    label="Edition"
                    type="number"
                    required
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.Edition}
                  />
                </Grid>
                {/* <DemoContainer components={["YearCalendar"]}> */}
                <Grid item xs={3.75}>
                  <DatePicker
                    name="Publish_Year"
                    label="Publish Year"
                    views={["year"]}
                    required
                    value={form.Publish_Year}
                    onChange={(value) => handlePublishYearChange(index, value)}
                  />
                </Grid>
                <Grid item xs={3.25}>
                  {/* </DemoContainer> */}
                  <TextField
                    name="Available"
                    placeholder="Available number of copies"
                    label="Available Copies"
                    type="number"
                    required
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.Available}
                  />
                </Grid>
                <Grid
                  item
                  container
                  spacing={2}
                  direction="row"
                  xs={2}
                  justifyContent="space-evenly"
                >
                  {form.id && (
                    <Grid m="auto" item xs={form.id ? 6 : 12}>
                      <Tooltip title="Update">
                        <IconButton
                          color="success"
                          onClick={() => updateHandler(index)}
                        >
                          <ArrowCircleUp />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  )}
                  <Tooltip title="Delete">
                    <Grid item m="auto" xs={form.id && 6}>
                      <IconButton
                        color="error"
                        onClick={() => deleteEditionHandler(index)}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Tooltip>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <Button margin="auto" onClick={addFields}>
        Add
      </Button>
      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => setShowSuccessMessage(false)}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => setShowErrorMessage(false)}
      />
    </React.Fragment>
  );
}
