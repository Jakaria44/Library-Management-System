import {
  Cancel,
  Delete,
  DoneOutline,
  Edit,
  Favorite,
  FavoriteBorder,
  FileCopy,
  RemoveRedEye,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Menu,
  MenuItem,
  Rating,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../component/ErrorModal";
import SignupDialog from "../../component/SignupDialog";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import EditionAdd from "../Employee/addbook/EditionAdd";
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
  const confirm = useConfirm();
  const [manageEditionOpen, setManageEditionOpen] = useState(false);
  const [newEditions, setNewEditions] = useState();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFavourite, setIsFavourite] = useState(book.IS_FAVOURITE);
  const [showMessage, setShowMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("success");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const ref = useRef(null);

  // console.log(book);
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
      ["admin", "employee", "user"].includes(
        localStorage.getItem("role")?.toLowerCase()
      )
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

    try {
      const response = await server.post(`/request`, {
        EDITION_ID: book.EDITION_ID,
      });
      console.log(response.data);
      setSuccessMessage(response.data.message);
      setShowSuccessMessage(true);
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setShowErrorMessage(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleApplyToGet = () => {
    if (
      ["admin", "employee", "user"].includes(
        localStorage.getItem("role")?.toLowerCase()
      )
    ) {
      apply();
    } else {
      // do some pop up;
      setShowMessage(true);
    }
  };
  const fullEditHandler = () => {
    handleClose();
    navigate(`/editbook/${book.ISBN}`);
  };
  const manageEdition = () => {
    handleClose();
    setManageEditionOpen(true);
  };
  const deleteBook = async () => {
    handleClose();

    try {
      await confirm({
        title: "Delete Book",
        description: "Are you sure you want to delete this book?",
        confirmationText: "Delete",
        cancellationText: "Cancel",
        confirmationButtonProps: { variant: "outlined", color: "error" },
        cancellationButtonProps: { variant: "contained", color: "error" },
      });
      try {
        const res = await server.delete(`/book?id=${book.ISBN}`);
        setSuccessMessage(res.data.message);
        setShowSuccessMessage(true);
      } catch (err) {
        setErrorMessage(err.response.data.message);
        setShowErrorMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const submitNewEditions = (e) => {
    e.preventDefault();
    setManageEditionOpen(false);
    const newEd = newEditions
      .filter((item) => item.id === null)
      .map((item) => {
        return {
          EDITION_NUM: item.Edition,
          NUM_OF_COPIES: item.Available,
          PUBLISH_YEAR: item.Publish_Year.toDate().getFullYear(),
        };
      });
    if (newEd.length) {
      uploadNewEditions(newEd);
    }
  };
  const uploadNewEditions = async (edition) => {
    try {
      const res = await server.post("/getEdition", {
        ISBN: book.ISBN,
        Editions: edition,
      });
      setSuccessMessage(res.data.message);
      setShowSuccessMessage(true);
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setShowErrorMessage(true);
    }
  };
  return (
    <>
      <Card
        onMouseLeave={handleMouseLeave}
        raised
        sx={{ width: { xs: "100%" }, height: 380 }}
        elevation={12}
      >
        {/* <CardMedia
          onMouseEnter={handleMouseEnter}
          component="img"
          sx={{  }}
          image={book.IMAGE}
          alt={book.TITLE}
        /> */}
        <ImageListItem cols={1} rows={2}>
          <img
            onMouseEnter={handleMouseEnter}
            style={{ height: 240, maxWidth: 150, margin: "auto" }}
            src={book.IMAGE}
            alt={book.TITLE}
            loading="lazy"
          />
          {book.RATING && (
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              // title={book.TITLE}
              position="top"
              actionIcon=//   sx={{ color: "white" }} // <IconButton
              //   aria-label={`star ${book.TITLE}`}
              // >
              //   <StarBorder />
              // </IconButton>
              {<Rating value={book.RATING} precision={0.01} readOnly />}
              actionPosition="left"
            />
          )}
        </ImageListItem>
        <CardContent marginBottom="0px">
          <Box display="flex" flexDirection="column">
            <Box flexGrow={2}>
              <Tooltip title={book.TITLE}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="text.primary "
                  sx={{ maxHeight: 48 }}
                >
                  {book.TITLE.length > 30
                    ? book.TITLE.slice(0, 30) + "..."
                    : book.TITLE}
                </Typography>
              </Tooltip>
            </Box>
            <Box flexGrow={1}>
              <Typography
                flexGrow={3}
                variant="body1"
                noWrap
                color="text.secondary"
              >
                {book.AUTHORS}
              </Typography>
            </Box>
          </Box>
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
          {["employee", "admin"].includes(
            localStorage.getItem("role")?.toLowerCase()
          ) && (
            <>
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
                <MenuItem onClick={fullEditHandler} disableRipple>
                  <Edit />
                  Full edit
                </MenuItem>
                <MenuItem onClick={manageEdition} disableRipple>
                  <FileCopy />
                  Manage Editions
                </MenuItem>
                <MenuItem onClick={deleteBook} disableRipple>
                  <Delete color="error" />
                  Delete Book
                </MenuItem>
              </StyledMenu>
            </>
          )}
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

      <Dialog
        component="form"
        onSubmit={submitNewEditions}
        open={manageEditionOpen}
        onClose={(event, reason) => {
          if (reason === "escapeKeyDown" || reason === "backdropClick") return;
          setManageEditionOpen(false);
        }}
      >
        <DialogTitle variant="h3">Manage Editions</DialogTitle>
        <DialogContent>
          You need to update or delete previous editions individually
        </DialogContent>
        <UpdateEdition isbn={book.ISBN} setNewEditions={setNewEditions} />
        <DialogActions>
          <IconButton onClick={() => setManageEditionOpen(false)}>
            <Cancel />
          </IconButton>
          <IconButton type="submit">
            <DoneOutline />
          </IconButton>
        </DialogActions>
      </Dialog>

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

let formField = [{ id: null, Edition: "", Publish_Year: "", Available: "" }];

const UpdateEdition = ({ isbn, setNewEditions }) => {
  const [formFields, setFormFields] = useState(formField);
  useEffect(() => {
    laodAllEditions();
  }, []);

  useEffect(() => {
    setNewEditions(formFields);
  }, [formFields]);
  const laodAllEditions = async () => {
    try {
      let data = [];
      const res = await server.get(`/getEdition?id=${isbn}`);
      if (!Array.isArray(res.data)) {
        data = [res.data];
      } else {
        data = res.data;
      }
      setFormFields(
        data.map((item) => {
          return {
            id: item.EDITION_ID,
            Edition: item.EDITION_NUM,
            Publish_Year: dayjs(new Date(`1/1/${item.PUBLISH_YEAR}`)),
            Available: item.NUM_OF_COPIES,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return <EditionAdd formFields={formFields} setFormFields={setFormFields} />;
};
