import { Box, Typography } from "@mui/material";
// import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import server from "./../HTTP/httpCommonParam";
import Books from "./Books";
const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  const getAllBooks = async () => {
    const books = await server.get("/all-books-sum");
    setAllBooks(books.data);
  };

  useEffect(() => {
    getAllBooks().then(console.log(allBooks));
  }, []);
  return (
    <>
      <Box
        flexDirection="column"
        component="div"
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          alignContent: "center",
          display: "flex",
        }}
      >
        <Typography variant="h4">All Books</Typography>
        <Box flexDirection="row" sx={{ height: "90vh" }}>
          <Books books={allBooks} />
        </Box>
      </Box>
    </>
  );
};

export default AllBooks;
