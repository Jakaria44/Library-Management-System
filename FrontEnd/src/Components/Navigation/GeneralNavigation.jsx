import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider} from "@mui/material";
import {Home, DensityMedium, Category, FeaturedPlayList} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {createStyles, makeStyles} from '@mui/styles';
import {forwardRef} from "react";


const MyNavLink = forwardRef((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({isActive}) => `${props.className} ${isActive ? props.activeClassName : ''}`}
  >
    {props.children}
  </NavLink>
));


const useStyles = makeStyles(({Theme}) =>
  createStyles({
    activeLink: {
      backgroundColor: '#19ABC0',
      color: '#FFFFFF',
      borderRadius: 8,
      '& .MuiSvgIcon-root': {
        color: '#FFFFFF',
        stroke: '#FFFFFF',
        fill: '#19ABC0',
      },
    },
  })
);
const GeneralNavigation = () => {
  const classes = useStyles();
  const navigationsAll = [
    {
      name: "Home",
      icon: <Home/>,
      page: "/Home"
    },
    {
      name: "All Books",
      icon: <DensityMedium/>,
      page: "/AllBooks"
    },
    {
      name: "Categories",
      icon: <Category/>,
      page: "/Categories"
    },
    {
      name: "Featured",
      icon: <FeaturedPlayList/>
    }

  ]
  return (
    <ThemeProvider theme={Theme}>

    <List>
      {navigationsAll.map((object, index) => (
        <ListItem component={MyNavLink}
                  sx={{
                    color: '#8C8C8C',
                  }}
                  activeClassName={classes.activeLink} to={object.page} key={index} disablePadding

        >
          <ListItemButton>
            <ListItemIcon>
              {object.icon}
            </ListItemIcon>
            <ListItemText primary={object.name}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </ThemeProvider>
  )
}

export default GeneralNavigation;