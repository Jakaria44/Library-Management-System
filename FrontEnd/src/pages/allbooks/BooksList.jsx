import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAsyncValue } from "react-router-dom";

const BooksList = () => {
  const { data } = useAsyncValue();
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Grid item xs={12} lg={9}>
      <Grid item container direction="row" xs={12}>
        {data?.map((books) => (
          <Grid item xs key={books.ISBN}>
            <Typography variant="button" gutterBottom={true}>
              {books.TITLE}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default BooksList;
