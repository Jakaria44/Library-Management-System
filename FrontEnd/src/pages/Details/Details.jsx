import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
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

  const [othersReviews, setOthersReviews] = useState([]);
  const [myRating, setMyRating] = useState(null);
  const [myReview, setMyReview] = useState({});
  const [ratings, setRatings] = useState([]);

  const getAllReviews = async ({ id }) => {
    try {
      const response = await server.get(`/all-rat-rev?id=${id}`);
      // Create an object to store the counts for each rating
      const ratingCounts = {};
      const array = [...response.data.myRatRev, ...response.data.allRatRev];
      // Count the occurrences of each rating
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
      setOthersReviews(response.data.allRatRev);
      setRatings(ratings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllReviews({ id: data.ISBN });
  }, []);

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
        <TitleAndCoverPage book={data} editions={editions} />
        <Description book={data} />
        <GiveReview myRating={myRating} myReview={myReview} ratings={ratings} />
        <ReviewsOfBook othersReviews={othersReviews} />
      </Grid>
    </>
  );
};
