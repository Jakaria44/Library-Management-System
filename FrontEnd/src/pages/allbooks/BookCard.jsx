import { FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const handleAddToFavourite = () => {
    // Implement your add to favourite functionality here
    console.log("Added to favourite:", book.TITLE);
    // setSnackbarOpen(true);
  };

  return (
    <Card sx={{ width: 200, height: 370 }} elevation={12}>
      <CardMedia
        component="img"
        sx={{ height: 220, maxWidth: 140, margin: "auto" }}
        image={book.IMAGE}
        alt={book.TITLE}
      />
      <CardContent marginBottom="0px">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="text.primary "
          sx={{ maxHeight: 48 }}
        >
          {book.TITLE}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {book.AUTHORS}
        </Typography>
      </CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Tooltip title="View Details" placement="top">
          <IconButton
            component={Link}
            to={`/details/${book.ISBN}`}
            center
            size="large"
            color="primary"
            // margin="8px"
          >
            <RemoveRedEye />
          </IconButton>
        </Tooltip>

        <Tooltip title="Add To Favourite" placement="top">
          <IconButton
            onClick={handleAddToFavourite}
            center
            size="large"
            color="primary"
          >
            <FavoriteBorder />
          </IconButton>
        </Tooltip>
      </div>
      {/* TODO: check if it is already in user's favourite list or not. */}
    </Card>
  );
};

export default BookCard;
