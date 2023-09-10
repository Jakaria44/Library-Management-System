/**
 * {
  "ISBN": "9781402081163",
  "TITLE": "An Annotated Timeline of Operations Research",
  "IMAGE": "http://books.google.com/books/content?id=kTqAjaXEBGUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  "LANGUAGE": "en",
  "AUTHORS": "Saul I. Gass, Arjang A. Assad"
}
 * 
 */

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
const CardForSearchbar = ({ book }) => {
  // const book = {
  //   ISBN: "9781402081163",
  //   TITLE: "An Annotated Timeline of Operations Research",
  //   IMAGE:
  //     "http://books.google.com/books/content?id=kTqAjaXEBGUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  //   LANGUAGE: "en",
  //   AUTHORS: "Saul I. Gass, Arjang A. Assad",
  // };
  return book.length === 0 ? (
    <h1>Book not found</h1>
  ) : (
    book.map((item) => (
      <Card sx={{ display: "flex", borderRadius: 0, height: 120 }}>
        <CardActionArea component={Link} to={`/details/${item.ISBN}`}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: 100,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 60, height: 100 }}
              image={item.IMAGE}
              alt="Live from space album cover"
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography gutterBottom component="div" noWrap variant="h4">
                {item.TITLE}
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                noWrap
              >
                {item.AUTHORS}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                noWrap
              >
                ISBN: {item.ISBN}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    ))
  );
};

export default CardForSearchbar;
