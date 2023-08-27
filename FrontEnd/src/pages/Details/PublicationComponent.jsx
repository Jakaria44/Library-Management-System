import { Email, LocationOn, Phone } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const PublicationCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const CardMediaStyled = styled(CardMedia)({
  minWidth: 100,
  maxWidth: 150,
  height: "auto",
  marginRight: "16px", // Adjust spacing as needed
});

const InfoList = styled(List)({
  backgroundColor: "#f5f5f5", // Add your desired background color
  borderRadius: "4px",
  padding: "16px",
  marginBottom: "16px",
});

const ListItemStyled = styled(ListItem)({
  marginBottom: "8px",
});

const PublicationComponent = ({ publication }) => {
  return (
    publication && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <PublicationCard>
            <CardMediaStyled
              component="img"
              alt={`${publication.NAME} Logo`}
              image={publication.IMAGE}
            />
            <div>
              <Typography variant="h3">{publication.NAME}</Typography>
            </div>
          </PublicationCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoList>
            {publication.POSTAL_CODE && (
              <ListItemStyled>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText
                  primary={`Postal Code: ${publication.POSTAL_CODE}`}
                />
              </ListItemStyled>
            )}
            {publication.CITY && (
              <ListItemStyled>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary={`City: ${publication.CITY}`} />
              </ListItemStyled>
            )}
            {publication.COUNTRY && (
              <ListItemStyled>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary={`Country: ${publication.COUNTRY}`} />
              </ListItemStyled>
            )}
            {publication.CONTACT_NO && (
              <ListItemStyled>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary={`Contact: ${publication.CONTACT_NO}`} />
              </ListItemStyled>
            )}
            {publication.EMAIL && (
              <ListItemStyled>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary={`Email: ${publication.EMAIL}`} />
              </ListItemStyled>
            )}
          </InfoList>
        </Grid>
      </Grid>
    )
  );
};

export default PublicationComponent;
