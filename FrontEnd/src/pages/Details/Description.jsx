import { Book, Business, Person } from "@mui/icons-material";
import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
import AuthorComponent from "./AuthorComponent";
import PublicationComponent from "./PublicationComponent";
const Description = ({ book }) => {
  const [tabValue, setTabValue] = useState(0);
  const [authors, setAuthors] = useState([]);

  // useEffect(() => {
  //   const authorsList = ;
  //   setAuthors(authorsList);
  //   console.log(authorsList);

  //   getPublisherDetails();
  // }, []);

  const getAuthorDetails = async () => {
    const response = server.get("/");
  };
  const getPublisherDetails = async () => {};
  // DUMMY AUTHOR:
  // const author = {
  //   DOB: "10-10-2000",
  //   DOD: null,
  //   NATIONALITY: "British",
  //   IMAGE:
  //     "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  //   NAME: "J.K. Rowling",
  //   BIO: "Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL, better known by her pen name J. K. Rowling, is a British author and philanthropist. She is best known for writing the Harry Potter fantasy series, which has won multiple awards and sold more than 500 million copies, becoming the best-selling book series in history. The books are the basis of a popular film series, over which Rowling had overall approval on the scripts and was a producer on the final films. She also writes crime fiction under the pen name Robert Galbraith.",
  // };
  /*
{
  "NAME": "J. K. Rowling",
  "DOB": "31-07-1965",
  "DOD": "30-12-1990",
  "NATIONALITY": "British",
  "BIO": "Joan Rowling, author of the popular Harry Potter series, K. Known as Rowling, she was born on July 31, 1985, in Yate, Gloucestershire, England. Ever since he was a child, she started dreaming of becoming a great writer. He spent his childhood in a rural environment. After graduating from the University of Exeter, he began his career as an English teacher, but had to move to Portugal. Later when she came to Edinburgh from Portugal, she was the mother of one child, single mother. When he arrived in Edinburgh, he read financially. Originally he had to hold a pen in his hand in search of money, the result of which is the world famous fiction 'Harry Potter'. Joan Rowling became one of the most well-known literary figures in today's literary world, as an orphaned simple boy discovered the existence of magic in himself and gradually wrote strange and unimaginable stories that happened in his life. K. Rowling '. The commercially successful series brought back its fortunes and forced bookworms of all ages to wander into that world of magical fairy tales. J. K. Rowling's books include a total of six books in the Harry Potter series. These 6 books have earned the title of bestseller worldwide and have sold more than 450 million copies so far. J. K. Rowling's books include Harry Potter and the Philosopher's Stone, Harry Potter and the Chamber of Secrets, Harry Potter and the Prisoner of Azkaban, Harry Potter and the Goblet of Fire, and Harry. 'The Order of the Phoenix', 'Harry Potter and the Half-Blood Prince', 'Harry Potter and the Deathly Hallows',' The Casual Vacancy ',' Cuckoo's Calling ',' The Silkworm ',' Career of Evil ',' Lethal White 'etc. He also co-wrote the play Harry Potter and the Cursed Child with Jack Thorne and John Tiffany. English language as well as J. K. Rowling's translation books are equally popular. The author of this billionaire has also been contributing to the society through donations to various charities.",
  "IMAGE": "https://ds.rokomari.store/rokomari110/people/6ed601ea2b54_2559.png"
}*/

  const publisher = {
    NAME: "Bloomsbury Publishing",
    CITY: "London",
    COUNTRY: "United Kingdom",
    POSTAL_CODE: "WC1H 9HE",
    CONTACT_NO: "020 7631 5600",
    EMAIL: "abc@gmail.com",
    IMAGE:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
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
