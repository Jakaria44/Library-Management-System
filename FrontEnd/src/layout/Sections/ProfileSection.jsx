import { useEffect, useRef, useState } from "react";

// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import server from "./../../HTTP/httpCommonParam";
// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import Transitions from "../../ui-component/extended/Transitions";
import MainCard from "./../../ui-component/cards/MainCard";

// assets

import { Feed, Login, Logout, PersonAddAlt } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import ErrorModal from "../../component/ErrorModal";
import SuccessfulModal from "../../component/SuccessfulModal";
import TextArea from "../../component/TextArea";

// ==============================|| PROFILE MENU ||============================== //
const ProfileSection = () => {
  const theme = useTheme();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showingNewsModal, setShowingNewsModal] = useState(false);
  const [news, setNews] = useState("");
  const navigate = useNavigate();
  //   const customization = useSelector((state) => state.customization);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await server.get("/user/details");
      console.log(response.data);
      setName(response.data.FIRST_NAME + " " + response.data.LAST_NAME);
      setImage(response.data.IMAGE);
      // setUser();
    } catch (err) {
      console.log(err);
      setImage(null);
      setName(null);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState("");
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.reload();
  };

  const handleClose = (event) => {
    if (
      (anchorRef.current && anchorRef.current.contains(event.target)) ||
      showingNewsModal
    ) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const submitNews = async () => {
    try {
      const res = await server.post("/publish-news", {
        NEWS: news,
      });
      console.log(res.data);
      setSuccessMessage(res.data.message);
      setShowSuccessMessage(true);
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setShowErrorMessage(true);
      console.log(err);
    }
  };

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.background,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.background.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.textDark,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={image ? image : <PersonAddAlt />}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <SettingsIcon
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">WELCOME,</Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          {name || "GUEST"}
                        </Typography>
                      </Stack>
                      <Typography my={2} variant="body1">
                        {localStorage.getItem("role")?.toUpperCase() ||
                          "Please Sign In"}
                      </Typography>
                    </Stack>
                    {/* <OutlinedInput
                      sx={{ width: "100%", pr: 1, pl: 2, my: 2 }}
                      id="input-search-profile"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search profile options"
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon
                            fontSize="small"
                            color={theme.palette.grey[500]}
                          />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    /> */}
                    <Divider />
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: "100%",
                      maxHeight: "calc(100vh - 250px)",
                      overflowX: "hidden",
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      {/* <Card
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          my: 2,
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid
                                item
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Start DND Mode
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={sdm}
                                    onChange={(e) => setSdm(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid
                                item
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Allow Notifications
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) =>
                                      setNotification(e.target.checked)
                                    }
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card> */}

                      {/* <Divider /> */}
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                        {name && (
                          <ListItemButton
                            sx={{
                              borderRadius: "12px",
                            }}
                            selected={selectedIndex === 0}
                            component={Link}
                            to="/profile"
                          >
                            <ListItemIcon>
                              <SettingsIcon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2">
                                  My Account
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        )}
                        <ListItemButton
                          sx={{
                            borderRadius: "12px",
                          }}
                          selected={selectedIndex === 1}
                          onClick={(event) => setShowingNewsModal(true)}
                        >
                          <ListItemIcon>
                            <Feed stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText>
                            <Grid
                              container
                              spacing={1}
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <Typography variant="body2">
                                  Publish News
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItemText>
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: "12px",
                          }}
                          selected={selectedIndex === 4}
                          onClick={() => {
                            if (name) {
                              handleLogout();
                            } else {
                              navigate("/signin");
                            }
                          }}
                        >
                          <ListItemIcon>
                            {name ? (
                              <Logout stroke={1.5} size="1.3rem" />
                            ) : (
                              <Login stroke={1.5} size="1.3rem" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                {name ? "Sign out" : "Sign in"}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      <TextArea
        open={showingNewsModal}
        limit={2000}
        handleClose={(event) => {
          setShowingNewsModal(false);
        }}
        handleSubmit={() => {
          submitNews();
        }}
        setValue={setNews}
        title="Publish News"
        buttonText="Publish"
      />

      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
          setShowingNewsModal(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
          setShowingNewsModal(false);
        }}
      />
    </>
  );
};

export default ProfileSection;
