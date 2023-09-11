import { Button, Grid, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SignupDialog from "../../component/SignupDialog";

const WriteReview = ({ text, value, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(value);
  const [review, setReview] = useState(text);
  const [showMessage, setShowMessage] = useState(false);

  const handleCancel = () => {
    setRating(0);
    setReview("");
    onCancel();
  };
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Review:", review);
    if (rating === 0) return;
    if (
      !["admin", "employee", "user"].includes(
        localStorage.getItem("role")?.toLowerCase()
      )
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
      <Grid container xs={12} item direction="row" spacing={1}>
        <Grid item>
          <Button variant="error" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button variant="success" color="success" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Grid>
      </Grid>
      <SignupDialog
        showMessage={showMessage}
        message="Please sign in to add review.."
        HandleModalClosed={() => {
          setShowMessage(false);
        }}
      />
    </Grid>
  );
};

export default WriteReview;
