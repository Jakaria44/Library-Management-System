/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import BookCard from "./BookCard";
// import BookCard from "./BookCard";

const Books = ({ books, direction }) => {
  //   if(!books?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={2}
      overflow="scroll"
    >
      {books.map((item, idx) => (
        <Box key={idx}>
          <BookCard book={item} />
        </Box>
      ))}
    </Stack>
  );
};

export default Books;
