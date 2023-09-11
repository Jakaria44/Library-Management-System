import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
import { TimeFormat2 } from "../../utils/TimeFormat";

const AuthorCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CardMediaStyled = styled(CardMedia)({
  minWidth: 120,
  maxWidth: 170,
  height: "auto",
  marginRight: "16px", // Adjust spacing as needed
});

const DescriptionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),

  maxHeight: 300,
  overflow: "auto",
}));

const AuthorComponent = ({ author }) => {
  useEffect(() => {
    console.log(author);
  }, []);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item container xs={12} sm={4}>
          <AuthorCard>
            <CardMediaStyled
              component="img"
              alt={`${author.NAME} Image`}
              image={author.IMAGE}
            />

            <Typography variant="h3" mt={2} gutterBottom>
              {author.NAME}
            </Typography>
            <Typography variant="subtitle1">
              Date of Birth: {TimeFormat2(author.DOB)}
            </Typography>
            {author.DOD && (
              <Typography variant="subtitle1">
                Date of Death: {TimeFormat2(author.DOD)}
              </Typography>
            )}
          </AuthorCard>
        </Grid>
        <Grid item xs={12} sm={8}>
          <DescriptionCard>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Bio
              </Typography>
              <Typography variant="body1">{author.BIO}</Typography>
            </CardContent>
          </DescriptionCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthorComponent;
