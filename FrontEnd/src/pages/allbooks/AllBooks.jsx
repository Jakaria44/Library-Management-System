import { ArrowCircleDown, ArrowCircleUp, ArrowDownward, FilterList } from "@mui/icons-material";
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
import BooksList from "./BooksList";
import Filters from "./Filters";

export const sortOptions = [
    { query: "TITLE", name: "Title (A-Z)", order: "ASC" },
    { query: "TITLE2", name: "Title (Z-A)", order: "DESC" },
    { query: "PAGE", name: "Number of Page (Low to High)", order: "ASC" },
    { query: "PAGE2", name: "Number of Page (High to Low)", order: "DESC" },
    { query: "RATING", name: "Rating (Low to High)", order: "ASC" },
    { query: "RATING2", name: "Rating (High to Low)", order: "DESC" },
    { query: "FAVOURITE", name: "Favourite count (Low to High) ", order: "ASC" },
    { query: "FAVOURITE2", name: "Favourite count (High to Low) ", order: "DESC" },
    { query: "PUBLISH_YEAR", name: "Latest", order: "DESC" },
    { query: "PUBLISH_YEAR2", name: "Oldest", order: "ASC" },
];

let maxPage = 5000,
    minYear = 1000,
    maxYear = new Date().getFullYear(),
    minPage = 0;

export const defaultQueryOptions = {
    perPage: 20,
    page: 1,
    sort: sortOptions[0].query,
    order: sortOptions[0].order,
    MY_RAT: false,
    MY_FAV: false,
    TITLE: null,
    LANGUAGE: null,
    PUBLISHER_ID: null,
    AUTHOR_ID: null,
    GENRE_ID: null,
    PAGE_START: minPage,
    PAGE_END: maxPage,
    YEAR_START: minYear,
    YEAR_END: maxYear,
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
    //     alert(queryOptions.sort);
    // }, [queryOptions]);
    const loadAllBooks = async (queryOptions = queries) => {
        setLoading(true);
        try {
            let res2 = await server.get("/getRanges");
            console.log(res2.data);
            minPage = parseInt(res2.data.MIN_PAGE);
            maxPage = parseInt(res2.data.MAX_PAGE);
            minYear = parseInt(res2.data.MIN_YEAR);
            maxYear = parseInt(res2.data.MAX_YEAR);
            const res = await server.get("/all-books-sum", { params: queryOptions });
            console.log("res");
            setTotal(res.data.totalPages);
            console.log(res.data.rows);
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
                    RATING: e.RATING,
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
                    <Typography variant="h2" textAlign="center" gutterBottom component="div">
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
                            {/* <Select
                                id="demo-simple-select"
                                value={queryOptions.sort}
                                onChange={(e) => {
                                    setQueryOptions({
                                        ...queryOptions,
                                        sort: e.target.value.query,
                                        order: e.target.value.order,
                                    });
                                    loadAllBooks({
                                        ...queryOptions,
                                        sort: e.target.value.query,
                                        order: e.target.value.order,
                                    });
                                }}
                            >
                                {sortOptions.map((item, index) => (
                                    <MenuItem key={index} value={{query: item.query, order: item.order}}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select> */}
                            <Select
                                id="demo-simple-select"
                                value={queryOptions.sort} // Use only queryOptions.sort here
                                onChange={(e) => {
                                    const selectedSort = e.target.value;
                                    // Validate that selectedSort is a valid sort option
                                    if (sortOptions.find((option) => option.query === selectedSort)) {
                                        setQueryOptions({
                                            ...queryOptions,
                                            sort: selectedSort, // Set the selectedSort value
                                            order: sortOptions.find((option) => option.query === selectedSort).order, // Set the order value
                                        });
                                        loadAllBooks({
                                            ...queryOptions,
                                            sort: selectedSort, // Set the selectedSort value for loading
                                            order: sortOptions.find((option) => option.query === selectedSort).order, // Set the order value
                                        });
                                    } else {
                                        // Handle invalid sort option, e.g., show an error message
                                        console.error("Invalid sort option:", selectedSort);
                                    }
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
                                // onClick={() => {
                                //     setQueryOptions({ ...queryOptions, order: "ASC" });
                                //     loadAllBooks({ ...queryOptions, order: "ASC" });
                                // }}
                                color="success"
                                sx={{ display: queryOptions.order === "DESC" ? "none" : "block" }}
                            >
                                <FilterList sx={{ rotate: "180deg" }} fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Descending">
                            <IconButton
                                // onClick={() => {
                                //     setQueryOptions({ ...queryOptions, order: "DESC" });
                                //     loadAllBooks({ ...queryOptions, order: "DESC" });
                                // }}
                                color="success"
                                sx={{ display: queryOptions.order === "ASC" ? "none" : "block" }}
                            >
                                <FilterList fontSize="large" />
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
