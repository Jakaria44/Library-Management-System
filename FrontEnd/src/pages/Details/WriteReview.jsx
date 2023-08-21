import { Button, Grid, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log("Rating:", rating);
    console.log("Review:", review);
  };

  return (
    <Grid xs={12} md={8} container item spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Write a Review</Typography>
      </Grid>
      <Grid item xs={12}>
        <Rating
          name="user-rating"
          value={rating}
          onChange={handleRatingChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          label="Your Review"
          fullWidth
          value={review}
          onChange={handleReviewChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Grid>
    </Grid>
  );
};

export default WriteReview;
