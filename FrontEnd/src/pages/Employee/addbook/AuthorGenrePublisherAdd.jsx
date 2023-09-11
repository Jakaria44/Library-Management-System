import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ListboxComponent,
  StyledPopper,
} from "../../VirtualisedAuthorAutoComplete";
import server from "./../../../HTTP/httpCommonParam";
import AddAuthor from "./AddAuthor";
import AddPublisher from "./AddPublisher";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function AuthorGenrePublisherAdd({
  authorGenrePublisher,
  setAuthorGenrePublisher,
}) {
  const [authors, setAuthors] = React.useState([]);
  const [publishers, setPublishers] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [addAuthor, setAddAuthor] = useState(false);
  const [addPublisher, setAddPublisher] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState("");
  const inputRef = useRef();

  const categoryAlreadyExists = useMemo(
    () =>
      genres
        .map((e) => e.GENRE_NAME.toLowerCase())
        .includes(editingCategory.toLowerCase()),
    [editingCategory]
  );
  useEffect(() => {
    loadAllAuthors();
    loadAllPublishers();
    loadAllGenres();
  }, []);
  const uploadGenre = async (genre) => {
    try {
      const res = await server.post("/getGenre", {
        GENRE_NAME: genre,
      });
      loadAllGenres();
      setAuthorGenrePublisher((prev) => ({
        ...prev,
        genre: [
          ...prev.genre,
          {
            GENRE_ID: res.data.genre.GENRE_ID,
            GENRE_NAME: res.data.genre.GENRE_NAME,
          },
        ],
      }));
      setEditingCategory("");
    } catch (err) {
      console.log(err);
    }
  };
  const loadAllAuthors = async () => {
    try {
      const res = await server.get("/getAuthor");
      // arr.push(res.data);
      setAuthors(res.data);
    } catch (err) {
      setAuthors([]);
    }
  };
  const loadAllGenres = async () => {
    try {
      const res = await server.get("/getGenre");
      setGenres(res.data);
    } catch (err) {
      setGenres([]);
    }
  };
  const loadAllPublishers = async () => {
    try {
      const res = await server.get("/getPublisher");
      setPublishers(res.data);
    } catch (err) {
      setPublishers([]);
    }
  };
  const OPTIONS = useMemo(() => authors.map((item) => item), [authors]);
  const selectedAuthor = useMemo(
    () => authorGenrePublisher.authors.map((item) => item),
    [authorGenrePublisher.authors]
  );
  return (
    <React.Fragment>
      <Grid item container direction="column" spacing={2} xs={12} mt={2}>
        <Grid
          item
          container
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          xs={12}
          justifyItems="center"
        >
          <Grid item xs={12} sm={9}>
            <Autocomplete
              multiple
              options={genres}
              value={authorGenrePublisher.genre}
              autoHighlight
              disableCloseOnSelect
              getOptionLabel={(option) => option.GENRE_NAME}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.GENRE_ID}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={
                      selected || authorGenrePublisher.genre.includes(option)
                    }
                  />
                  {option.GENRE_NAME}
                </li>
              )}
              isOptionEqualToValue={(option, value) =>
                option.GENRE_ID === value.GENRE_ID
              }
              onChange={(e, value) => {
                setAuthorGenrePublisher((prev) => ({
                  ...prev,
                  genre: value.map((v) => v),
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // InputLabelProps={{
                  required={authorGenrePublisher?.genre?.length === 0}
                  // }}
                  label="Categories"
                  placeholder="Add Category"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3} m="auto">
            <Chip
              variant="outlined"
              color="success"
              label="Add Category?"
              clickable
              onClick={() => setAddCategory(true)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          xs={12}
          justifyItems="center"
        >
          <Grid item xs={12} sm={9}>
            {/* <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={authors}
              autoHighlight
              value={authorGenrePublisher.authors}
              disableCloseOnSelect
              getOptionLabel={(option) => option.NAME}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.AUTHOR_ID}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.NAME}
                </li>
              )}
              onChange={(e, value) => {
                setAuthorGenrePublisher((prev) => ({
                  ...prev,
                  authors: value.map((v) => v),
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Authors"
                  // InputLabelProps={{
                  required={authorGenrePublisher?.authors?.length === 0}
                  // }}
                  placeholder="Add Author"
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.AUTHOR_ID === value.AUTHOR_ID
              }
              loading
              loadingText={<CircularProgress />}
            /> */}
            <Autocomplete
              id="virtualize-demo"
              options={OPTIONS}
              autoHighlight
              value={selectedAuthor}
              disableCloseOnSelect
              multiple
              getOptionLabel={(option) => option.NAME}
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              onChange={(e, value) => {
                setAuthorGenrePublisher((prev) => ({
                  ...prev,
                  authors: value.map((v) => v),
                }));
              }}
              // groupBy={(option) => option[0].NAME.toUpperCase()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={authorGenrePublisher?.authors?.length === 0}
                  label="Authors"
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.AUTHOR_ID === value.AUTHOR_ID
              }
              renderOption={(props, option, state) => [
                props,
                option.NAME,
                state.index,
              ]}
              // renderOption={(props, option, { selected }) => {
              //   console.log(option.NAME); //gives name
              //   return (
              //     <li {...props} key={option.AUTHOR_ID}>
              //       <Checkbox
              //         icon={icon}
              //         checkedIcon={checkedIcon}
              //         style={{ marginRight: 8 }}
              //         checked={selected}
              //       />
              //       {/* <ListItemText primary={option.NAME} /> */}
              //       {/* {option.NAME} */}
              //       <Chip label={option.NAME} />
              //     </li>
              //   );
              // }}
              // TODO: Post React 18 update - validate this conversion, look like a hidden bug
              renderGroup={(params) => params}
            />
          </Grid>
          <Grid item xs={12} sm={3} m="auto">
            <Chip
              variant="outlined"
              color="success"
              label="Add Author?"
              clickable
              onClick={() => setAddAuthor(true)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          xs={12}
          justifyItems="center"
        >
          <Grid item xs={12} sm={9}>
            <Autocomplete
              id="checkboxes-tags-demoa"
              options={publishers}
              value={authorGenrePublisher?.publisher}
              autoHighlight
              getOptionLabel={(option) => option?.NAME}
              renderOption={(props, option) => (
                <li key={option.PUBLISHER_ID} {...props}>
                  {option.NAME}
                </li>
              )}
              onChange={(e, value) => {
                setAuthorGenrePublisher((prev) => ({
                  ...prev,
                  publisher: value,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Publisher"
                  // InputLabelProps={{
                  required={!authorGenrePublisher?.publisher}
                  // }}
                  placeholder="Add Publisher"
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.PUBLISHER_ID === value.PUBLISHER_ID
              }
              noOptionsText="No Publisher Found"
              // loading
              // loadingText={<CircularProgress />}
            />
          </Grid>
          <Grid item xs={12} sm={3} m="auto">
            <Chip
              variant="outlined"
              color="success"
              label="Add Publisher?"
              clickable
              onClick={() => setAddPublisher(true)}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Adding options section */}

      {/* Add New Category */}
      <Dialog
        open={addCategory}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }

          setAddCategory(false);
        }}
      >
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
              setAddCategory(false);
              if (!categoryAlreadyExists) {
                uploadGenre(editingCategory);
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add author dialog */}

      <Dialog
        open={addAuthor}
        onClose={(event, reason, authornew) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          console.log(authornew);
          if (authornew) {
            setAuthorGenrePublisher((prev) => ({
              ...prev,
              authors: [...prev.authors, authornew],
            }));
          }
          setAddAuthor(false);
        }}
      >
        <AddAuthor
          onSubmit={(value) => {
            loadAllAuthors()
              .then((res) => {
                setAuthorGenrePublisher((prev) => ({
                  ...prev,
                  authors: [...prev.authors, value],
                }));
                setAddAuthor(false);
              })
              .catch((err) => {
                console.log(err);
                setAddAuthor(false);
              });
          }}
          onClose={() => {
            setAddAuthor(false);
            loadAllAuthors();
          }}
        />
      </Dialog>

      {/* Add publisher dialog */}
      <Dialog
        open={addPublisher}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }

          setAddPublisher(false);
        }}
      >
        <AddPublisher
          onSubmit={(value) => {
            console.log(value);
            loadAllPublishers()
              .then((res) => {
                setAuthorGenrePublisher((prev) => ({
                  ...prev,
                  publisher: value,
                }));
                setAddPublisher(false);
              })
              .catch((err) => {
                console.log(err);
                setAddPublisher(false);
              });
          }}
          onClose={() => setAddPublisher(false)}
        />
      </Dialog>
    </React.Fragment>
  );
}
