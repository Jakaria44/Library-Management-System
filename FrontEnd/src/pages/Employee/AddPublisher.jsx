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
import React, { useState } from "react";
import { v4 } from "uuid";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import countryList from "../../utils/CountryList";
import { storage } from "./../../firebaseConfig";

// import server from "./../../HTTP/httpCommonParam";
const defaultImage =
  "https://ds.rokomari.store/rokomari110/company/publisher.png";
const AddPublisher = ({ onClose }) => {
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
  });

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
          const updatedPublisher = { ...publisher, IMAGE: url };
          setPublisher(updatedPublisher);
          console.log(updatedPublisher);
          updatePublisher();
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

  const updatePublisher = async () => {
    try {
      // const res = await server.post("/publisher");
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
      onClose();
    }
  };
  // useMemo(() => {
  //   console.log(publisher);
  // }, [publisher]);
  const handleAddPublisher = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      uploadImage();
    } else {
      updatePublisher();
    }
  };
  return (
    <form onSubmit={handleAddPublisher}>
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
          <Grid item container direction="column" spacing={2} xs={12}>
            <Grid item xs>
              <TextField
                autoFocus
                required
                fullWidth
                label="Publisher Name"
                name="NAME"
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
                name="CONTACT_NO"
                onChange={(e) =>
                  setPublisher({ ...publisher, CONTACT_NO: e.target.value })
                }
                value={publisher?.CONTACT_NO}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              autoHighlight
              options={countryList}
              renderInput={(params) => (
                <TextField {...params} required label="Country" />
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

export default AddPublisher;
