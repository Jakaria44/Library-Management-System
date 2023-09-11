import { Upload } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import { v4 } from "uuid";
import { storage } from "../../../firebaseConfig";
import server from "./../../../HTTP/httpCommonParam";
import Languages from "./../../../utils/Languages";
const defaultImage =
  "https://st2.depositphotos.com/5703046/12114/i/950/depositphotos_121142344-stock-photo-white-book-on-white-background.jpg";

export default function GeneralAdd({
  editing = false,
  setInvalidISBN,
  book,
  setBook,
}) {
  const [isbnList, setisbnList] = React.useState(["1234567890123"]);
  const [previewUrl, setPreviewUrl] = React.useState(
    book.image ?? defaultImage
  );

  React.useEffect(() => {
    loadAllIsbn();
    console.log(book);
  }, []);
  const [uploading, setUploading] = React.useState(false);

  const loadAllIsbn = async () => {
    try {
      const res = await server.get("/all-book");
      const data = res.data.map((item) => item.ISBN);
      setisbnList(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
      setisbnList([]);
    }
  };
  const uploadImage = (file) => {
    const imageRef = ref(storage, `bookCover/${v4()}`);

    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);
            setBook((prev) => ({ ...prev, image: url }));
            // console.log(updatedBook);
            setUploading(false);
          })
          .catch((err) => setUploading(false));
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
      });
  };

  const handleImageSelect = (event) => {
    setUploading(true);
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
    uploadImage(selectedFile);
  };

  const isbnAlreadyExists = React.useMemo(() => {
    setInvalidISBN(
      !editing &&
        (book.isbn.length !== 13 ||
          isbnList
            .map((e) => e.toLowerCase())
            .includes(book.isbn.toLowerCase()))
    );
    return (
      !editing &&
      book.isbn.length > 0 &&
      isbnList.map((e) => e.toLowerCase()).includes(book.isbn.toLowerCase())
    );
  }, [book.isbn]);
  return (
    <React.Fragment>
      <Grid container spacing={3} mt={3}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={6}
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
              <p>Cover Photo</p>
              <Avatar
                variant="square"
                alt="Preview"
                src={previewUrl}
                sx={{ width: 200, height: 300 }}
              />
              <IconButton variant="contained" color="primary" component="label">
                {uploading ? <CircularProgress /> : <Upload fontSize="large" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" spacing={3} xs={12} sm={6}>
          <Grid item xs>
            <TextField
              required
              fullWidth
              value={book.title}
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
              fullWidth
              value={book.previewLink}
              id="preview"
              label="Preview Link of the Book"
              name="preview"
              onChange={(e) =>
                setBook((prev) => ({ ...prev, previewLink: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs>
            <TextField
              required
              value={book.isbn}
              fullWidth
              disabled={editing}
              id="isbn"
              label="ISBN"
              name="isbn"
              type="number"
              error={
                isbnAlreadyExists ||
                (book.isbn.length > 0 && book.isbn.length !== 13)
              }
              helperText={
                book.isbn.length > 0 && book.isbn.length !== 13
                  ? "ISBN must be 13 digits"
                  : isbnAlreadyExists
                  ? "ISBN already exists"
                  : "ISBN is unique"
              }
              onChange={(e) =>
                setBook((prev) => ({ ...prev, isbn: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs>
            <Autocomplete
              options={Languages}
              autoHighlight
              value={book?.language}
              // defaultValue={book.language ? book.language : Languages[0].name}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <li {...props}>
                  [{option.code}] {option.name} - {option.nativeName}
                </li>
              )}
              onChange={(e, value) => {
                // console.log(value);
                setBook((prev) => ({
                  ...prev,
                  language: value,
                }));
              }}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Language"
                  placeholder="Add Language"
                />
              )}
              // loadingText={<CircularProgress />}
            />
          </Grid>
          <Grid item xs>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              value={book.description}
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
          <Grid item xs>
            <TextField
              required
              fullWidth
              value={book.numOfPage}
              id="numOfPage"
              type="number"
              label="Number of Pages"
              name="numOfPage"
              onChange={(e) =>
                setBook((prev) => ({
                  ...prev,
                  numOfPage: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
