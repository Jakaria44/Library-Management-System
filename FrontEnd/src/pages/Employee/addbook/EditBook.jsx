import { Grid } from "@mui/material";
import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import server from "../../../HTTP/httpCommonParam";

import CircularSpinner from "../../../component/CircularSpinner";
import AddBook from "./AddBook";
export async function loader({ request }) {
  console.log(request);
  const id = request.url.split("/").pop();
  // console.log(id);
  return defer({
    bookDetails: server.get(`/book?id=${id}`),
  });
}
const EditBook = () => {
  const { bookDetails } = useLoaderData();

  return (
    <Grid container spacing={2} padding={3}>
      <React.Suspense fallback={<CircularSpinner />}>
        <Await
          resolve={bookDetails}
          errorElement={<div>Could not load Book informations </div>}
          children={(info) => <AddBook bookDetails={info.data} />}
        />
      </React.Suspense>
    </Grid>
  );
};

export default EditBook;
