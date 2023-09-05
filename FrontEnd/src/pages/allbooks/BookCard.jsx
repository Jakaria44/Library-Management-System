import {
  Archive,
  Edit,
  Favorite,
  FavoriteBorder,
  FileCopy,
  MoreHoriz,
  RemoveRedEye,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SignupDialog from "../../component/SignupDialog";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import server from "./../../HTTP/httpCommonParam";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const BookCard = ({ book }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFavourite, setIsFavourite] = useState(book.IS_FAVOURITE);
  const [showMessage, setShowMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const ref = useRef(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
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

  const apply = async () => {
    setLoading(true);
    // try {
    //   const response = await server.post(`/request`, {
    //     EDITION_ID: selectedEdition.id,
    //   });
    //   console.log(response.data);
    //   setShowSuccessMessage(true);
    // } catch (err) {
    //   setShowErrorMessage(true);
    //   if (err.response.status === 402) {
    //     setErrorMessage("You have Due Books");
    //   } else if (err.response.status === 404) {
    //     setErrorMessage("You have already requested this book");
    //   }
    // } finally {
    setLoading(false);
    // }
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

  return (
    <>
      <Card
        onMouseLeave={handleMouseLeave}
        raised
        sx={{ width: { sm: 200, xs: "100%" }, height: 370 }}
        elevation={12}
      >
        <CardMedia
          onMouseEnter={handleMouseEnter}
          component="img"
          sx={{ height: 220, maxWidth: 140, margin: "auto" }}
          image={book.IMAGE}
          alt={book.TITLE}
        />

        <CardContent marginBottom="0px">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="text.primary "
            sx={{ maxHeight: 48 }}
          >
            {book.TITLE}
          </Typography>
          <Typography variant="body1" noWrap color="text.secondary">
            {book.AUTHORS}
          </Typography>
        </CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Tooltip title="View Details" placement="top">
            <IconButton
              component={Link}
              to={`/details/${book.ISBN}`}
              center
              size="large"
              color="primary"
              // margin="8px"
            >
              <RemoveRedEye />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            placement="top"
          >
            <IconButton
              onClick={handleAddToFavourite}
              center
              size="large"
              color="primary"
            >
              {isFavourite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Book" placement="top">
            <IconButton
              onClick={handleClick}
              center
              size="large"
              color="primary"
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <Edit />
              Edit
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <FileCopy />
              Duplicate
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <Archive />
              Archive
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <MoreHoriz />
              More
            </MenuItem>
          </StyledMenu>
        </div>
        <Backdrop
          ref={ref}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isHovered}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button onClick={handleApplyToGet}>Apply to Get</Button>
          </Box>
        </Backdrop>
      </Card>

      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage="Added to Application List"
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
      <SignupDialog
        showMessage={showMessage}
        message="Please sign in to add.."
        HandleModalClosed={() => {
          setShowMessage(false);
        }}
      />

      <SpinnerWithBackdrop backdropOpen={loading} helperText="Please Wait" />
    </>
  );
};

export default BookCard;
