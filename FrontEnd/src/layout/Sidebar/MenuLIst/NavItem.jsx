import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// material-ui
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import { actions } from "../../../contexts/actions";

// assets
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useMenu } from "../../../contexts/MenuContextProvider";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const { menuOpened, dispatch } = useMenu();
  const menu = menuOpened;
  const { pathname } = useLocation();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  //   const itemIcon = item?.icon ? (
  //     <Icon stroke={1.5} size="1.3rem" />
  //   ) : (
  //     <FiberManualRecordIcon
  //       sx={{
  //         width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
  //         height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
  //       }}
  //       fontSize={level > 0 ? 'inherit' : 'medium'}
  //     />
  //   );
  const itemIcon = item?.icon;

  let listItemProps = {
    // eslint-disable-next-line
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={item.url} />
    )),
  };

  const itemHandler = (id) => {
    dispatch({ type: actions.OPEN_MENU, opened: id });
    if (matchesSM) dispatch({ type: actions.TOGGLE_SIDE_DRAWER });
  };

  // active menu item on page load
  useEffect(() => {
    const currentPath = document.location.pathname.toString().split("/");
    if (currentPath[1] === item.id) {
      console.log(document.location.pathname.toString().split("/"), item.id);
      dispatch({ type: actions.OPEN_MENU, opened: item.id });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: "12px",
        mb: 0.5,
        alignItems: "flex-start",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={menu.id === item.id}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={menu.id === item.id ? "h5" : "body1"}
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
