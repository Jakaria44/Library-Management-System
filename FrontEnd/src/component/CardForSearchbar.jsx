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

import { Grid } from "@mui/material";

const CardForSearchbar = ({}) => {
  const book = {
    ISBN: "9781402081163",
    TITLE: "An Annotated Timeline of Operations Research",
    IMAGE:
      "http://books.google.com/books/content?id=kTqAjaXEBGUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    LANGUAGE: "en",
    AUTHORS: "Saul I. Gass, Arjang A. Assad",
  };
  return (
    <Grid container height={3} spacing={2} sx={{ width: "100%" }}>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={3}>
          <img src={book.IMAGE} alt={book.TITLE} />
        </Grid>
        <Grid item xs={9}>
          <h3>{book.TITLE}</h3>
          <p>{book.AUTHORS}</p>
          <p>{book.LANGUAGE}</p>
          <p>{book.ISBN}</p>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={3}>
          <img src={book.IMAGE} alt={book.TITLE} />
        </Grid>
        <Grid item xs={9}>
          <h3>{book.TITLE}</h3>
          <p>{book.AUTHORS}</p>
          <p>{book.LANGUAGE}</p>
          <p>{book.ISBN}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardForSearchbar;
