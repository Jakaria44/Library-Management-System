import BooksList from "./BooksList";
import Filters from "./Filters";

import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
export const sortOptions = [
  { query: "TITLE", name: "Title" },
  { query: "PAGE", name: "Number of Page" },
  { query: "RATING", name: "Rating" },
  { query: "FAVOURITE", name: "Most Favourite" },
  { query: "PUBLISH_YEAR", name: "Latest" },
];
export const defaultQueryOptions = {
  perPage: 32,
  page: 1,
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
};
const AllBooks = ({ queries = defaultQueryOptions, title = "All Books" }) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [queryOptions, setQueryOptions] = useState(defaultQueryOptions);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // [] is the initial state value
  const [total, setTotal] = useState(0); // 0 is the initial state value
  // const count = Math.ceil(data.length / queryOptions.perPage);
  // const count = Math.ceil(total / queryOptions.perPage);

  const count = useMemo(() => total, [total]);
  const handleChange = (e, p) => {
    setQueryOptions({ queries, page: p });
    loadAllBooks({ queries, page: p });
  };

  useEffect(() => {
    loadAllBooks(queries);
  }, []);
  // useEffect(() => {
  //   const a = Object.fromEntries(
  //     Array.from(searchParams.entries()).filter(
  //       ([key, value]) => value !== "null"
  //     )
  //   );

  //   console.log(a);

  //   loadAllBooks(a);
  // }, [searchParams]);

  const loadAllBooks = async (queryOptions = queries) => {
    setLoading(true);
    try {
      // const a = Array.from(searchParams.entries())
      //   .filter(([key, value]) => value !== "null")
      //   .map((item) => item[0] + "=" + item[1])
      //   .join("&");
      // console.log(a);
      setSearchParams(queryOptions);
      const res = await server.get("/all-books-sum", { params: queryOptions });
      console.log("res");
      setTotal(res.data.totalPages);
      console.log(res.data.totalPages);
      setData(
        res.data.rows?.map((e) => ({
          ISBN: e.ISBN,
          TITLE: e.TITLE,
          IMAGE: e.IMAGE,
          EDITION_ID: e.EDITION_ID,
          // PAGE:  ,
          // LANGUAGE:  ,
          // PUBLISH_YEAR:  ,
          AUTHORS: e.AUTHORS,
          // RATING:  ,
          // FAVOURITE:  ,
          IS_FAVOURITE: e.IS_FAVOURITE,
        }))
      );
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        pb={1}
        display="flex"
        flexDirection={matchesXs ? "column" : "row"} // Change flex direction on small devices
        justifyContent="space-between"
        alignItems={matchesXs ? "center" : "center"} // Align items differently on small devices
      >
        <Box flexGrow={1} />
        <Box>
          <Typography
            variant="h2"
            textAlign="center"
            gutterBottom
            component="div"
          >
            {title}
          </Typography>
        </Box>

        {/* Place your components to be displayed at the right end here */}
        <Box
          id="sort-by"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <Box flexGrow={10} />
          <Box paddingRight={1}>
            <Typography variant="subtitle1">Sort by</Typography>
          </Box>
          <Box flexGrow={1}>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={queryOptions.sort}
                onChange={(e) => {
                  setQueryOptions({ ...queryOptions, sort: e.target.value });
                  loadAllBooks({ ...queryOptions, sort: e.target.value });
                }}
              >
                {sortOptions.map((item, index) => (
                  <MenuItem key={index} value={item.query}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box flexGrow={1}>
            <Tooltip title="Ascending">
              <IconButton
                onClick={() => {
                  setQueryOptions({ ...queryOptions, order: "ASC" });
                  loadAllBooks({ ...queryOptions, order: "ASC" });
                }}
                color={queryOptions.order === "ASC" ? "success" : "inherit"}
              >
                <ArrowCircleDown
                  fontSize={queryOptions.order === "ASC" ? "large" : "small"}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Descending">
              <IconButton
                onClick={() => {
                  setQueryOptions({ ...queryOptions, order: "DESC" });
                  loadAllBooks({ ...queryOptions, order: "DESC" });
                }}
                color={queryOptions.order === "DESC" ? "success" : "inherit"}
              >
                <ArrowCircleUp
                  fontSize={queryOptions.order === "DESC" ? "large" : "small"}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Filters queries={queries} loadAllBooks={loadAllBooks} />

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
        }}
      >
        <Pagination
          sx={{ margin: "auto" }}
          // showFirstButton
          // showLastButton
          count={count}
          color="primary"
          page={queryOptions.page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default AllBooks;
