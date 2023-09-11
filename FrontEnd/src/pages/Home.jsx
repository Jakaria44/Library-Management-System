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
import server from "./../HTTP/httpCommonParam";
import BookCard from "./../pages/allbooks/BookCard.jsx";
import TimeFormat from "./../utils/TimeFormat";
const Home = () => {
  return (
    <>
      <Welcome />
      <NewsList />
      {/* <TopRated /> */}
    </>
  );
};

export default Home;

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
      style={{
        backgroundImage: `url(./../../public/Main.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        elevation: 3,
        padding: "20px",
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
        <Box flexGrow={3}>
          <Typography variant="h1" color="#fff">
            Welcome to Book Breeze
          </Typography>
        </Box>

        <Box style={{ marginTop: 300 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <Button
              component={Link}
              to="/signin"
              variant="outlined"
              endIcon={<ChevronRight />}
            >
              Get Started
            </Button>
          </div>
        </Box>
      </Box>
    </Paper>
  );
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
    <Paper sx={{ padding: 3, marginY: 3 }}>
      <h1>Latest News</h1>
      <div className="container">
        {allnews.slice(0, 2).map((news) => (
          <div className="card" key={news.NEWS_ID}>
            <h5 className="card-title">{TimeFormat(news.NEWS_DATE)}</h5>
            <Typography variant="h3" gutterBottom>
              {news.NEWS_TEXT}
            </Typography>
          </div>
        ))}
      </div>
    </Paper>
  );
};
