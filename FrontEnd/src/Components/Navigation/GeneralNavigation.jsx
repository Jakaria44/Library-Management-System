import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Home, DensityMedium, Category, FeaturedPlayList} from "@mui/icons-material";
import {NavLink} from "react-router-dom";

const GeneralNavigation = () => {
  const navigationsAll = [
    {
      name: "Home",
      icon: <Home/>,
      address: "/"
    },
    {
      name: "All Books",
      icon: <DensityMedium/>,
      address: "/allBooks"

    },
    {
      name: "Categories",
      icon: <Category/>
    },
    {
      name: "Featured",
      icon: <FeaturedPlayList/>
    }

  ]
  return (
    <List>
      {navigationsAll.map((object, index) => (
        <ListItem as={NavLink} to={object.address} key={index} disablePadding>
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