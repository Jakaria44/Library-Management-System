import { useTheme } from "@emotion/react";
import { CalendarMonth, Language } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/Book";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PageviewIcon from "@mui/icons-material/Pageview";
import PersonIcon from "@mui/icons-material/Person";
import {
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const TitleAndCoverPage = ({ book, editions }) => {
  const [selectedEdition, setSelectedEdition] = useState(editions[0]);
  const theme = useTheme();

  const editionOptions = editions.map((edition) => ({
    label: `Edition ${edition.EDITION}`,
    value: edition.EDITION,
    pages: edition.NUMBER_OF_PAGES,
    availableCopies: edition.AVAILABLE_COPIES,
  }));

  const handleEditionChange = (event) => {
    const selectedValue = event.target.value;
    const selectedEdition = book.editions.find(
      (edition) => edition.EDITION === selectedValue
    );
    setSelectedEdition(selectedEdition);
  };
  const handleAddToCart = () => {
    // Implement your add to cart functionality here
    console.log(
      "Added to cart:",
      book.TITLE,
      "Edition:",
      selectedEdition.EDITION
    );
  };
  const bookInfoList = [
    { icon: <BookIcon />, label: book.TITLE, variant: "h1" },
    {
      icon: <PersonIcon />,
      label: `Author: ${book.AUTHOR_NAME}`,
      variant: "h3",
    },
    {
      icon: <LocalLibraryIcon />,
      label: `Publisher: ${book.PUBLISHER_NAME}`,
      variant: "h3",
    },
    {
      icon: <PageviewIcon />,
      label: `Pages: ${selectedEdition.NUMBER_OF_PAGES}`,
      variant: "h3",
    },
    {
      icon: <ConfirmationNumberIcon />,
      label: `Available Copies: ${selectedEdition.AVAILABLE_COPIES}`,
      variant: "h3",
    },
    { icon: <Language />, label: `Language: ${book.LANGUAGE}`, variant: "h3" },
    {
      icon: <CalendarMonth />,
      label: `Publish Year: ${book.PUBLISH_YEAR}`,
      variant: "h3",
    },
  ];

  return (
    <Grid container spacing={2}>
      {/* Left side: Book Image */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
          <img src={book.IMAGE} alt={book.TITLE} style={{ width: "100%" }} />
          <Typography variant="body2" style={{ marginTop: "16px" }}>
            ISBN: {book.ISBN}
          </Typography>
        </Paper>
      </Grid>

      {/* Right side: Book Information */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: "16px" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {bookInfoList.map((info, index) => (
              <ListItem key={index}>
                <ListItemIcon>{info.icon}</ListItemIcon>
                <ListItemText
                  primary={info.label}
                  primaryTypographyProps={{
                    fontWeight: "medium",
                    variant: `${info.variant}`,
                  }}
                />
              </ListItem>
            ))}
          </ul>

          <Typography
            variant="h3"
            style={{ marginTop: "16px", marginLeft: "16px" }}
          >
            Edition:
            <Select
              value={selectedEdition.EDITION}
              onChange={handleEditionChange}
              style={{ marginLeft: "8px" }}
            >
              {editionOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Typography>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              style={{ margin: "16px" }}
            >
              Add to Cart
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TitleAndCoverPage;