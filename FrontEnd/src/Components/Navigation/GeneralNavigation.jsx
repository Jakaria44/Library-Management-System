import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Home, DensityMedium, Category, FeaturedPlayList} from "@mui/icons-material";

const GeneralNavigation = () => {
  const navigationsAll = [
    {
      name: "Home",
      icon: <Home/>
    },
    {
      name: "All Books",
      icon: <DensityMedium/>
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
        <ListItem key={index} disablePadding>
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