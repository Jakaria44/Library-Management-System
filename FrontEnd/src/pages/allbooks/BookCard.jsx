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
import SignupDialog from "../../component/SignupDialog";
import server from "./../../HTTP/httpCommonParam";
const BookCard = ({ book }) => {
  const [isFavourite, setIsFavourite] = useState(book.IS_FAVOURITE);
  const [showMessage, setShowMessage] = useState(false);
  const handleAddToFavourite = () => {
    if (
      localStorage.getItem("role") === "user" ||
      localStorage.getItem("role") === "employee"
    ) {
      changeFavouriteStatus();
    } else {
      // do some pop up;
      setShowMessage(true);
    }
  };

  const changeFavouriteStatus = async () => {
    // remove from favourite
    const response = await server.post(`/edit-favourite?id=${book.ISBN}`);
    console.log(response);
    setIsFavourite(response.data.IS_FAVOURITE);
  };

  return (
    <>
      <Card sx={{ width: { sm: 200, xs: "100%" }, height: 370 }} elevation={12}>
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
          <Typography variant="body1" noWrap color="text.secondary">
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
      </Card>

      <SignupDialog
        showMessage={showMessage}
        message="Please sign up to add.."
        HandleModalClosed={() => {
          setShowMessage(false);
        }}
      />
    </>
  );
};

export default BookCard;
