import { Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";

const RatingList = ({ ratings }) => {
  const { palette } = useTheme();
  // Calculate the total number of ratings
  const totalRatings = ratings.reduce(
    (total, rating) => total + rating.count,
    0
  );
  const totalRatingValue = ratings.reduce(
    (total, rating) => total + rating.label * rating.count,
    0
  );

  // Calculate the average rating
  const averageRating = totalRatingValue / totalRatings;

  return (
    <Grid container spacing={2} direction="row">
      <Grid container spacing={2} mb={2} item>
        <Typography variant="h2">
          Average Rating: {averageRating.toFixed(2)}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {ratings.map((rating, index) => (
          <Grid key={index} item xs={12}>
            <Tooltip
              arrow="true"
              title={`${rating.label}: ${rating.count} ratings`}
            >
              <Box display="flex" alignItems="center">
                <Typography style={{ marginRight: "8px" }}>
                  {rating.label}
                </Typography>
                <Box
                  style={{
                    width: `${(rating.count / totalRatings) * 100}%`,
                    backgroundColor: "#007BFF",
                    height: "1vh", // Responsive height using vh unit
                    borderRadius: "4px",
                  }}
                />
              </Box>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default RatingList;
