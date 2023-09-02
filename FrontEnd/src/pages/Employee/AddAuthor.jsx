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
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import nationalities from "../../utils/AllCountries";
const AddAuthor = ({ onClose }) => {
  const [author, setAuthor] = useState({
    NAME: "",
    DOB: "",
    DOD: "",
    IMAGE: null,
    NATIONALITY: "",
    BIO: "",
  });
  // console.log(nationalities);
  const [previewUrl, setPreviewUrl] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const [uploading, setUploading] = useState(false);

  const uploadImage = () => {
    setUploading(true);
    const imageRef = ref(storage, `profileImages/${v4()}`);

    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          const updatedAuthor = { ...author, IMAGE: url };
          setAuthor(updatedAuthor);
          console.log(updatedAuthor);
          updateAuthor();
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

  const updateAuthor = async () => {
    try {
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
      onClose();
    }
  };
  const handleAddAuthor = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      uploadImage();
    } else {
      updateAuthor();
    }
  };
  return (
    <form onSubmit={handleAddAuthor}>
      <DialogTitle variant="h3">Add Author</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item>
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
                value={author?.DOB}
                onChange={(newValue) =>
                  setAuthor({ ...author, DOB: newValue.toISOString() })
                }
                format="LL"
              />
              <DateField
                disableFuture
                label="Date of Death"
                value={author?.DOD}
                onChange={(newValue) =>
                  setAuthor({ ...author, DOB: newValue.toISOString() })
                }
                format="LL"
              />
            </DemoContainer>
          </Grid>
          <Grid item xs>
            <TextField
              multiline
              rows={4}
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
                <TextField {...params} required label="Nationality" />
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
          <Button type="submit">Add</Button>
        </Grid>
      </Grid>
      <SpinnerWithBackdrop
        backdropOpen={uploading}
        helperText="Please wait while we update this information"
      />
    </form>
  );
};

export default AddAuthor;
