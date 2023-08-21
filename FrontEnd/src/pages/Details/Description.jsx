import { Book, Business, Person } from "@mui/icons-material";
import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

const Description = ({ book }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Grid mt={2} item container xs={12} direction="row" spacing={2}>
      <Grid
        direction="row"
        xs={12}
        container
        backgroundColor="background.default"
        borderRadius="12px"
        justifyContent="center"
        p={2}
      >
        <Tabs value={tabValue} onChange={handleChange} centered>
          <Tab icon={<Book />} label="Book Details" />
          <Tab icon={<Person />} label="Author" />
          <Tab icon={<Business />} label="Publication" />
        </Tabs>
        {tabValue === 0 && <BookDescription book={book} />}
        {tabValue === 1 && <AuthorDetails author={book.AUTHOR} />}
        {tabValue === 2 && (
          <PublicationDetails publication={book.PUBLISHER_ID} />
        )}
      </Grid>
    </Grid>
  );
};

export default Description;

const BookDescription = (book) => {
  return (
    <Grid container direction="column" item xs={12} padding={2}>
      <Typography variant="h1">Description</Typography>
      <Typography variant="body1">{book.PUBLISHER_ID}</Typography>
    </Grid>
  );
};

const AuthorDetails = ({ author }) => {
  return (
    <Grid container direction="column" item xs={12} padding={2}>
      <Typography variant="h1">hi there</Typography>
    </Grid>
  );
};

const PublicationDetails = ({ publisher }) => {
  return (
    <Grid container direction="column" item xs={12} padding={2}>
      <Typography variant="h1">this is publisher</Typography>
    </Grid>
  );
};
