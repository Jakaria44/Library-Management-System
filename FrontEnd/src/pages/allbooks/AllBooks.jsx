import { Await, defer, useLoaderData } from "react-router-dom";
import server from "./../../HTTP/httpCommonParam";
import BooksList from "./BooksList";
import Filters from "./Filters";

import { Grid } from "@mui/material";
import React from "react";
import CircularSpinner from "../../component/CircularSpinner";

export async function loader() {
  return defer({
    allBooks: server.get("/all-books-sum"),
  });
}
const AllBooks = () => {
  const { allBooks } = useLoaderData();
  // console.log(allBooks.data);

  return (
    <Grid container spacing={2}>
      <Filters />
      <React.Suspense fallback={<CircularSpinner />}>
        <Await
          resolve={allBooks}
          errorElement={
            <p style={{ margin: "auto" }}>Error loading all books!</p>
          }
        >
          <BooksList />
        </Await>
      </React.Suspense>
    </Grid>
  );
};

export default AllBooks;
