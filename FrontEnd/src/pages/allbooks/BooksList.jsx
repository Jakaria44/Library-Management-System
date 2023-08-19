import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAsyncValue } from "react-router-dom";
import BookCard from "./BookCard";
import { styled } from '@mui/material/styles'


const GridForCard = styled(Grid)(({ theme }) => ({
  transition: 'transform 0.3s', // Add a smooth transition
  '&:hover': {
    transform: 'scale(1.05)', // Scale up by 10% on hover
  },
}));
const BooksList = () => {
  const { data } = useAsyncValue();
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Grid item xs={12} lg={9}>
      <Grid item container direction="row" xs={12} spacing={2}>
        {data?.map((books) => (
          <GridForCard item xs key={books.ISBN} >
            <BookCard book = {books} />
          </GridForCard>
        ))}
      </Grid>
    </Grid>
  );
};

export default BooksList;
