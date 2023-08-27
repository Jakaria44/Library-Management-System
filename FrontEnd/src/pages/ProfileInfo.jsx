import {
  Badge,
  BadgeOutlined,
  CalendarMonth,
  Email,
  LocationOn,
  Person,
  Phone,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { v4 } from "uuid";
import server from "../HTTP/httpCommonParam";
import CircularSpinner from "../component/CircularSpinner";
import ErrorModal from "../component/ErrorModal";
import SpinnerWithBackdrop from "../component/SpinnerWithBackdrop";
import SuccessfulModal from "../component/SuccessfulModal";
import { storage } from "../firebaseConfig";
import EditProfile from "./EditProfile";
const ProfileInfo = ({ user }) => {
  const confirm = useConfirm();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profile, setProfile] = useState(user);
  const [selectedImage, setSelectedImage] = useState(user?.IMAGE);
  const [uploading, setUploading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong, Please Try Again!"
  );

  const InfoList = styled(List)({
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "16px",
  });

  const isSaveDisabled = Object.values(profile).some((value) => value === "");
  // const isSaveDisabled = true;
  const editProfileHandler = (event) => {
    event.preventDefault();
    setEditProfileOpen(true);
  };
  const handleClose = (event, reason = "") => {
    setEditProfileOpen(false);
    window.location.reload();
  };

  const uploadImage = () => {
    setUploading(true);
    const imageRef = ref(storage, `profileImages/${v4()}`);

    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          const updatedProfile = { ...profile, IMAGE: url };
          setProfile(updatedProfile);
          console.log(updatedProfile);
          updateProfile(updatedProfile);
        });
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
      });
  };

  const updateProfile = async (profile) => {
    try {
      const response = await server.put("/user/update", profile);
      console.log(response);
      setShowSuccessMessage(true);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setShowErrorMessage(true);
      setErrorMessage(error?.response?.data?.message);
    }
  };
  const handleSaveChanges = () => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }
    confirm({
      title: <Typography variant="h4">Save Changes</Typography>,
      description: "Are you sure you want to save changes?",
    })
      .then(() => {
        if (selectedImage !== user.IMAGE) {
          uploadImage();
        } else {
          updateProfile(profile);
        }
      })
      .catch(() => {
        console.log("canceled");
      });
  };
  const HandleModalClosed = () => {
    setShowSuccessMessage(false);
    handleClose();
  };

  const ListItemStyled = styled(ListItem)({
    marginBottom: "8px",
  });
  return (
    <>
      {!user && <CircularSpinner />}
      {user && (
        <Card sx={{ padding: { md: "16px" } }} elevation={3}>
          <Typography align="center" variant="h1" marginBottom={2}>
            Welcome {profile?.FIRST_NAME} {profile?.LAST_NAME}
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            backgroundColor="background.default"
            borderRadius="12px"
            sx={{ padding: { md: "16px" }, textAlign: "center" }}
          >
            {/* Left side: user Image */}

            <Grid item xs={12} md={4}>
              <img
                src={profile.IMAGE}
                alt={profile.FIRST_NAME}
                style={{ width: "100%" }}
              />
            </Grid>

            {/* Right side: user Information */}
            <Grid item xs={12} md={8}>
              <InfoList>
                {profile.FIRST_NAME && (
                  <ListItemStyled>
                    <ListItemIcon>
                      <Badge />
                    </ListItemIcon>
                    <ListItemText
                      primary={`First Name: ${profile.FIRST_NAME}`}
                    />
                  </ListItemStyled>
                )}
                {profile.LAST_NAME && (
                  <ListItemStyled>
                    <ListItemIcon>
                      <BadgeOutlined />
                    </ListItemIcon>
                    <ListItemText primary={`Last Name: ${profile.LAST_NAME}`} />
                  </ListItemStyled>
                )}
                {profile.EMPLOYEE_TYPE && (
                  <ListItemStyled>
                    <ListItemIcon>
                      <Badge />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Employee Type: ${profile.EMPLOYEE_TYPE}`}
                    />
                  </ListItemStyled>
                )}
                {profile.JOIN_DATE && (
                  <ListItemStyled>
                    <ListItemIcon>
                      <CalendarMonth />
                    </ListItemIcon>
                    <ListItemText primary={`Join Date: ${profile.JOIN_DATE}`} />
                  </ListItemStyled>
                )}
                {profile.ADDRESS && (
                  <ListItemStyled>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText primary={`Address: ${profile.ADDRESS}`} />
                  </ListItemStyled>
                )}
                {profile.CONTACT_NO && (
                  <ListItemStyled>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText primary={`Contact: ${profile.CONTACT_NO}`} />
                  </ListItemStyled>
                )}
                {profile.EMAIL && (
                  <ListItemStyled>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText primary={`Email: ${profile.EMAIL}`} />
                  </ListItemStyled>
                )}
                {profile.GENDER && (
                  <ListItemStyled>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Gender: ${
                        profile.GENDER === "M" ? "Male" : "Female"
                      }`}
                    />
                  </ListItemStyled>
                )}
              </InfoList>
            </Grid>
          </Grid>

          {/* edit options */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "8px" }}
              onClick={editProfileHandler}
            >
              Edit Profile
            </Button>
          </div>

          {/* Editing  */}

          <Dialog
            transitionDuration={{ appear: 300, enter: 300, exit: 300 }}
            open={editProfileOpen}
            onClose={handleClose}
          >
            <DialogTitle sx={{ margin: "auto", fontSize: "1.6rem" }}>
              Edit Profile
            </DialogTitle>
            <DialogContent>
              <EditProfile
                profile={profile}
                setProfile={setProfile}
                setSelectedImage={setSelectedImage}
              />
            </DialogContent>
            <DialogActions>
              <Button
                disabled={uploading}
                variant="text"
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSaveChanges}
                variant="text"
                color="success"
                disabled={isSaveDisabled}
                type="submit"
              >
                Save Changes
              </Button>
            </DialogActions>
            <SpinnerWithBackdrop
              backdropOpen={uploading}
              helperText="Please wait while we update your information"
            />
          </Dialog>

          <SuccessfulModal
            showSuccessMessage={showSuccessMessage}
            successMessage="Profile Updated Successfully!"
            HandleModalClosed={HandleModalClosed}
          />
          <ErrorModal
            showErrorMessage={showErrorMessage}
            errorMessage={errorMessage}
            HandleModalClosed={() => {
              setShowErrorMessage(false);
              setUploading(false);
            }}
          />

          {/* on successfull upload. */}
        </Card>
      )}
    </>
  );
};

export default ProfileInfo;
