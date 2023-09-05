import { Delete } from "@mui/icons-material";
import { Button, IconButton, List, ListItem, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers";
import * as React from "react";

export default function EditionAdd({ formFields, setFormFields }) {
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
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.Edition}
                  />
                </Grid>
                {/* <DemoContainer components={["YearCalendar"]}> */}
                <Grid item xs={4.25}>
                  <DatePicker
                    name="Publish_Year"
                    label="Publish Year"
                    views={["year"]}
                    value={form.Publish_Year}
                    onChange={(value) => handlePublishYearChange(index, value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  {/* </DemoContainer> */}
                  <TextField
                    name="Available"
                    placeholder="Available number of copies"
                    label="Available Copies"
                    type="number"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.Available}
                  />
                </Grid>
                <Grid item xs={0.75} m="auto">
                  <IconButton color="error" onClick={() => removeFields(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <Button margin="auto" onClick={addFields}>
        Add
      </Button>
    </React.Fragment>
  );
}
