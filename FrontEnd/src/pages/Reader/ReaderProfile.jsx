import {
  ArrowForwardIos,
  AutoStories,
  Description,
  Favorite,
  ReceiptLongSharp,
  Reviews,
} from "@mui/icons-material";
import { Card, Grid, Typography } from "@mui/material";
import React, { cloneElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileInfo from "../ProfileInfo.jsx";
// import server from '../../HTTP/httpCommonParam';
const ReaderProfile = () => {
  const [user, setUser] = useState({
    ID: "1",
    FIRST_NAME: "Jakaria",
    LAST_NAME: "Hossain",
    ADDRESS: "Pabna, Bangladesh",
    CONTACT_NO: "123-456-7890",
    GENDER: "M",
    EMAIL: "abc@gmail.com",
    IMAGE: "https://placekitten.com/400/400", // Replace with your image URL
  });

  useEffect(() => {
    // server.get('/ge')
    // const id = localStorage.getItem("userId");
    // setUser();
  }, []);
  const pageList = [
    {
      icon: <Favorite />,
      text: "My Favorites",
      url: "/favourites",
    },
    {
      icon: <Reviews />,
      text: "My Reviews",
      url: "/reviews",
    },
    {
      icon: <Description />,
      text: "My Applications",
      url: "/applications",
    },
    {
      icon: <AutoStories />,
      text: "My Collections",
      url: "/collections",
    },
    {
      icon: <ReceiptLongSharp />,
      text: "My Due List",
      url: "/duelist",
    },
  ];
  return (
    <>
      <ProfileInfo user={user} />
      <Card sx={{ marginTop: "3vh", padding: { md: "26px" } }} elevation={3}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {pageList.map((page, index) => (
            <Grid
              key={index}
              item
              container
              xs={12}
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                component={Link}
                to={page.url}
                container
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: "80%",
                  height: "100px",
                  backgroundColor: "itemBackground",
                  borderRadius: "12px",
                  padding: "16px",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "background-color 0.3s, opacity 0.3s",
                  "&:hover": {
                    backgroundColor: "itemBackgroundHover",
                    opacity: 1,
                  },
                }}
              >
                <Grid
                  item
                  xs={2}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  {cloneElement(page.icon, {
                    color: "primary",
                    fontSize: "large",
                  })}
                </Grid>
                <Grid
                  item
                  xs={8}
                  container
                  alignItems="center"
                  justifyContent="center"
                  sx={{ paddingLeft: "16px", paddingRight: "16px" }}
                >
                  <Typography variant="h2">{page.text} </Typography>
                </Grid>
                <Grid
                  xs={2}
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <ArrowForwardIos fontSize="large" color="primary" />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default ReaderProfile;