import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

const ReviewCard = ({
  profilePicture,
  fullName,
  date,
  isEditable = false,
  reviewID,
  rating,
  reviewText,
  handleEdit = () => {},
  handleDelete = () => {},
}) => {
  return (
    <Grid item xs={11}>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar src={profilePicture} alt={fullName} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{fullName}</Typography>
            <Typography variant="body2" color="textSecondary">
              {date}
            </Typography>
          </Grid>
          <Grid item>
            {isEditable && (
              <>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEdit(reviewID)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(reviewID)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Grid>
          <Grid item>
            <Rating name="read-only" value={rating} readOnly />
          </Grid>
        </Grid>
        <Typography variant="body1" style={{ marginTop: "8px" }}>
          {reviewText}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default ReviewCard;
