import { ChevronRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import server from "../../HTTP/httpCommonParam";
import TimeFormat from "../../utils/TimeFormat";
import BookCard from "../allbooks/BookCard.jsx";
import Contribution from "./Contribution";
import { about } from "./info";

const Home = () => {
  return (
    <>
      <Welcome />
      <NewsList />
      {/* <TopRated /> */}
      <About />

      <Contribution />
    </>
  );
};

export default Home;

const About = () => {
  return (
    <>
      <Typography textAlign="center" variant="body1" fontSize={30} gutterBottom>
        About This Library
      </Typography>
      {about.map((item, index) => (
        <Paper elevation={24} sx={{ marginY: 3 }}>
          <Grid container p={0} justifyContent="space-between">
            {index % 2 == 1 && (
              <Grid item xs={5}>
                <img src={item.image} alt="About" width="100%" height="100%" />
              </Grid>
            )}
            <Grid item xs={6} margin={3} padding={3}>
              <Typography variant="h2" gutterBottom pb={2}>
                {item.title}
              </Typography>
              <Typography
                mx={2}
                textAlign="justify"
                variant="body2"
                fontSize={16}
              >
                {item.description}
              </Typography>
            </Grid>

            {index % 2 == 0 && (
              <Grid item xs={5}>
                <img src={item.image} alt="About" width="100%" height="100%" />
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}
    </>
  );
};

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);

  const getTopRated = async () => {
    try {
      const res = await server.get(
        "/all-books-sum?sort=RATING&order=DESC&perPage=4"
      );
      setTopRated(res.data.rows);
    } catch (err) {
      setTopRated([]);
      console.log(err);
    }
  };

  useEffect(() => {
    getTopRated();
  }, []);

  return (
    <Paper
      sx={{
        padding: 3,
        marginY: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h2" gutterBottom>
            Top Rated Books
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <Grid container spacing={2}>
          {topRated?.map((book, index) => (
            <Grid item key={index}>
              <BookCard book={book} />
            </Grid>
          ))}
          <Grid margin="auto" item xs>
            <Card>
              <CardActionArea component={Link} to="/allbooks">
                <Typography variant="h3" gutterBottom>
                  See More
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const Welcome = () => {
  return (
    <Paper
      elevation={24}
      style={{
        backgroundImage: `url(./../../public/Main.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        elevation: 3,
        padding: "20px",
        filter: "brightness(10%);",
        marginBottom: "2vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box flexGrow={3} mt={5}>
          <Typography
            fontFamily={"sans-serif"}
            textAlign="center"
            fontSize={50}
            fontStyle="bold"
            color="#fff"
            gutterBottom
          >
            Welcome to Book Breeze
          </Typography>
          <Typography gutterBottom textAlign="center" variant="h2" color="#fff">
            The Best Library Management System
          </Typography>
          <Box mt={15}>
            <Typography
              gutterBottom
              fontStyle={"italic"}
              fontSize={25}
              textAlign={"center"}
              marginX={20}
              color="#fff"
            >
              BookBreeze offers a comprehensive solution for both readers and
              library staff, ensuring a seamless and efficient library
              experience.
            </Typography>
          </Box>
        </Box>

        <Box style={{ marginTop: 80, marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <Link to="/allbooks">
              <Button
                variant="outlined"
                endIcon={<ChevronRight fontSize="large" />}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </Box>
      </Box>
    </Paper>
  );
};
const customScrollbarStyle = {
  scrollbarWidth: "thin",
  "-webkit-scrollbar": {
    width: "2px", // Adjust the width of the scrollbar
  },
  "-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Customize the thumb color
  },
  "-webkit-scrollbar-track": {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Customize the track color
  },
  // Show the scrollbar when there's overflow
  overflowY: "auto",
};
const NewsList = () => {
  const [allnews, setAllNews] = useState([]);

  const getALlNews = async () => {
    try {
      const res = await server.get("/publish-news");
      setAllNews(res.data);
    } catch (err) {
      setAllNews([]);
      console.log(err);
    }
  };

  useEffect(() => {
    getALlNews();
  }, []);

  return (
    <Paper elevation={24} sx={{ padding: 3, marginY: 3 }}>
      <Typography textAlign="center" variant="body1" fontSize={30} gutterBottom>
        Latest News
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {allnews.slice(0, 2).map((news, i) => (
          <Grid
            maxHeight={270}
            overflowY="scroll"
            style={{ ...customScrollbarStyle, scrollbarWidth: "none" }}
            item
            xs={5}
            key={news.NEWS_ID}
          >
            <Typography variant="subtitle2" gutterBottom>
              {TimeFormat(news.NEWS_DATE)}
            </Typography>

            <Typography
              variant="body2"
              fontSize={16}
              mb={3}
              textAlign="justify"
              gutterBottom
            >
              {news.NEWS_TEXT}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
