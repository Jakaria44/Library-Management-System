// material-ui
import { Divider, List, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import NavItem from "./NavItem";
// import NavCollapse from '../NavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = item.children?.map((menu, i) => {
    switch (menu.type) {
      //   case 'collapse':
      //     return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case "item":
        return <NavItem key={i} item={menu} level={1} />;
      default:
        return (
          <Typography key={i} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.menuCaption }}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default NavGroup;
