import {
  ArrowForwardIos,
  Badge,
  BadgeOutlined,
  CalendarMonth,
  CheckCircleOutline,
  Email,
  LocationOn,
  Person,
  Phone,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
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
  Modal,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import { storage } from "../firebaseConfig";
import EditProfile from "./EditProfile";
// import server from '../../HTTP/httpCommonParam';
const ProfileInfo = ({ user }) => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profile, setProfile] = useState(user);
  const [selectedImage, setSelectedImage] = useState(user.IMAGE);
  const [uploading, setUploading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const theme = useTheme();
  const InfoList = styled(List)({
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "16px",
  });

  const isSaveDisabled = Object.values(profile).some((value) => value === "");
  const editProfileHandler = (event) => {
    event.preventDefault();
    setEditProfileOpen(true);
  };
  const handleClose = (event, reason = "") => {
    if (!uploading) setEditProfileOpen(false);
  };
  const handleSaveChanges = () => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }
    setUploading(true);
    const imageRef = ref(storage, `profileImages/${v4()}`);

    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          const updatedProfile = { ...profile, IMAGE: url };
          setProfile(updatedProfile);
          console.log(updatedProfile);
          setUploading(false);
          setShowSuccessMessage(true);
        });
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
      });
  };
  const HandleModalClosed = () => {
    setShowSuccessMessage(false);
    handleClose();
  };
  const StyledSuccessModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const ListItemStyled = styled(ListItem)({
    marginBottom: "8px",
  });
  return (
    <Card sx={{ padding: { md: "16px" } }} elevation={3}>
      <Typography align="center" variant="h1" marginBottom={2}>
        Welcome {profile.FIRST_NAME}
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
                <ListItemText primary={`First Name: ${profile.FIRST_NAME}`} />
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

          <LoadingButton
            onClick={handleSaveChanges}
            endIcon={<ArrowForwardIos />}
            loading={uploading}
            loadingPosition="end"
            variant="text"
            color="success"
            disabled={isSaveDisabled}
            type="submit"
          >
            Save Changes
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* on successfull upload. */}
      <StyledSuccessModal
        open={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
      >
        <div
          className="success-modal-content"
          style={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "12px",
          }} // Use theme color
        >
          <Box p={2} display="flex" flexDirection="column" alignItems="center">
            <CheckCircleOutline fontSize="large" sx={{ color: "green" }} />
            <Typography margin={2} variant="h4">
              Upload Successful!
            </Typography>
            <Button
              margin={2}
              padding={2}
              variant="contained"
              color="primary"
              onClick={HandleModalClosed}
            >
              Close
            </Button>
          </Box>
        </div>
      </StyledSuccessModal>
    </Card>
  );
};

export default ProfileInfo;