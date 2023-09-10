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
import React, { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
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
  borderRadius: "4px",
  padding: "16px",
  marginBottom: "16px",
});

const ListItemStyled = styled(ListItem)({
  marginBottom: "8px",
});

const PublicationComponent = ({ id }) => {
  const [publication, setPublisher] = useState();
  useEffect(() => {
    getPublisherDetails();
  }, []);

  const getPublisherDetails = async () => {
    try {
      const response = await server.get(`/getPublisher?pid=${id}`);
      console.log(response.data);
      setPublisher(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid container spacing={3}>
      {publication && (
        <>
          <Grid item xs={12} sm={6}>
            <PublicationCard>
              <CardMediaStyled
                component="img"
                alt={`${publication.NAME} Logo`}
                image={publication[0].IMAGE}
              />
              <div>
                <Typography variant="h3">{publication[0].NAME}</Typography>
              </div>
            </PublicationCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoList>
              {publication[0].POSTAL_CODE && (
                <ListItemStyled>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Postal Code: ${publication[0].POSTAL_CODE}`}
                  />
                </ListItemStyled>
              )}
              {publication[0].CITY && (
                <ListItemStyled>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText primary={`City: ${publication[0].CITY}`} />
                </ListItemStyled>
              )}
              {publication[0].COUNTRY && (
                <ListItemStyled>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Country: ${publication[0].COUNTRY}`}
                  />
                </ListItemStyled>
              )}
              {publication[0].CONTACT_NO && (
                <ListItemStyled>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Contact: ${publication[0].CONTACT_NO}`}
                  />
                </ListItemStyled>
              )}
              {publication[0].EMAIL && (
                <ListItemStyled>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary={`Email: ${publication[0].EMAIL}`} />
                </ListItemStyled>
              )}
            </InfoList>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PublicationComponent;
