import { Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
import ReviewCard from "./ReviewCard";
const ReviewList = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const getAllReviews = async ({ id }) => {
    try {
      const response = await server.get(`/all-rat-rev?id=${id}`);
      console.log(response.data.allRatRev);
      setReviews(response.data.allRatRev);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllReviews({ id });
  }, [id]);

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
        <ReviewCard
          key={index}
          rating={review.RATING}
          reviewText={review.REVIEW}
          fullName={review.NAME}
          profilePicture={review.IMAGE}
          date={review.EDIT_DATE}
        />
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
