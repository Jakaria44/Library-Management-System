import { ArrowBack, Book, Business, Person } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
import AuthorComponent from "./AuthorComponent";
import PublicationComponent from "./PublicationComponent";
const Description = ({ book }) => {
  const [tabValue, setTabValue] = useState(0);

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
          <Tab icon={<Person />} label={`Author`} />
          <Tab icon={<Business />} label="Publication" />
        </Tabs>
        {tabValue === 0 && <BookDescription book={book} />}
        {tabValue === 2 && <PublicationDetails id={book.PUBLISHER_ID} />}
        {tabValue === 1 && <AuthorList authors={JSON.parse(book.AUTHOR)} />}
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

const AuthorList = ({ authors }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [authorList, setAuthorList] = useState([]);
  const assignAuthors = () => {
    const data = authors.map((author) => ({
      id: author.ID,
      name: author.NAME,
    }));
    console.log(data);
    setAuthorList(data);
  };
  useEffect(() => {
    assignAuthors();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackClick = () => {
    setSelectedItem(null);
  };

  // if (selectedItem) {
  //   return (
  //     <Grid container direction="column" item xs={12} padding={2}>
  //       <Box>
  //         <IconButton onClick={handleBackClick}>
  //           <ArrowBack />
  //         </IconButton>

  //         <AuthorDetails id={selectedItem.id} />
  //       </Box>
  //     </Grid>
  //   );
  // }

  return (
    <Grid container justifyContent="center" alignItems="center" padding={2}>
      <Grid item xs={12} textAlign="left">
        {/* Title */}
        <Typography variant="h3" gutterBottom>
          {selectedItem ? "Author Details" : "Author List"}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {selectedItem ? (
          <Box>
            <IconButton onClick={handleBackClick}>
              <ArrowBack />
            </IconButton>
            <AuthorDetails id={selectedItem.id} />
          </Box>
        ) : (
          <List>
            {authorList?.map((item) => (
              <ListItem
                key={item.id}
                sx={{ textAlign: "center", width: "100%" }}
              >
                <Button onClick={() => handleItemClick(item)}>
                  {item.name}
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
};

export const AuthorDetails = ({ id }) => {
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
    console.log(id);
    getAuthorDetails(id);
    // setAuthor()
  }, []);

  return (
    <Grid container direction="column" item xs={12} padding={2}>
      {author ? (
        <AuthorComponent author={author[0]} />
      ) : (
        <p>Couldn't Find any Author</p>
      )}
    </Grid>
  );
};

export const PublicationDetails = ({ id }) => {
  return (
    <Grid container direction="column" item xs={12} padding={2}>
      <PublicationComponent id={id} />
    </Grid>
  );
};
