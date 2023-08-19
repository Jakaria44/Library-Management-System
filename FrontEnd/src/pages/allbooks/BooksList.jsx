import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAsyncValue } from "react-router-dom";
import BookCard from "./BookCard";
const BooksList = () => {
  const { data } = useAsyncValue();
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Grid item xs={12} lg={9}>
      <Grid item container direction="row" xs={12} spacing={1}>
        {data?.map((books) => (
          <Grid item xs key={books.ISBN} >
            <BookCard book = {books} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default BooksList;
