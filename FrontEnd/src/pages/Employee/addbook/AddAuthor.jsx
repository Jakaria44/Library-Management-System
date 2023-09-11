import { CameraAlt } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import React, { useState } from "react";
import { v4 } from "uuid";
import SpinnerWithBackdrop from "../../../component/SpinnerWithBackdrop";
import { storage } from "../../../firebaseConfig";
import nationalities from "../../../utils/AllCountries";
import server from "./../../../HTTP/httpCommonParam";

const fields = {
  NAME: 1,
  DoB: 2,
  DoD: 3,
  IMAGE: 4,
  NATIONALITY: 5,
  BIO: 6,
};
const defaultImage =
  "https://previews.123rf.com/images/anatolir/anatolir1712/anatolir171201476/91832679-man-avatar-icon-flat-illustration-of-man-avatar-vector-icon-isolated-on-white-background.jpg";
const AddAuthor = ({ onClose, onSubmit }) => {
  const [author, setAuthor] = useState({
    NAME: "",
    DoB: null,
    DoD: null,
    IMAGE: defaultImage,
    NATIONALITY: "",
    BIO: "",
  });
  const [error, setError] = useState(null);
  // console.log(nationalities);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);

  const [uploading, setUploading] = useState(false);

  const uploadImage = () => {
    const imageRef = ref(storage, `profileImages/${v4()}`);

    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          const updatedAuthor = { ...author, IMAGE: url };
          setAuthor(updatedAuthor);
          console.log(updatedAuthor);
          updateAuthor(updatedAuthor);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setSelectedImage(selectedFile);
      // console.log(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const updateAuthor = async (newAuthor) => {
    const newAuthorValue = newAuthor;
    try {
      console.log(newAuthor);
      const res = await server.post("/getAuthor", newAuthor);

      newAuthorValue.AUTHOR_ID = res.data.author.AUTHOR_ID;
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
      onSubmit(newAuthorValue);
    }
  };

  const validate = () => {
    if (author.NAME === "") {
      setError(fields.NAME);
      return false;
    }
    if (!author.DoB) {
      setError(fields.DoB);
      return false;
    }
    if (author.BIO === "") {
      setError(fields.BIO);
      return false;
    }
    if (author.NATIONALITY === "") {
      setError(fields.NATIONALITY);
      return false;
    }
    return true;
  };
  const handleAddAuthor = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setUploading(true);
    console.log("add");
    if (selectedImage) {
      uploadImage();
    } else {
      updateAuthor(author);
    }
  };
  return (
    <>
      <DialogTitle variant="h3">Add Author</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item m="auto">
            {previewUrl && (
              <Avatar
                variant="square"
                alt="Preview"
                src={previewUrl}
                sx={{ width: 150, height: 150 }}
              />
            )}
          </Grid>
          <Grid item mt={17}>
            <IconButton variant="contained" color="primary" component="label">
              <CameraAlt />
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              required
              fullWidth
              label="Author Name"
              name="authorName"
              error={error === fields.NAME}
              helperText={error === fields.NAME && "This field is required"}
              onChange={(e) => setAuthor({ ...author, NAME: e.target.value })}
              value={author?.NAME}
            />
          </Grid>
          <Grid item xs={12}>
            <DemoContainer components={["DateField", "DateField"]}>
              <DateField
                required
                disableFuture
                label="Date of Birth"
                name="dob"
                error={error === fields.DoB}
                helperText={error === fields.DoB && "This field is required"}
                value={author?.DoB}
                onChange={(newValue) =>
                  setAuthor({ ...author, DoB: newValue.toISOString() })
                }
                format="LL"
              />
              <DateField
                disableFuture
                name="dod"
                label="Date of Death"
                value={author?.DoD}
                onChange={(newValue) =>
                  setAuthor({ ...author, DoD: newValue.toISOString() })
                }
                format="LL"
              />
            </DemoContainer>
          </Grid>
          <Grid item xs>
            <TextField
              multiline
              rows={4}
              error={error === fields.BIO}
              helperText={error === fields.BIO && "This field is required"}
              fullWidth
              required
              label="Biography"
              name="biography"
              onChange={(e) => setAuthor({ ...author, BIO: e.target.value })}
              value={author.BIO}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              autoHighlight
              options={nationalities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  error={error === fields.NATIONALITY}
                  helperText={
                    error === fields.NATIONALITY && "This field is required"
                  }
                  name="nationality"
                  label="Nationality"
                />
              )}
              onChange={(e, value) =>
                setAuthor({ ...author, NATIONALITY: value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Grid container p={2} justifyContent="space-evenly" spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleAddAuthor}>Add</Button>
        </Grid>
      </Grid>
      <SpinnerWithBackdrop
        backdropOpen={uploading}
        helperText="Please wait while we update this information"
      />
    </>
  );
};

export default AddAuthor;
