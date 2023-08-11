import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider} from "@mui/material";
import {Home, DensityMedium, Category, FeaturedPlayList} from "@mui/icons-material";
import {NavLink} from "react-router-dom";

const GeneralNavigation = () => {
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

    <List>
      {navigationsAll.map((object, index) => (
        <ListItem as={NavLink} to={object.page} key={index} disablePadding  className={'active'}  >
          <ListItemButton>
            <ListItemIcon>
              {object.icon}
            </ListItemIcon>
            <ListItemText primary={object.name}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default GeneralNavigation;