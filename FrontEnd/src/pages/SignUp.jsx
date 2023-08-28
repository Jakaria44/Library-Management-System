import { CameraAlt, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import server from "../HTTP/httpCommonURL";
import SpinnerWithBackdrop from "../component/SpinnerWithBackdrop";
import { storage } from "../firebaseConfig";
const defaultImage = "https://img.freepik.com/free-icon/user_318-159711.jpg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        Library Management System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const [gender, setGender] = useState("M");
  const [email, setEmail] = useState("");
  const isEmailValid = email ? emailRegex.test(email) : true;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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

  const uploadImage = (data) => {
    const imageRef = ref(storage, `profileImages/${v4()}`);

    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setPreviewUrl(url);
          getFormData(data, url);
          // setShowSuccessMessage(true);
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error uploading image");
      });
  };
  const postUser = async (fields) => {
    let response;
    try {
      response = await server.post("/user/signup", fields);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("image", response.data.image);
      console.log(response);

      setSigningUp(false);
      window.location.replace("/profile");
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
      setSigningUp(false);
      console.log(err);
    }
  };
  const getFormData = (data, url) => {
    const fields = {
      image: url,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      contactNo: data.get("phone"),
      address: data.get("address"),
      email: data.get("email"),
      password: data.get("password"),
      gender: gender,
    };
    console.log(fields);

    postUser(fields);

    // setTimeout(() => {
    //   setSigningUp(false);
    //   navigate("/profile");
    // }, 3000);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSigningUp(true);
    if (selectedImage) {
      uploadImage(data);
    } else {
      getFormData(data, previewUrl);
    }
  };

  const genders = [
    {
      label: "Male",
      value: "M",
    },
    {
      label: "Female",
      value: "F",
    },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Avatar
              alt="Preview"
              src={previewUrl}
              sx={{ width: 150, height: 150 }}
            />
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
        </Grid>

        <Typography component="h1" variant="h3">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate={false}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!isEmailValid}
                onChange={(e) => setEmail(e.target.value)}
                helperText={
                  isEmailValid ? "" : "Please enter a valid email address"
                }
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Contact Number"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Gender"
                defaultValue="M"
              >
                {genders.map((option) => (
                  <MenuItem
                    key={option.value}
                    onChange={() => {
                      setGender(option.value);
                    }}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <SpinnerWithBackdrop backdropOpen={signingUp} helperText="Signing Up" />
      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}
