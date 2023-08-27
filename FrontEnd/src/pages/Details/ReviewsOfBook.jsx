import { Grid, Typography } from "@mui/material";
import React from "react";
import ReviewList from "./ReviewList";

const ReviewsOfBook = ({ otherReviews }) => {
  const reviews = otherReviews;

  const loggedInUserId = "user1"; // ID of the logged-in user

  return (
    <Grid mt={2} item container xs={12} direction="row" spacing={2}>
      <Grid
        direction="row"
        xs={12}
        container
        backgroundColor="background.default"
        borderRadius="12px"
        justifyContent="center"
        p={2}
      >
        <Grid
          container
          direction="column"
          item
          xs={12}
          padding={2}
          justifyContent="center"
        >
          <Typography variant="h2">Reviews and Rating</Typography>
        </Grid>

        <ReviewList
          reviews={reviews}
          loggedInUserId={loggedInUserId}
          onPageChange={(page) => console.log(`Page changed to: ${page}`)}
        />
      </Grid>
    </Grid>
  );
};

export default ReviewsOfBook;
