import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import server from "../../HTTP/httpCommonParam";
import CircularSpinner from "../../component/CircularSpinner";
import Description from "./Description";
import GiveReview from "./GiveReview";
import ReviewsOfBook from "./ReviewsOfBook";
import TitleAndCoverPage from "./TitleAndCoverPage";

import { useConfirm } from "material-ui-confirm";
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
  const confirm = useConfirm();
  const { data } = useAsyncValue();
  const [myRating, setMyRating] = useState(null);
  const [myReview, setMyReview] = useState({});
  const [ratings, setRatings] = useState([]);
  const [reviewEditing, setReviewEditing] = useState(false);

  console.log(data);
  const deleteReview = async () => {
    try {
      const response = await server.delete(`/del-rate-review?id=${data.ISBN}`);
      console.log(response);

      getAllReviews({ id: data.ISBN });
    } catch (err) {
      console.log("something went wrong");
    }
  };

  const submitReviewRating = async (rating, review) => {
    try {
      console.log(rating, review);
      const response = await server.post(`/rate-review?id=${data.ISBN}`, {
        RATING: rating,
        REVIEW: review,
      });
      console.log(response);
      getAllReviews({ id: data.ISBN });
      setReviewEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllReviews = async ({ id }) => {
    try {
      console.log("isbn: ", id);
      const response = await server.get(`/all-rat-rev?id=${id}`);
      // Create an object to store the counts for each rating
      const ratingCounts = {};
      const array = [...response.data.myRatRev, ...response.data.allRatRev];
      // Count the occurrences of each rating
      console.log(response.data.allRatRev);
      array.forEach((review) => {
        const rating = review.RATING;
        if (ratingCounts[rating] === undefined) {
          ratingCounts[rating] = 1;
        } else {
          ratingCounts[rating]++;
        }
      });

      const ratings = [];
      for (let rating = 5; rating >= 1; rating--) {
        const count = ratingCounts[rating] || 0;
        ratings.push({ label: rating, count });
      }
      setMyReview(response.data.myRatRev[0]);

      // return response.data;
      setMyRating(response.data.myRatRev[0]?.RATING);
      setRatings(ratings);
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        setMyRating(null);
      }
      setRatings([]);
    }
  };

  const editions = JSON.parse(data?.EDITION).map((edition) => ({
    id: edition.ID,
    EDITION: edition.NUM,
    AVAILABLE_COPIES: edition.COUNT,
    YEAR: edition.YEAR,
    label: `Edition ${edition.NUM}`,
  }));
  useEffect(() => {
    getAllReviews({ id: data.ISBN });
  }, []);
  return (
    <>
      <Grid container spacing={2} padding={3} direction="row">
        <TitleAndCoverPage book={data} editions={editions} />
        <Description book={data} />
        <GiveReview
          myRating={myRating}
          myReview={myReview}
          ratings={ratings}
          onSubmit={submitReviewRating}
          deleteReview={deleteReview}
          reviewEditing={reviewEditing}
          setReviewEditing={setReviewEditing}
        />
        {data ? <ReviewsOfBook id={data.ISBN} /> : <h2>No reviews Found</h2>}
      </Grid>
    </>
  );
};
