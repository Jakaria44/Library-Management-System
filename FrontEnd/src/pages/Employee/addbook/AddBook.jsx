import { CollectionsBookmark, Info } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { StepConnector, stepConnectorClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../component/ErrorModal";
import SpinnerWithBackdrop from "../../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../../component/SuccessfulModal";
import Languages from "../../../utils/Languages";
import server from "./../../../HTTP/httpCommonParam";
import AuthorGenrePublisherAdd from "./AuthorGenrePublisherAdd";
import EditionAdd from "./EditionAdd";
import GeneralAdd from "./GeneralAdd";
const defaultImage =
  "https://st2.depositphotos.com/5703046/12114/i/950/depositphotos_121142344-stock-photo-white-book-on-white-background.jpg";
const steps = [
  "General Information",
  "Add Author, Publisher and Category",
  "Set Edition Information",
];
let general = {
  isbn: "",
  title: "",
  image: defaultImage,
  language: null,
  description: "",
  numOfPage: 0,
};
let authorgenre = {
  authors: [],
  publisher: null,
  genre: [],
};
let formField = [{ id: null, Edition: "", Publish_Year: "", Available: "" }];

export default function AddBook({ bookDetails }) {
  const [successMessage, setSuccessMessage] = React.useState("");
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [invalidISBN, setInvalidISBN] = React.useState(true);
  const navigate = useNavigate();
  const [direction, setDirection] = React.useState("left");
  const containerRef = React.useRef(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const [generalInfo, setGeneralInfo] = React.useState(general);
  const [authorGenrePublisher, setAuthorGenrePublisher] =
    React.useState(authorgenre);

  const [formFields, setFormFields] = React.useState(formField);
  const initialize = async () => {
    // _isbn = "9781408855652";
    if (bookDetails) {
      const data = bookDetails;
      console.log(JSON.parse(data.EDITION));
      general = {
        isbn: data.ISBN,
        title: data.TITLE,
        image: data.IMAGE,
        language: Languages.filter((item) => item.code === data.LANGUAGE)[0],
        description: data.DESCRIPTION,
        numOfPage: data.PAGE,
      };
      authorgenre = {
        authors: JSON.parse(data.AUTHOR).map((item) => {
          return { AUTHOR_ID: item.ID, NAME: item.NAME };
        }),
        publisher: {
          PUBLISHER_ID: data.PUBLISHER_ID,
          NAME: data.PUBLISHER_NAME,
        },
        genre: JSON.parse(data.GENRE).map((item) => {
          return { GENRE_ID: item.ID, GENRE_NAME: item.NAME };
        }),
      };
      formField = JSON.parse(data.EDITION).map((item) => {
        return {
          id: item.ID,
          Edition: item.NUM,
          Publish_Year: dayjs(new Date(`1/1/${item.YEAR}`)),
          Available: item.COUNT,
        };
      });
      console.log(general, authorgenre, formField);
      setGeneralInfo(general);
      setAuthorGenrePublisher(authorgenre);
      setFormFields(formField);
    }
  };
  React.useEffect(() => {
    initialize();
  }, []);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <GeneralAdd
            editing={bookDetails ? true : false}
            setInvalidISBN={setInvalidISBN}
            book={generalInfo}
            setBook={setGeneralInfo}
          />
        );
      case 1:
        return (
          <AuthorGenrePublisherAdd
            authorGenrePublisher={authorGenrePublisher}
            setAuthorGenrePublisher={setAuthorGenrePublisher}
          />
        );
      case 2:
        return (
          <EditionAdd formFields={formFields} setFormFields={setFormFields} />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const handleNext = (e) => {
    e.preventDefault();
    console.log("next");
    // const data = new FormData(e.currentTarget);
    // console.log(data);

    // setDirection("left");
    if (activeStep !== 2) {
      setActiveStep(activeStep + 1);
    } else {
      setUploading(true);
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    // console.log(generalInfo, authorGenrePublisher, formFields);

    const generalInfoSubmit = {
      ISBN: generalInfo.isbn,
      TITLE: generalInfo.title,
      IMAGE: generalInfo.image,
      DESCRIPTION: generalInfo.description,
      LANGUAGE: generalInfo.language.code,
      NUMBER_OF_PAGES: generalInfo.numOfPage,
      PUBLISHER_ID: authorGenrePublisher.publisher.PUBLISHER_ID,
      Authors: authorGenrePublisher.authors.map((item) => {
        return { AUTHOR_ID: item.AUTHOR_ID };
      }),
      Genres: authorGenrePublisher.genre.map((item) => {
        return { GENRE_ID: item.GENRE_ID };
      }),
      Editions: formFields
        .filter((item) => item.id === null)
        .map((item) => {
          return {
            EDITION_NUM: item.Edition,
            NUM_OF_COPIES: item.Available,
            PUBLISH_YEAR: item.Publish_Year.toDate().getFullYear(),
          };
        }),
    };

    try {
      let res;
      if (bookDetails) {
        res = await server.put("/book", generalInfoSubmit);
      } else {
        res = await server.post("/book", generalInfoSubmit);
      }
      // console.log(generalInfoSubmit);
      console.log(res.data);

      setUploading(false);
      setSuccessMessage(res.data.message);
      setShowSuccessMessage(true);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
      setUploading(false);
      setShowErrorMessage(true);
    }

    // console.log(object);
  };

  const handleBack = () => {
    setDirection("right");
    setActiveStep(activeStep - 1);
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#aaa" : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <Info />,
      2: <GroupAddIcon />,
      3: <CollectionsBookmark />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <Container
        component="form"
        id="addBookForm "
        noValidate={false}
        onSubmit={handleNext}
        maxWidth="md"
        sx={{ mb: 4 }}
      >
        <Paper
          background="background.paper"
          elevation={24}
          sx={{ p: { xs: 2, md: 3 } }}
          square
        >
          <Typography component="h1" gutterBottom variant="h2" align="center">
            {bookDetails ? "Edit Book" : "Add Book"}
          </Typography>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {/* <Slide
              container={containerRef.current}
              direction={direction}
              in={true}
              mountOnEnter
              unmountOnExit
            > */}
            {getStepContent(activeStep)}

            {/* </Slide> */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                type="submit"
                disabled={invalidISBN}
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep !== steps.length - 1
                  ? "Next"
                  : bookDetails
                  ? "Update Book"
                  : "Add Book"}
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
      <SpinnerWithBackdrop
        backdropOpen={uploading}
        helperText="Please wait while we upload this book"
      />
      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);

          navigate("/details/" + generalInfo.isbn);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => setShowErrorMessage(false)}
      />
    </React.Fragment>
  );
}
