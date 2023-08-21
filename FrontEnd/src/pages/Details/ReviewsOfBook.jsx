import { Grid, Typography } from "@mui/material";
import React from "react";
import ReviewList from "./ReviewList";

const ReviewsOfBook = () => {
  const reviews = [
    {
      id: 1,
      profilePicture:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      fullName: "Prince Akachi",
      date: "2023-08-01",
      reviewText: "Great product!",
      userId: "user1", // ID of the user who wrote the review
      rating: 5,
    },
    {
      id: 2,
      profilePicture:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      fullName: "Prince Akachi",
      date: "2023-08-01",
      reviewText: "Great product!",
      userId: "user1", // ID of the user who wrote the review
      rating: 3,
    },
    {
      id: 3,
      profilePicture:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      fullName: "Prince Akachi",
      date: "2023-08-01",
      reviewText: "Great product!",
      userId: "user1", // ID of the user who wrote the review
      rating: 1,
    },
    {
      id: 4,
      profilePicture:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      fullName: "Prince Akachi",
      date: "2023-08-01",
      reviewText: "Great product!",
      userId: "user1", // ID of the user who wrote the review
      rating: 4,
    },
    {
      id: 5,
      profilePicture:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      fullName: "Prince Akachi",
      date: "2023-08-01",
      reviewText: "Great product!",
      userId: "user1", // ID of the user who wrote the review
      rating: 3,
    },
    {
      id: 6,
      profilePicture:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      fullName: "Prince Akachi",
      date: "2023-08-01",
      reviewText: "Great product!",
      userId: "user1", // ID of the user who wrote the review
      rating: 1,
    },
    {
      id: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      fullName: "Prince Akachi",
      date: "2023-08-01",
      reviewText: "Great product!",
      userId: "user1", // ID of the user who wrote the review
      rating: 5,
    },
    {
      id: 8,
      profilePicture:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      fullName: "Prince Akachi",
      date: "2023-08-01",
      reviewText: "Great product!",
      userId: "user1", // ID of the user who wrote the review
      rating: 4,
    },

    // ... other reviews
  ];

  const loggedInUserId = "user1"; // ID of the logged-in user

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

        <ReviewList
          reviews={reviews}
          loggedInUserId={loggedInUserId}
          onPageChange={(page) => console.log(`Page changed to: ${page}`)}
        />
      </Grid>
    </Grid>
  );
};

export default ReviewsOfBook;
