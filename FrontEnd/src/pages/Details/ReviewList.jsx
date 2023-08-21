import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ReviewList = ({ reviews, loggedInUserId, onPageChange }) => {
  const reviewsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const visibleReviews = reviews.slice(startIndex, endIndex);

  return (
    <Grid container spacing={2}>
      {visibleReviews.map((review, index) => (
        <Grid key={index} item xs={12}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar src={review.profilePicture} alt={review.fullName} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{review.fullName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {review.date}
                </Typography>
              </Grid>
              <Grid item>
                {review.userId === loggedInUserId && (
                  <>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(review.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(review.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Grid>
              <Grid item>
                <Rating name="read-only" value={review.rating} readOnly />
              </Grid>
            </Grid>
            <Typography variant="body1" style={{ marginTop: "8px" }}>
              {review.reviewText}
            </Typography>
          </Paper>
        </Grid>
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
