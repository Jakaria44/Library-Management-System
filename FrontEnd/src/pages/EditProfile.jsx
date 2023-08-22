import {
  Avatar,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const EditProfile = () => {
  const initialProfile = {
    FIRST_NAME: "Jakaria",
    LAST_NAME: "Hossain",
    ADDRESS: "Pabna, Bangladesh",
    CONTACT_NO: "123-456-7890",
    GENDER: "M",
    EMAIL: "abc@gmail.com",
    IMAGE: "https://placekitten.com/400/400", // Replace with your image URL
  };

  const [profile, setProfile] = useState(initialProfile);
  const [selectedImage, setSelectedImage] = useState(initialProfile.IMAGE);
  const [previewUrl, setPreviewUrl] = useState(initialProfile.IMAGE);

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setSelectedImage(selectedFile);

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

  const isSaveDisabled = Object.values(profile).some((value) => value === "");

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
              <Card>
                {previewUrl && (
                  <Avatar
                    alt="Preview"
                    src={previewUrl}
                    sx={{ width: 150, height: 150 }}
                  />
                )}

                <Button variant="contained" color="primary" component="label">
                  Update Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: "none" }}
                  />
                </Button>
              </Card>
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
              label="Address"
              fullWidth
              value={profile.ADDRESS}
              onChange={(e) => handleChange("ADDRESS", e.target.value)}
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

          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={profile.EMAIL}
              onChange={(e) => handleChange("EMAIL", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={profile.GENDER}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="M">Male</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "8px" }}
              type="submit"
              disabled={isSaveDisabled}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default EditProfile;
