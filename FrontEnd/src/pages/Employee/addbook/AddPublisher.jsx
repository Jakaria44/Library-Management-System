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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useMemo, useState } from "react";
import { v4 } from "uuid";
import SpinnerWithBackdrop from "../../../component/SpinnerWithBackdrop";
import { storage } from "../../../firebaseConfig";
import countryList from "../../../utils/CountryList";

const fields = {
  NAME: 1,
  EMAIL: 2,
  COUNTRY: 3,
  POSTAL_CODE: 4,
  CONTACT_NO: 5,
};

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

import server from "./../../../HTTP/httpCommonParam";
const defaultImage =
  "https://ds.rokomari.store/rokomari110/company/publisher.png";
const AddPublisher = ({ onSubmit, onClose }) => {
  const [error, setError] = useState(null);
  /*
  //     City         VARCHAR2(100),
    Country      VARCHAR2(100),
    Postal_Code  VARCHAR2(100),
    Contact_No   VARCHAR2(20),
    Email        VARCHAR2(100)

    */
  const [publisher, setPublisher] = useState({
    NAME: "",
    IMAGE: defaultImage,
    COUNTRY: "",
    POSTAL_CODE: "",
    CONTACT_NO: "",
    EMAIL: "",
    CITY: "",
  });

  const isEmailValid = useMemo(
    () => (publisher.EMAIL ? emailRegex.test(publisher.EMAIL) : true),
    [publisher.EMAIL]
  );

  const [previewUrl, setPreviewUrl] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = () => {
    const imageRef = ref(storage, `profileImages/${v4()}`);

    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          const updatedPublisher = { ...publisher, IMAGE: url };
          setPublisher(updatedPublisher);
          console.log(updatedPublisher);
          updatePublisher(updatedPublisher);
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

  const updatePublisher = async (newPublisher) => {
    const newPublisherValue = newPublisher;
    try {
      console.log(newPublisher);
      const res = await server.post("/getPublisher", newPublisher);

      newPublisherValue.PUBLISHER_ID = res.data.publisher.PUBLISHER_ID;
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
      onSubmit(newPublisherValue);
    }
  };
  // useMemo(() => {
  //   console.log(publisher);
  // }, [publisher]);
  const validate = () => {
    if (publisher.NAME === "") {
      setError(fields.NAME);
      return false;
    }
    if (!publisher.COUNTRY) {
      setError(fields.COUNTRY);
      return false;
    }
    if (publisher.POSTAL_CODE === "") {
      setError(fields.POSTAL_CODE);
      return false;
    }
    if (publisher.CONTACT_NO === "") {
      setError(fields.CONTACT_NO);
      return false;
    }
    if (publisher.EMAIL === "" || !isEmailValid) {
      setError(fields.EMAIL);
      return false;
    }
    return true;
  };
  const handleAddPublisher = (e) => {
    if (!validate()) return;
    e.preventDefault();
    console.log(onSubmit);
    setUploading(true);
    if (selectedImage) {
      uploadImage();
    } else {
      updatePublisher(publisher);
    }
  };
  return (
    <>
      <DialogTitle variant="h3">Add Publisher</DialogTitle>

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
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
            </IconButton>
          </Grid>
          <Grid item container direction="column" spacing={2} xs={12}>
            <Grid item xs>
              <TextField
                autoFocus
                required
                fullWidth
                label="Publisher Name"
                name="NAME"
                error={error === fields.NAME}
                helperText={error === fields.NAME && "This field is required"}
                onChange={(e) =>
                  setPublisher({ ...publisher, NAME: e.target.value })
                }
                value={publisher?.NAME}
              />
            </Grid>
            <Grid item xs>
              <TextField
                autoFocus
                required
                fullWidth
                label="Email"
                error={error === fields.EMAIL}
                helperText={
                  !isEmailValid
                    ? "Please enter a valid email"
                    : error === fields.EMAIL && "This field is required"
                }
                name="EMAIL"
                type="email"
                onChange={(e) =>
                  setPublisher({ ...publisher, EMAIL: e.target.value })
                }
                value={publisher?.EMAIL}
              />
            </Grid>
            <Grid item xs>
              <TextField
                autoFocus
                required
                fullWidth
                label="Postal Code"
                name="POSTAL_CODE"
                error={error === fields.POSTAL_CODE}
                helperText={
                  error === fields.POSTAL_CODE && "This field is required"
                }
                onChange={(e) =>
                  setPublisher({ ...publisher, POSTAL_CODE: e.target.value })
                }
                value={publisher?.POSTAL_CODE}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoFocus
                required
                fullWidth
                label="Contact No"
                error={error === fields.CONTACT_NO}
                helperText={
                  error === fields.CONTACT_NO && "This field is required"
                }
                name="CONTACT_NO"
                onChange={(e) =>
                  setPublisher({ ...publisher, CONTACT_NO: e.target.value })
                }
                value={publisher?.CONTACT_NO}
              />
            </Grid>
          </Grid>
          <Grid item xs>
            <TextField
              required
              fullWidth
              label="City"
              name="CITY"
              error={error === fields.CITY}
              helperText={error === fields.CITY && "This field is required"}
              onChange={(e) =>
                setPublisher({ ...publisher, CITY: e.target.value })
              }
              value={publisher?.CITY}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              autoHighlight
              options={countryList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={error === fields.COUNTRY}
                  helperText={
                    error === fields.COUNTRY && "This field is required"
                  }
                  required
                  label="Country"
                />
              )}
              onChange={(e, value) =>
                setPublisher({ ...publisher, COUNTRY: value })
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
          <Button onClick={handleAddPublisher}>Add</Button>
        </Grid>
      </Grid>
      <SpinnerWithBackdrop
        backdropOpen={uploading}
        helperText="Please wait while we update this information"
      />
    </>
  );
};

export default AddPublisher;
