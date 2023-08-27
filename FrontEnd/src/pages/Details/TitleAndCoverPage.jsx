// need to add genre

import { useTheme } from "@emotion/react";
import {
  Book,
  CalendarMonth,
  ConfirmationNumber,
  Language,
  LocalLibrary,
  Pageview,
  Person,
} from "@mui/icons-material";
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
import { useEffect, useState } from "react";
import server from "./../../HTTP/httpCommonParam";
const TitleAndCoverPage = ({ book, editions }) => {
  const [isFavourite, setIsFavourite] = useState(book.IS_FAVOURITE);
  const [selectedEdition, setSelectedEdition] = useState(editions[0]);
  const theme = useTheme();

  useEffect(() => {
    console.log(editions);
  }, []);
  const handleEditionChange = (event) => {
    console.log(editions);
    const selectedValue = event.target.value;
    const selectedEdition = editions.find(
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

  const handleAddToFavourite = () => {
    if (
      localStorage.getItem("role") === "user" ||
      localStorage.getItem("role") === "employee"
    ) {
      changeFavouriteStatus();
    } else {
      alert("please log in to add ");
      return;
    }
  };
  const changeFavouriteStatus = async () => {
    // remove from favourite
    const response = await server.post(`/edit-favourite?id=${book.ISBN}`);
    console.log(response);
    setIsFavourite(response.data.IS_FAVOURITE);
  };
  const bookInfoList = [
    { icon: <Book />, label: book.TITLE, variant: "h1" },
    {
      icon: <Person />,
      label: `Author: ${JSON.parse(book.AUTHOR)
        .map((author) => author.NAME)
        .join(", ")}`,
      variant: "h3",
    },
    {
      icon: <LocalLibrary />,
      label: `Publisher: ${book.PUBLISHER_NAME}`,
      variant: "h3",
    },
    {
      icon: <Pageview />,
      label: `Pages: ${book.PAGE}`,
      variant: "h3",
    },
    {
      icon: <ConfirmationNumber />,
      label: `Available Copies: ${selectedEdition?.AVAILABLE_COPIES}`,
      variant: "h3",
    },
    { icon: <Language />, label: `Language: ${book.LANGUAGE}`, variant: "h3" },
    {
      icon: <CalendarMonth />,
      label: `Publish Year: ${selectedEdition?.YEAR}`,
      variant: "h3",
    },
  ];

  return (
    <Grid container spacing={2}>
      {/* Left side: Book Image */}
      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{ padding: { md: "16px" }, textAlign: "center" }}
        >
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
              {editions.map((option) => (
                <MenuItem key={option.EDITION} value={option.EDITION}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              style={{ margin: "8px" }}
            >
              GET
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToFavourite}
              style={{ margin: "8px" }}
            >
              {isFavourite ? "Remove from Favourite" : "Add to Favourite"}
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TitleAndCoverPage;
