import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

// FIELDS:
// ADDRESS, CONTACT_NO, EMAIL, FIRST_NAME, GENDER, IMAGE, LAST_NAME, PASSWORD, USER_ID,

const EditProfile = ({ profile, setProfile, setSelectedImage }) => {
  const [previewUrl, setPreviewUrl] = useState(profile.IMAGE);

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

  const handleChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submit logic here
    console.log("Profile Updated:", profile);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid
            item
            container
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              {previewUrl && (
                <Avatar
                  alt="Preview"
                  src={previewUrl}
                  sx={{ width: 150, height: 150 }}
                />
              )}
            </Grid>
            <Grid item mt={17}>
              <IconButton
                alignContents="right"
                variant="contained"
                color="primary"
                component="label"
              >
                <CameraAlt />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              value={profile.FIRST_NAME}
              onChange={(e) => handleChange("FIRST_NAME", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              value={profile.LAST_NAME}
              onChange={(e) => handleChange("LAST_NAME", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              fullWidth
              value={profile.CONTACT_NO}
              onChange={(e) => handleChange("CONTACT_NO", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={profile.GENDER}
                label="Gender"
                onChange={(e) => {
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    GENDER: e.target.value,
                  }));
                }}
              >
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="M">Male</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" fullWidth value={profile.EMAIL} disabled />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              value={profile.ADDRESS}
              onChange={(e) => handleChange("ADDRESS", e.target.value)}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default EditProfile;
