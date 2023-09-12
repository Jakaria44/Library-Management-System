import { ChevronRight } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea, Grid, Paper, Typography } from "@mui/material";
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
            <About />

            <Paper elevation={24} sx={{ padding: 3, marginY: 3 }}>
                <Typography textAlign="center" variant="h3" gutterBottom>
                    Contributed By
                </Typography>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs>
                        <Typography textAlign="left" variant="body2" gutterBottom>
                            <b>FRONTEND</b>
                            <br />
                            Name: Md. Jakaria Hossain
                            <br />
                            Student ID: 2005026
                            <br />
                            Email: mdjakaria442020@gmail.com
                        </Typography>
                        <Grid container direction="row" justifyContent="flex-start">
                            <img
                                src="https://avatars.githubusercontent.com/Jakaria44"
                                alt="GitHub Avatar"
                                width="20"
                                height="20"
                                style={{ marginRight: "8px" }}
                            />
                            <Typography
                                textAlign="left"
                                variant="body2"
                                gutterBottom
                                onMouseOver={() => window.open("https://github.com/Jakaria44")}
                                style={{ cursor: "pointer" }}
                            >
                                <b>GitHub Link</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Typography textAlign="right" variant="body2" gutterBottom>
                            <b>BACKEND</b>
                            <br />
                            Name: Ahmmad Nur Swapnil
                            <br />
                            Student ID: 2005009
                            <br />
                            Email: a.n.swapnil2003@gmail.com
                        </Typography>
                        <Grid container direction="row" justifyContent="flex-end">
                            <img
                                src="https://avatars.githubusercontent.com/AN-SWAPNIL"
                                alt="GitHub Avatar"
                                width="20"
                                height="20"
                                style={{ marginRight: "8px" }}
                            />
                            <Typography
                                textAlign="right"
                                variant="body2"
                                gutterBottom
                                onMouseOver={() => window.open("https://github.com/AN-SWAPNIL")}
                                style={{ cursor: "pointer" }}
                            >
                                <b>GitHub Link</b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default Home;

const About = () => {
    return (
        <>
            <Typography variant="h2" textAlign="center" gutterBottom>
                About This Library
            </Typography>
            <Paper elevation={24} sx={{ marginY: 3 }}>
                <Grid container p={0} justifyContent="space-between">
                    <Grid item xs={6} margin={3} padding={3}>
                        <Typography variant="h3" gutterBottom pb={2}>
                            For Readers
                        </Typography>
                        <Typography mx={2} textAlign="justify" variant="subtitle1">
                            BookBreeze is designed with readers in mind. As a reader, you can easily search for books,
                            apply filters to find your preferred genres, authors, and publishers. You have the
                            opportunity to rate and review books and even preview them. Additionally, you can see your
                            personal library, including all the books you've interacted with. If you wish to borrow a
                            book, simply make a request for the desired duration. Please note that returning books on
                            time is essential to avoid fines. You can also apply for employment opportunities within the
                            library and receive notifications regarding your applications, book requests, and more.
                            There are plenty of features waiting for you to explore.
                        </Typography>
                    </Grid>

                    <Grid item xs={5}>
                        <img src="/pic12.png" alt="About" width="100%" height="100%" />
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={24} sx={{ marginY: 3 }}>
                <Grid container p={0}>
                    <Grid item xs={5}>
                        <img src="/pic22.png" alt="About" width="100%" height="100%" />
                    </Grid>
                    <Grid item xs={6} margin={3} padding={3}>
                        <Typography variant="h3" gutterBottom pb={2}>
                            For Employees
                        </Typography>
                        <Typography mx={2} textAlign="justify" variant="subtitle1">
                            BookBreeze offers a user-friendly platform for library employees. You can efficiently manage
                            book data by inserting, updating, or removing books, editions, genres, authors, and
                            publishers. You have the ability to notify users for various reasons, including fine
                            reminders. As an employee, you can publish news and enjoy all the functionalities available
                            to readers. You are responsible for handling book requests and can choose to apply for other
                            job positions or resign as needed. Exceptional performance may lead to promotion to an admin
                            role through the admin panel. BookBreeze offers a comprehensive set of tools to streamline
                            your library management tasks.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={24} sx={{ marginY: 3 }}>
                <Grid container p={0} justifyContent="space-between">
                    <Grid item xs={6} margin={3} padding={3}>
                        <Typography variant="h3" gutterBottom pb={2}>
                            For Admins
                        </Typography>
                        <Typography mx={2} textAlign="justify" variant="subtitle1">
                            Admins play a pivotal role in BookBreeze, overseeing all aspects of library management. They
                            have access to valuable statistics on rentals and fines, broken down by month. Admins can
                            accept job applications and manage job listings, including hiring and firing employees. They
                            can also send notifications and publish news articles. Admins enjoy the same privileges as
                            employees and readers, with the added responsibility of guiding library operations. If
                            desired, admins can step down from their role to become general users or promote employees
                            to the admin panel. In essence, an admin is the key figure responsible for the library's
                            smooth operation and success.
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <img src="/pic32.png" alt="About" width="100%" height="100%" />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

const TopRated = () => {
    const [topRated, setTopRated] = useState([]);

    const getTopRated = async () => {
        try {
            const res = await server.get("/all-books-sum?sort=RATING&order=DESC&perPage=4");
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
            {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity (0.5 is 50% darkness)
          zIndex: 1, // Ensure the overlay is on top of the image
        }}
      ></div> */}
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
                            BookBreeze offers a comprehensive solution for both readers and library staff, ensuring a
                            seamless and efficient library experience.
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
                            <Button variant="outlined" endIcon={<ChevronRight fontSize="large" />}>
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
            <Typography variant="h2" pb={3}>
                Latest News
            </Typography>
            <Grid container direction="row" alignItems="center" justifyContent="space-between">
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

                        <Typography variant="subtitle1" mb={3} gutterBottom>
                            {news.NEWS_TEXT}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};
