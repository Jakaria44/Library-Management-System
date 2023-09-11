import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import RatingList from "./RatingList";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
const GiveReview = ({
  deleteReview,
  myRating,
  myReview,
  ratings,
  onSubmit,
  reviewEditing,
  setReviewEditing,
}) => {
  const MyReviewEdit = () => {
    if (reviewEditing) {
      return (
        <WriteReview
          text={myReview.REVIEW}
          value={myReview.RATING}
          onSubmit={onSubmit}
          onCancel={() => setReviewEditing(false)}
        />
      );
    }
    if (myRating && myReview && !reviewEditing) {
      return (
        <ReviewCard
          profilePicture={myReview.IMAGE}
          fullName={myReview.NAME}
          date={myReview.EDIT_DATE}
          isEditable={true}
          reviewID={myReview.REVIEW_ID}
          rating={myRating}
          reviewText={myReview.REVIEW}
          handleEdit={() => setReviewEditing(true)}
          handleDelete={deleteReview}
        />
      );
    }
    if (myRating && !myReview) {
      return (
        <WriteReview
          text=""
          value={myRating}
          onCancel={() => {
            setReviewEditing(false);
          }}
          onSubmit={onSubmit}
        />
      );
    } else {
      return (
        <WriteReview
          text=""
          value={0}
          onCancel={() => {
            setReviewEditing(false);
          }}
          onSubmit={onSubmit}
        />
      );
    }
  };
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
        <Divider sx={{ width: "100%", mt: 0.25, mb: 1.25 }} />

        <Grid
          container
          direction="row"
          xs={12}
          spacing={1}
          justifyContent="space-between"
        >
          {/* change here for different state */}
          <Grid xs={12} lg={8} container item>
            <MyReviewEdit />
          </Grid>

          <Grid
            xs={12}
            lg={4}
            m={5}
            mt={4}
            item
            container
            direction="row"
            alignItems="right"
          >
            <RatingList ratings={ratings} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GiveReview;
