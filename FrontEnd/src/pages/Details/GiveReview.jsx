import { Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import TimeFormat from "../../utils/TimeFormat";
import RatingList from "./RatingList";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";

const GiveReview = ({ myRating, myReview, ratings }) => {
  const [reviewEditing, setReviewEditing] = useState(false);

  const handleSubmitReview = async (rating, review) => {
    try {
      // const response = await server.post(`/edit-rat-rev?id=${id}`, {
      //   rating,
      //   review,
      // });
      // console.log(response);
      // setMyRating(rating);
      // setMyReview(response.data);
      console.log(rating, review);
      setReviewEditing(false);
    } catch (err) {
      console.log(err);
    }
  };
  const MyReviewEdit = () => {
    console.log(myReview.REVIEW);
    if (reviewEditing) {
      return (
        <WriteReview
          text={myReview.REVIEW}
          value={0}
          onSubmit={handleSubmitReview}
        />
      );
    }
    if (myRating && myReview && !reviewEditing) {
      return (
        <ReviewCard
          profilePicture={myReview.IMAGE}
          fullName={myReview.NAME}
          date={TimeFormat(myReview.EDIT_DATE)}
          isEditable={true}
          reviewID={myReview.REVIEW_ID}
          rating={myRating}
          reviewText={myReview.REVIEW}
          handleEdit={() => setReviewEditing(true)}
        />
      );
    }
    if (myRating && !myReview) {
      return (
        <WriteReview text="" value={myRating} onSubmit={handleSubmitReview} />
      );
    } else {
      return <WriteReview text="" value={0} onSubmit={handleSubmitReview} />;
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
