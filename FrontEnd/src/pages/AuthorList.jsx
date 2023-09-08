import { ChevronRight, Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Input,
  Pagination,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import server from "./../HTTP/httpCommonParam";
const GridForCard = styled(Grid)(({ theme }) => ({
  transition: "transform 0.3s", // Add a smooth transition
  "&:hover": {
    transform: "scale(1.03)", // Scale up by 10% on hover
  },
}));

const AuthorList = () => {
  // const opened = useMenu().menuOpened.opened;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // [] is the initial state value
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 100;
  const loadAllAuthors = async () => {
    try {
      setLoading(true);
      const response = await server.get("/getAuthor");
      setData(response.data);
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllAuthors();
  }, [page]);

  const visibleAuthorss = useMemo(() => {
    if (value === "") {
      return data.slice((page - 1) * perPage, page * perPage);
    }
    return data
      .filter((item) => item.NAME.toLowerCase().includes(value.toLowerCase()))
      .slice((page - 1) * perPage, page * perPage);
  }, [value, data]);
  const OPTIONS = useMemo(() => data.map((item) => item), [data]);
  const total = data.length;
  const count = Math.ceil(total / perPage);
  return (
    <>
      <Box
        pb={2}
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
            Authors
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
          <Box flexGrow={4} />

          <Box flexGrow={1}>
            <Input
              endAdornment={<Search />}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              fullWidth
              placeholder="Search"
            />
          </Box>
          <Box flexGrow={1} />
        </Box>
      </Box>
      <Grid item xs={12} container direction="row" spacing={2}>
        {!loading &&
          visibleAuthorss?.map((item) => (
            <GridForCard
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item.AUTHOR_ID}
              margin="auto"
              p={2}
            >
              <AuthorCard author={item} />
            </GridForCard>
          ))}
        {loading &&
          new Array(perPage).fill(0).map((_, index) => (
            <GridForCard
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              margin="auto"
              paddingX={2}
              paddingY={2}
            >
              <AuthorCard />
            </GridForCard>
          ))}
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
          showFirstButton
          showLastButton
          count={count}
          color="primary"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </>
  );
};

export default AuthorList;

const AuthorCard = ({ author = null }) => {
  return (
    <Card sx={{ margin: "auto", width: "100%  " }}>
      {author === null ? (
        <Box>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={240}
          />
          <Skeleton animation="wave" variant="text" width="100%" height={50} />
        </Box>
      ) : (
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={author.IMAGE}
            alt={author.NAME}
          />
          <CardContent>
            <Box
              component={Link}
              to={"/authors/" + author.AUTHOR_ID + "/" + author.NAME}
              sx={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                height: "100%",
              }}
            >
              <Typography gutterBottom variant="body2" component="div">
                {author.NAME}
              </Typography>
              <ChevronRight color="primary" />
            </Box>
          </CardContent>
        </CardActionArea>
      )}
      {/* <CardActions>
        <Button size="small" color="success">
          View Books
        </Button>
      </CardActions> */}
    </Card>
  );
};
