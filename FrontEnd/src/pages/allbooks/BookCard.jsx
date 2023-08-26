import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import server from "./../../HTTP/httpCommonParam";
/*  
"ISBN": "9781408894743",
    "TITLE": "Harry Potter and the Deathly Hallows",
    "IMAGE": "https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/Harry_Potter_and_the_Deathly_Hallows_(Se-J.K_Rowling-699a7-122325.jpg",
    "PUBLISH_YEAR": 2007,
    "PAGE": 608,
    "LANGUAGE": "English",
    "AUTHORS": "J. K. Rowling",
    "RATING": 5,
    "PUBLISHER": "Bloomsbury Publishing",
    "IS_FAVOURITE": 1,
    "IS_IS_FAVOURITE": 1
*/
const BookCard = ({ book }) => {
  const [isFavourite, setIsFavourite] = useState(book.IS_FAVOURITE);
  const handleAddToFavourite = () => {
    if (
      localStorage.getItem("role") === "user" ||
      localStorage.getItem("role") === "employee"
    ) {
      changeFavouriteStatus();
    }
  };
  const changeFavouriteStatus = async () => {
    // remove from favourite
    const response = await server.post(`/edit-favourite?id=${book.ISBN}`);
    console.log(response);
    setIsFavourite(response.data.IS_FAVOURITE);
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

        <Tooltip
          title={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          placement="top"
        >
          <IconButton
            onClick={handleAddToFavourite}
            center
            size="large"
            color="primary"
          >
            {isFavourite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </div>
      {/* TODO: check if it is already in user's favourite list or not. */}
    </Card>
  );
};

export default BookCard;
