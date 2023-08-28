import { Button, Grid, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SignupDialog from "../../component/SignupDialog";

const WriteReview = ({ text, value, onSubmit }) => {
  const [rating, setRating] = useState(value);
  const [review, setReview] = useState(text);
  const [showMessage, setShowMessage] = useState(false);

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
    if (review === "") return;
    if (
      localStorage.getItem("role") !== "user" &&
      localStorage.getItem("role") !== "employee"
    ) {
      console.log("hi");
      setShowMessage(true);
      return;
    }
    onSubmit(rating, review);
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
      <SignupDialog
        showMessage={showMessage}
        message="Please sign up to add review.."
        HandleModalClosed={() => {
          setShowMessage(false);
        }}
      />
    </Grid>
  );
};

export default WriteReview;
