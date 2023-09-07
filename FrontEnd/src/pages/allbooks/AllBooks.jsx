import BooksList from "./BooksList";
import Filters from "./Filters";

import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMenu } from "../../contexts/MenuContextProvider";
import server from "./../../HTTP/httpCommonParam";
import { sortOptions } from "./Filters";
const AllBooks = () => {
  const { opened } = useMenu();
  const [queryOptions, setQueryOptions] = useState({
    sort: sortOptions[0].query,
    order: "ASC",
    MY_RAT: false,
    MY_FAV: false,
    TITLE: null,
    LANGUAGE: null,
    PUBLISHER_ID: null,
    AUTHOR_ID: null,
    GENRE_ID: null,
    PAGE_START: 0,
    PAGE_END: 2040,
    YEAR_START: 1970,
    YEAR_END: 2022,
    RATING_START: 0,
    RATING_END: 5,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // [] is the initial state value
  useEffect(() => {
    loadAllBooks();
  }, []);

  // useEffect(() => {
  //   loadAllBooks();
  // }, []);
  const loadAllBooks = async () => {
    setLoading(true);
    try {
      const res = await server.get("/all-books-sum", { params: queryOptions });
      console.log("res");
      setData(res.data);
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // console.log(allBooks.data);
  return (
    <>
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom
        // px={2}
        pb={1}
        component="div"
      >
        ALL Books
      </Typography>

      <Grid container spacing={2}>
        <Filters
          queryOptions={queryOptions}
          setQueryOptions={setQueryOptions}
          loadAllBooks={loadAllBooks}
        />

        {/* <React.Suspense fallback={<SpinnerWithBackdrop backdropOpen={true} helperText='Loading books. Plase wait'/>}> */}

        <BooksList data={data.map((e) => e)} loading={loading} />

        {/* </React.Suspense> */}
        {/* <SignupDialog /> */}
        {/* <SignupDialog
        showMessage={showMessage}
        message="Please Sign In to Add to Favourite"
        HandleModalClosed={() => {
          setShowMessage(false);
        }}
      /> */}
      </Grid>
    </>
  );
};

export default AllBooks;
