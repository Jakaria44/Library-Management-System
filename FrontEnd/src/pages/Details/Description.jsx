import { Book, Business, Person } from "@mui/icons-material";
import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AuthorComponent from "./AuthorComponent";

const Description = ({ book }) => {
  const [tabValue, setTabValue] = useState(0);

  // DUMMY AUTHOR:
  const author = {
    DOB: "10-10-2000",
    DOD: null,
    NATIONALITY: "British",
    IMAGE:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    NAME: "J.K. Rowling",
    BIO: "Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL, better known by her pen name J. K. Rowling, is a British author and philanthropist. She is best known for writing the Harry Potter fantasy series, which has won multiple awards and sold more than 500 million copies, becoming the best-selling book series in history. The books are the basis of a popular film series, over which Rowling had overall approval on the scripts and was a producer on the final films. She also writes crime fiction under the pen name Robert Galbraith.",
  };

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
        {tabValue === 1 && <AuthorDetails author={author} />}
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
      <AuthorComponent author={author} />
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
