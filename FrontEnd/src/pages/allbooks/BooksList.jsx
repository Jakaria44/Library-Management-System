import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useAsyncValue } from "react-router-dom";
import BookCard from "./BookCard";
const GridForCard = styled(Grid)(({ theme }) => ({
  transition: "transform 0.3s", // Add a smooth transition
  "&:hover": {
    transform: "scale(1.05)", // Scale up by 10% on hover
  },
}));
const BooksList = () => {
  const { data } = useAsyncValue();
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Grid item xs={12} md={9}>
      <Grid
        item
        container
        direction="row"
        xs
        spacing={2}
        justifyContent="space-evenly"
      >
        {data?.map((books) => (
          <GridForCard
            padding={2}
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            key={books.ISBN}
          >
            <BookCard book={books} />
          </GridForCard>
        ))}
      </Grid>
    </Grid>
  );
};

export default BooksList;
