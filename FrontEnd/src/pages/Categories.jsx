import { ChevronRight, Search } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Input,
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

const Categories = () => {
  // const opened = useMenu().menuOpened.opened;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // [] is the initial state value
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState("");
  const loadAllGenres = async () => {
    try {
      setLoading(true);
      const response = await server.get("/getGenre");
      setData(response.data);
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllGenres();
  }, []);

  const visibleGenres = useMemo(() => {
    if (value === "") {
      return data;
    }
    return data.filter((item) =>
      item.GENRE_NAME.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, data]);
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
            ALL Categories
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
          visibleGenres?.map((item) => (
            <GridForCard
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item.GENRE_ID}
              margin="auto"
              p={2}
            >
              <CategoryCard category={item} />
            </GridForCard>
          ))}
        {loading &&
          new Array(16).fill(0).map((_, index) => (
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
              <CategoryCard />
            </GridForCard>
          ))}
      </Grid>
    </>
  );
};

export default Categories;

const CategoryCard = ({ category = null }) => {
  return (
    <Card sx={{ margin: "auto", width: "100%  " }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image={category.IMAGE}
          alt={category.GENRE_NAME}
        /> */}
        <CardContent>
          {category === null ? (
            <Skeleton variant="text" width="100%" height={20} />
          ) : (
            <Box
              component={Link}
              to={
                "/categories/" + category.GENRE_ID + "/" + category.GENRE_NAME
              }
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
                {category.GENRE_NAME}
              </Typography>{" "}
              <ChevronRight color="primary" />
            </Box>
          )}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="success">
          View Books
        </Button>
      </CardActions> */}
    </Card>
  );
};
