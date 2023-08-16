// material-ui
import { Typography } from "@mui/material";

// project imports
import { MenuItems } from "./../MenuItems/MenuItems";
import NavGroup from "./NavGroup";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const navItems = MenuItems.items.map((item, i) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={i} item={item} />;
      default:
        return (
          <Typography key={i} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
