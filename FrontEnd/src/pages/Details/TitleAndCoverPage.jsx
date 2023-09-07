// need to add genre
import { useTheme } from "@emotion/react";
import {
  Book,
  CalendarMonth,
  Category,
  ConfirmationNumber,
  Language,
  LocalLibrary,
  Pageview,
  Person,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SignupDialog from "../../component/SignupDialog";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import server from "./../../HTTP/httpCommonParam";
import Languages from "./../../utils//Languages";

const CategoryList = ({ category }) => {
  return (
    <Grid container mx={2} spacing={2} direction="row">
      {category.map((element) => (
        <Grid item key={element.id}>
          <Tooltip title={"View More of this Category"}>
            <Chip
              label={element.name}
              variant="primary"
              color="info"
              style={{ margin: "4px" }}
              component={Link}
              to={`/categories/${element.id}`}
            />
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};
const TitleAndCoverPage = ({ book, editions }) => {
  const [isFavourite, setIsFavourite] = useState(book.IS_FAVOURITE);
  const [selectedEdition, setSelectedEdition] = useState(editions[0]);
  const [showMessage, setShowMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const theme = useTheme();

  const initializeCategory = () => {
    const category = [];
    const genre = JSON.parse(book.GENRE);
    genre.forEach((element) => {
      category.push({ name: element.NAME, id: element.ID });
    });
    setCategory(category);
  };

  useEffect(() => {
    initializeCategory();
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

  const apply = async () => {
    console.log("id ", selectedEdition.id);
    setLoading(true);
    try {
      const response = await server.post(`/request`, {
        EDITION_ID: selectedEdition.id,
      });
      console.log(response.data);
      setSuccessMessage(response.data.message);
      setShowSuccessMessage(true);
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setShowErrorMessage(true);
    } finally {
      setLoading(false);
    }
  };
  const handleApplyToGet = () => {
    if (
      localStorage.getItem("role") === "user" ||
      localStorage.getItem("role") === "employee"
    ) {
      apply();
    } else {
      // do some pop up;
      setShowMessage(true);
    }
  };

  const handleAddToFavourite = () => {
    if (
      localStorage.getItem("role") === "user" ||
      localStorage.getItem("role") === "employee"
    ) {
      changeFavouriteStatus();
    } else {
      // do some pop up;
      setShowMessage(true);
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
    {
      icon: <Language />,
      label: `Language: ${
        Languages.filter((item) => item.code === book.LANGUAGE)[0].name
      }`,
      variant: "h3",
    },
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
        {loading ? (
          <Stack spacing={1} width="100%">
            <Skeleton variant="rectangular" height="70%" width="100%" />
            <Skeleton variant="text" height="30%" width="100%" />
          </Stack>
        ) : (
          <Paper
            elevation={3}
            sx={{ padding: { md: "16px" }, textAlign: "center" }}
          >
            <img src={book.IMAGE} alt={book.TITLE} style={{ width: "100%" }} />
            <Typography variant="body2" style={{ marginTop: "16px" }}>
              ISBN: {book.ISBN}
            </Typography>
          </Paper>
        )}
      </Grid>

      {/* Right side: Book Information */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: "16px" }}>
          <List>
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
            <ListItem key={bookInfoList.length + 2}>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText
                primary="Categories: "
                primaryTypographyProps={{
                  fontWeight: "medium",
                  variant: "h3",
                }}
              />
              <CategoryList category={category} />
            </ListItem>
          </List>
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
              onClick={handleApplyToGet}
              style={{ margin: "8px" }}
            >
              Apply to Get
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

      <SignupDialog
        showMessage={showMessage}
        message="Please sign in to add.."
        HandleModalClosed={() => {
          setShowMessage(false);
        }}
      />

      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
        }}
      />
      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please Wait" />
    </Grid>
  );
};

export default TitleAndCoverPage;
