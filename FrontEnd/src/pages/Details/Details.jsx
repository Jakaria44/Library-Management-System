import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import server from "../../HTTP/httpCommonParam";
import CircularSpinner from "../../component/CircularSpinner";
import Description from "./Description";
import GiveReview from "./GiveReview";
import ReviewsOfBook from "./ReviewsOfBook";
import TitleAndCoverPage from "./TitleAndCoverPage";

export async function loader({ request }) {
  console.log(request);
  const id = request.url.split("/").pop();
  // console.log(id);
  return defer({
    bookDetails: server.get(`/book?id=${id}`),
  });
}
const Details = () => {
  const { bookDetails } = useLoaderData();

  return (
    <Grid container spacing={2} padding={3}>
      <React.Suspense fallback={<CircularSpinner />}>
        <Await
          resolve={bookDetails}
          errorElement={
            <p style={{ margin: "auto" }}>Error loading book details!</p>
          }
        >
          <BookDetails />
        </Await>
      </React.Suspense>
    </Grid>
  );
};

export default Details;

const BookDetails = () => {
  const { data } = useAsyncValue();
  const book = data;

  useEffect(() => {
    console.log(book);
  }, []);

  const ratings = [
    { label: 5, count: 15 },
    { label: 4, count: 10 },
    { label: 3, count: 8 },
    { label: 2, count: 4 },
    { label: 1, count: 2 },
  ];
  const editions = [
    {
      EDITION: 2,
      NUMBER_OF_PAGES: 200,
      AVAILABLE_COPIES: 100,
    },
  ];
  return (
    <>
      <Grid container spacing={2} padding={3} direction="row">
        <TitleAndCoverPage book={book} editions={editions} />
        <Description book={book} />
        <GiveReview ratings={ratings} />
        <ReviewsOfBook />
      </Grid>
    </>
  );
};
