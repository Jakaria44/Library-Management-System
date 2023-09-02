import { CameraAlt } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useMemo, useState } from "react";
import AddAuthor from "./AddAuthor";
import AddPublisher from "./AddPublisher";

// import server from './../../HTTP/httpCommonParam'
const defaultImage =
  "https://ds.rokomari.store/rokomari110/ProductNew20190903/130X186/a5a669963_101016.jpg";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ISBN = ["123", "456", "789"];
const AddBook = () => {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    image: "",
    edition: 1,
    availableCopies: 1,
    numberOfPages: 0,
    language: "English",
    description: "",
    genre: [""],
    authors: [""],
    publisher: "",
  });
  const [authors, setAuthors] = useState([]);
  const [addAuthor, setAddAuthor] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [addPublisher, setAddPublisher] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState({});
  const [addCategory, setAddCategory] = useState(false);
  const [categories, setCategories] = useState([
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
  ]);
  const [editingCategory, setEditingCategory] = useState("");

  const [isbn, setisbn] = useState(ISBN);

  useEffect(() => {
    console.log(book.genre);
  }, [book.genre]);

  const categoryAlreadyExists = useMemo(
    () =>
      categories
        .map((e) => e.toLowerCase())
        .includes(editingCategory.toLowerCase()),
    [editingCategory]
  );
  const isISBNValid =
    book.isbn.length === 0
      ? true
      : book.isbn.length !== 13
      ? false
      : !isbn.includes(book.isbn);

  // const getAllISBN = async () => {
  //   try{
  //     // const res = await server.get("/all-isbn");
  //     setisbn(res.data);
  //   }catch(err){
  //     setisbn([]);
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    // getAllISBN();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
  };
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3">
          Add Book
        </Typography>
        <Grid
          component="form"
          noValidate={false}
          onSubmit={handleSubmit}
          mt={3}
          container
          spacing={2}
          justifyContent="space-evenly"
        >
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            xs={12}
            sm={4}
          >
            <Grid direction="column" item container xs={12}>
              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                xs={12}
              >
                <Avatar
                  variant="square"
                  alt="Preview"
                  src={defaultImage}
                  sx={{ width: 200, height: 300 }}
                />
                <IconButton
                  variant="contained"
                  color="primary"
                  component="label"
                >
                  <CameraAlt />
                  <input
                    type="file"
                    accept="image/*"
                    // onChange={}
                    style={{ display: "none" }}
                  />
                </IconButton>
              </Grid>
              <TextField
                required
                multiline
                rows={4}
                id="description"
                label="Description of the Book"
                name="description"
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>

          <Grid item container direction="column" spacing={2} xs={12} sm={4}>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="title"
                label="Title of the Book"
                name="title"
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="isbn"
                label="ISBN"
                name="isbn"
                type="number"
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, isbn: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="availableCopies"
                label="Available Copies "
                name="availableCopies"
                type="number"
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    availableCopies: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="edition"
                label="Edition"
                name="edition"
                type="number"
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    edition: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="numberOfPages"
                label="Number Of Pages "
                name="numberOfPages"
                type="number"
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    numberOfPages: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="language"
                label="Language of the Book"
                name="language"
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, language: e.target.value }))
                }
              />
            </Grid>
          </Grid>

          {/* 3rd column */}
          <Grid item container direction="column" spacing={2} xs={12} sm={4}>
            <Grid item>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={top100Films}
                autoHighlight
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                onChange={(e, value) => {
                  setBook((prev) => ({
                    ...prev,
                    genre: value.map((v) => v.title),
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categories"
                    placeholder="Add Category"
                  />
                )}
                loading
                loadingText={<CircularProgress />}
              />
            </Grid>
            <Grid item xs>
              <Chip
                variant="outlined"
                color="success"
                label="Add Category?"
                clickable
                onClick={() => setAddCategory(true)}
              />
            </Grid>

            <Grid item>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={top100Films}
                autoHighlight
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                onChange={(e, value) => {
                  setBook((prev) => ({
                    ...prev,
                    genre: value.map((v) => v.title),
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Authors"
                    placeholder="Add Author"
                  />
                )}
                loading
                loadingText={<CircularProgress />}
              />
            </Grid>
            <Grid item xs>
              <Chip
                variant="outlined"
                color="success"
                label="Add Author?"
                clickable
                onClick={() => setAddAuthor(true)}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                id="checkboxes-tags-demo"
                options={top100Films}
                autoHighlight
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <li {...props}>{option.title}</li>
                )}
                onChange={(e, value) => {
                  setBook((prev) => ({
                    ...prev,
                    genre: value,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Publisher"
                    placeholder="Add Publisher"
                  />
                )}
                noOptionsText="No Publisher Found"
                loading
                loadingText={<CircularProgress />}
              />
            </Grid>
            <Grid item xs>
              <Chip
                variant="outlined"
                color="success"
                label="Add Publisher?"
                clickable
                onClick={() => setAddPublisher(true)}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Book
          </Button>
        </Grid>
      </Box>

      {/* Add Category dialog */}
      <Dialog open={addCategory} onClose={() => setAddCategory(false)}>
        <DialogTitle variant="h3">Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Category"
            variant="standard"
            error={categoryAlreadyExists}
            helperText={
              categoryAlreadyExists ? "This category already exists" : ""
            }
            onChange={(e) => setEditingCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddCategory(false)}>Cancel</Button>
          <Button
            disabled={categoryAlreadyExists || editingCategory.length === 0}
            onClick={() => {
              if (!categoryAlreadyExists) {
                setCategories((prev) => [...prev, editingCategory]);
              }
              setAddCategory(false);
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add author dialog */}

      <Dialog
        open={addAuthor}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }

          setAddAuthor(false);
        }}
      >
        <AddAuthor onClose={() => setAddAuthor(false)} />
      </Dialog>
      <Dialog
        open={addPublisher}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }

          setAddPublisher(false);
        }}
      >
        <AddPublisher onClose={() => setAddPublisher(false)} />
      </Dialog>
    </Container>
  );
};

export default AddBook;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];
