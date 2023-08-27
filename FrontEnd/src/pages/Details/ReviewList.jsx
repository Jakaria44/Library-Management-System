import { Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews, loggedInUserId, onPageChange }) => {
  const reviewsPerPage = 4;
  const totalPages = Math.ceil(reviews?.length / reviewsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const visibleReviews = reviews?.slice(startIndex, endIndex);

  return (
    <Grid container spacing={2}>
      {visibleReviews?.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
      <Grid item xs={12} style={{ marginTop: "16px" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Grid>
  );
};

export default ReviewList;
