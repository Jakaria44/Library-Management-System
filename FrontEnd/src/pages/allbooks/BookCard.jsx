import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{ minWidth: 200, maxWidth: 345, margin: "auto" }}
        image={book.IMAGE}
        alt="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="text.primary "
        >
          {book.TITLE}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.AUTHORS}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/details/${book.ISBN}`}>
          <Button center size="small">
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default BookCard;
