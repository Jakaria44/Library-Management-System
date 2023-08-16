import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAsyncValue } from "react-router-dom";

const BooksList = () => {
  const { data } = useAsyncValue();
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Grid item xs={12} lg={3}>
      <Typography variant="h4">Books List</Typography>
      {data?.map((books) => (
        <Typography variant="button" gutterBottom={true} key={books.ISBN}>
          {books.TITLE}
        </Typography>
      ))}
    </Grid>
  );
};

export default BooksList;
