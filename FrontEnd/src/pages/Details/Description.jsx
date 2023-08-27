import { Book, Business, Person } from "@mui/icons-material";
import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
import AuthorComponent from "./AuthorComponent";
import PublicationComponent from "./PublicationComponent";
const Description = ({ book }) => {
  const [tabValue, setTabValue] = useState(0);

  const [publisher, setPublisher] = useState();
  useEffect(() => {
    getPublisherDetails();
  }, []);

  const getPublisherDetails = async () => {
    try {
      const response = await server.get(
        `/getPublisher?pid=${book.PUBLISHER_ID}`
      );
      console.log(response.data);
      setPublisher(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Grid mt={2} item container xs={12} direction="row" spacing={2}>
      <Grid
        direction="row"
        xs={12}
        container
        backgroundColor="background.default"
        borderRadius="12px"
        justifyContent="center"
        p={2}
      >
        <Tabs value={tabValue} onChange={handleChange} centered>
          <Tab icon={<Book />} label="Book Details" />
          <Tab icon={<Business />} label="Publication" />

          {JSON.parse(book.AUTHOR).map((author, i) => (
            <Tab key={i} icon={<Person />} label={`Author ${i}`} />
          ))}
        </Tabs>
        {tabValue === 0 && <BookDescription book={book} />}
        {tabValue === 1 && <PublicationDetails publisher={publisher} />}
        {tabValue > 1 && (
          <AuthorDetails id={JSON.parse(book.AUTHOR)[tabValue - 2]} />
        )}
      </Grid>
    </Grid>
  );
};

export default Description;

const BookDescription = ({ book }) => {
  return (
    <Grid container direction="column" item xs={12} padding={2}>
      <Typography variant="h2">{book.TITLE}</Typography>
      <Typography variant="h5">{book.DESCRIPTION}</Typography>
    </Grid>
  );
};

const AuthorDetails = ({ id }) => {
  const [author, setAuthor] = useState();

  const getAuthorDetails = async (id) => {
    try {
      const response = await server.get(`/getAuthor?aid=${id}`);
      console.log(response.data);
      setAuthor(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(id.ID);
    getAuthorDetails(id.ID);
    // setAuthor()
  }, []);

  return (
    <Grid container direction="column" item xs={12} padding={2}>
      {author ? (
        <AuthorComponent author={author} />
      ) : (
        <p>Couldn't Find any Author</p>
      )}
    </Grid>
  );
};

const PublicationDetails = ({ publisher }) => {
  return (
    <Grid container direction="column" item xs={12} padding={2}>
      <PublicationComponent publication={publisher} />
    </Grid>
  );
};
