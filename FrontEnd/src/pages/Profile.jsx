import {
  Badge, BadgeOutlined,
  CalendarMonth, EditOutlined,
  Email,
  LocationOn,
  Person,
  Phone,
} from '@mui/icons-material'
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { Link } from 'react-router-dom'
// import server from '../../HTTP/httpCommonParam';
const ProfilePage = ({user}) => {



  const InfoList = styled(List)({
    // Add your desired background color
    borderRadius: "4px",
    padding: "16px",
    marginBottom: "16px",
  });

  const ListItemStyled = styled(ListItem)({
    marginBottom: "8px",
  });
  const ListItemTextStyled = styled(ListItemText)({});
  return (
    <Card sx={{ padding: { md: "16px" } }} elevation={3}>
      <Typography align="center" variant="h1" marginBottom={2}>
        {" "}
        Welcome {user.FIRST_NAME}{" "}
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        backgroundColor="background.default"
        borderRadius="12px"
        sx={{ padding: { md: "16px" }, textAlign: "center" }}
      >
        {/* Left side: Book Image */}

        <Grid item xs={12} md={4}>
          <img
            src={user.IMAGE}
            alt={user.FIRST_NAME}
            style={{ width: "100%" }}
          />
        </Grid>

        {/* Right side: Book Information */}
        <Grid item xs={12} md={8}>
          <InfoList>
            {user.FIRST_NAME && (
              <ListItemStyled>
                <ListItemIcon>
                  <Badge />
                </ListItemIcon>
                <ListItemText primary={`First Name: ${user.FIRST_NAME}`} />
              </ListItemStyled>
            )}
            {user.LAST_NAME && (
              <ListItemStyled>
                <ListItemIcon>
                  <BadgeOutlined />
                </ListItemIcon>
                <ListItemText primary={`Last Name: ${user.LAST_NAME}`} />
              </ListItemStyled>
            )}
            {user.EMPLOYEE_TYPE && (
              <ListItemStyled>
                <ListItemIcon>
                  <Badge />
                </ListItemIcon>
                <ListItemText primary={`Employee Type: ${user.EMPLOYEE_TYPE}`} />
              </ListItemStyled>
            )}
            {user.JOIN_DATE && (
              <ListItemStyled>
                <ListItemIcon>
                  <CalendarMonth />
                </ListItemIcon>
                <ListItemText primary={`Join Date: ${user.JOIN_DATE}`} />
              </ListItemStyled>
            )}
            {user.ADDRESS && (
              <ListItemStyled>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary={`Address: ${user.ADDRESS}`} />
              </ListItemStyled>
            )}
            {user.CONTACT_NO && (
              <ListItemStyled>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary={`Contact: ${user.CONTACT_NO}`} />
              </ListItemStyled>
            )}
            {user.EMAIL && (
              <ListItemStyled>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary={`Email: ${user.EMAIL}`} />
              </ListItemStyled>
            )}
            {user.GENDER &&                (
              <ListItemStyled>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={`Gender: ${user.GENDER === 'M'? 'Male': 'Female'}`} />
              </ListItemStyled>
            )}
          </InfoList>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Link to={`/editprofile/${user.ID}`}>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "8px" }}
          >
            Edit Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProfilePage;
