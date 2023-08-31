import { useEffect, useRef, useState } from "react";

// material-ui
import {
  Avatar,
  Badge,
  Box,
  Card,
  ClickAwayListener,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project import
import { Close, NotificationsNone } from "@mui/icons-material";
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
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const getMyNotifications = async () => {
    try {
      const res = await server.get(`/api/notifications`);
      setNotifications(res.data.notifications);
      setNumberOfNotifications(res.data.notifications.length);
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
    setOpen(false);
  };

  const deleteMessage = async (id) => {
    try {
      await server.delete(`/api/notifications/${id}`);
      getMyNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  function SingleNotification({ id, date, msg }) {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "primary.main",
              bgcolor: "primary.lighter",
            }}
          >
            {msg[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body2">
              <Typography component="span" variant="subtitle1">
                {msg}
              </Typography>
            </Typography>
          }
          secondary={
            <Typography variant="caption" noWrap>
              {date.toLocaleString()}
            </Typography>
          }
          // secondary="Daily scrum meeting time"
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              deleteMessage(id);
            }}
          >
            <Close />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        // color="secondary"
        // sx={{
        //   color: "text.primary",
        //   // bgcolor: open ? iconBackColorOpen : iconBackColor,
        // }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar variant="rounded" sx={{ ...avatarSX }}>
          <Badge badgeContent={numberOfNotifications} color="primary">
            <NotificationsNone />
          </Badge>
        </Avatar>
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
          <Fade {...TransitionProps}>
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
                      <IconButton size="small" onClick={handleToggle}>
                        <Close />
                      </IconButton>
                    </Box>
                  </Box>
                  <List
                    component="nav"
                    sx={{
                      // bgcolor: "theme.background.default",
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
                          key={notification.id}
                          date={new Date(notification.createdAt)}
                          msg={notification.message}
                        />
                      ))
                    )}
                  </List>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
