import { Await, defer, useLoaderData } from "react-router-dom";
import server from "./../../HTTP/httpCommonParam";

import { Grid, Typography } from "@mui/material";
import React from "react";
import CircularSpinner from "../../component/CircularSpinner";
import Filters from "../allbooks/Filters";
import FavBooksList from "./FavBooksLIst";

export async function loader() {
  return defer({
    allBooks: server.get("/all-books-sum"),
  });
}
const MyFavourites = () => {
  const { allBooks } = useLoaderData();
  return (
    <>
      <Typography variant="h2" sx={{ padding: "1rem" }}>
        My Favourites
      </Typography>
      <Grid container spacing={2}>
        <Filters />
        <React.Suspense fallback={<CircularSpinner />}>
          <Await
            resolve={allBooks}
            errorElement={
              <p style={{ margin: "auto" }}>Error loading all books!</p>
            }
          >
            <FavBooksList />
          </Await>
        </React.Suspense>
      </Grid>
    </>
  );
};

export default MyFavourites;
