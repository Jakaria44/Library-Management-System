import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";

const BookCard = ({ book }) => {
  return (
    <Card sx={{ m: 2, maxWidth: 345, maxHeight: 600 }}>
      <CardMedia
        sx={{ height: 440 }}
        image={book.IMAGE}
        alt="image of book"
        title={book.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.TITLE}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.TITLE}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
        <Button size="small">Read Later</Button>
      </CardActions>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookCard;
