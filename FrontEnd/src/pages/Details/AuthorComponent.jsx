import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const AuthorCard = styled(Card)(({ theme }) => ({
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

const DescriptionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const AuthorComponent = ({ author }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <AuthorCard>
            <CardMediaStyled
              component="img"
              alt={`${author.NAME} Image`}
              image={author.IMAGE}
            />
            <div>
              <Typography variant="h3">{author.NAME}</Typography>
              <Typography variant="subtitle1">
                Date of Birth: {author.DOB}
              </Typography>
              {author.DOD && (
                <Typography variant="subtitle1">
                  Date of Death: {author.DOD}
                </Typography>
              )}
            </div>
          </AuthorCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DescriptionCard>
            <CardContent>
              <Typography variant="h3">{author.NAME}</Typography>
              <Typography variant="body1">{author.BIO}</Typography>
            </CardContent>
          </DescriptionCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthorComponent;
