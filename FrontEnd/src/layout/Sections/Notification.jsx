import { useEffect, useRef, useState } from "react";

// material-ui
import {
  Avatar,
  Badge,
  Box,
  Card,
  Chip,
  ClickAwayListener,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project import
import {
  CheckCircleOutline,
  Close,
  Comment,
  NotificationsNone,
} from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import ErrorModal from "../../component/ErrorModal";
import MessageModal from "../../component/MessageModal";
import SuccessfullModal from "../../component/SuccessfulModal";
import TimeFormat from "../../utils/TimeFormat";
import server from "./../../HTTP/httpCommonParam";
// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

const actionSX = {
  mt: "6px",
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",

  transform: "none",
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const confirm = useConfirm();
  const [numberOfUnseen, setNumberOfUnseen] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const getMyNotifications = async () => {
    try {
      const res = await server.get("/message");
      setNotifications(res.data);
      console.log(res.data);
      setNumberOfUnseen(
        res.data.filter((notification) => notification.SEEN === 0).length
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMyNotifications();
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    if (showMessage || showErrorMessage || showSuccessMessage) {
      return;
    }
    setOpen(false);
  };

  const deleteMessage = async (id) => {
    try {
      await confirm({
        title: (
          <Typography variant="h3" gutterBottom>
            Delete This Message?
          </Typography>
        ),
        content: (
          <Typography variant="body1">
            Are you sure you want to delete this Message?
          </Typography>
        ),
      });

      try {
        const res = await server.delete(`/edit-message?mid=${id}`);
        await getMyNotifications();

        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
        console.log(err);
      } finally {
        setShowMessage(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function markAll() {
    try {
      const res = await server.get("/mark-all");
      getMyNotifications();
      setSuccessMessage(res.data.message);
      setShowSuccessMessage(true);
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setShowErrorMessage(true);
      console.log(err);
    }
  }
  function NotificationAvatar({ msg }) {
    if (msg?.includes("accepted")) {
      return <CheckCircleOutline color="success" />;
    } else if (msg?.includes("rejected")) {
      return <Close color="error" />;
    }
    // else if ( )
    return <Comment />;
  }

  function SingleNotification({ id, date, msg, seen }) {
    return (
      <ListItem divider>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "primary.main",
              bgcolor: "primary.lighter",
            }}
          >
            <NotificationAvatar msg={msg} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setMessage({ msg: msg, id: id });
            setShowMessage(true);
          }}
          primary={
            <Tooltip title="Click to view full message" placement="left">
              <Typography variant="body2">
                <Typography component="span" variant="subtitle1">
                  {msg.substring(0, 65) + (msg.length > 65 ? "..." : "")}
                </Typography>
              </Typography>
            </Tooltip>
          }
          secondary={
            <Typography variant="caption" noWrap>
              {TimeFormat(date)}
            </Typography>
          }
          // secondary="Daily scrum meeting time"
        />
        <ListItemSecondaryAction>
          <Tooltip title="Delete">
            <Avatar
              edge="end"
              aria-label="delete"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                deleteMessage(id);
              }}
            >
              <Close />
            </Avatar>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={numberOfUnseen} max={99} color="primary">
          <Avatar variant="circular">
            <NotificationsNone />
          </Avatar>
        </Badge>
      </IconButton>
      <Popper
        placement="bottom-start"
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [matchesXs ? -5 : 0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            style={{
              transformOrigin: "top right", // Set the transform origin to top right
            }}
            {...TransitionProps}
          >
            <Paper
              sx={{
                width: "100%",
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down("md")]: {
                  maxWidth: 285,
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Card elevation={7}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 2, pt: 1.25, pb: 1.25 }}
                  >
                    <Box sx={{ p: 2, pt: 1.25, pb: 1.25 }}>
                      <Typography variant="h3">Notifications</Typography>
                    </Box>
                    <Box>
                      <Chip
                        label="Mark All As Read"
                        size="small"
                        onClick={markAll}
                      ></Chip>
                    </Box>
                  </Box>
                  <List
                    sx={{
                      height: { xs: 300, sm: 450 },
                      overflowY: "scroll",
                      bgcolor: "theme.background.default",
                      borderRadius: "8px",
                      p: 0,
                      "& .MuiListItemButton-root": {
                        py: 0.5,
                        "& .MuiAvatar-root": avatarSX,
                        "& .MuiListItemSecondaryAction-root": {
                          ...actionSX,
                          position: "relative",
                        },
                      },
                    }}
                  >
                    {!notifications.length ? (
                      <Typography
                        variant="h3"
                        textAlign="center"
                        gutterBottom
                        p={2}
                        component="div"
                      >
                        No notifications
                      </Typography>
                    ) : (
                      notifications.map((notification) => (
                        <SingleNotification
                          key={notification.MESSAGE_ID}
                          id={notification.MESSAGE_ID}
                          date={new Date(notification.MESSAGE_DATE)}
                          msg={notification.MESSAGE}
                          seen={notification.SEEN}
                        />
                      ))
                    )}
                  </List>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <MessageModal
        showMessage={showMessage}
        message={message.msg}
        HandleClosed={() => {
          setShowMessage(false);
        }}
        HandleDelete={() => {
          deleteMessage(message.id);
        }}
      />
      <SuccessfullModal
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
        }}
      />
    </Box>
  );
};

export default Notification;
