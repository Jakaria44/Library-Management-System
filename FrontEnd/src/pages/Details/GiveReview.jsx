import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import RatingList from "./RatingList";
import WriteReview from "./WriteReview";

const GiveReview = ({ ratings }) => {
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

        <Grid container direction="row" xs={12} padding={2} alignItems="center">
          <Grid xs={12} md={8} container item>
            <WriteReview />
          </Grid>

          <Grid xs={12} md={4} container direction="row" alignItems="right">
            <RatingList ratings={ratings} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GiveReview;
