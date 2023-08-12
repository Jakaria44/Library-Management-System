import {Beenhere, Favorite, Reviews} from "@mui/icons-material";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";


const UserNavigation =()=>{

  const userNavigations = [
    {
      name: "Favorites",
      icon: <Favorite/>
    }, {
      name: "Wishlist",
      icon: <Beenhere/>
    }, {
      name: "Reviewed",
      icon: <Reviews/>
    },

  ]
  
  return (
    <List>
      {userNavigations.map((object, index) => (
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

export default UserNavigation;