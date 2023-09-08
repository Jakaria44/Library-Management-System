import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  Slider,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMenu } from "../../contexts/MenuContextProvider";
import Languages from "../../utils/Languages";
import AuthorInput from "../VirtualisedAuthorAutoComplete";
import server from "./../../HTTP/httpCommonParam";
import { defaultQueryOptions } from "./AllBooks";
const minDistance = 400;
const maxPage = 3000;
const maxYear = new Date().getFullYear();
const minDistanceYear = 2;

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Filters = ({ queries, loadAllBooks }) => {
  const [queryOptions, setQueryOptions] = useState(queries);

  // const opened = useMenu().menuOpened.opened;

  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const submit = () => {
    // setQ(queryOptions);
    loadAllBooks(queryOptions);
  };
  useEffect(() => {
    fetchAuthorGenrePublisher();
  }, []);
  const fetchAuthorGenrePublisher = async () => {
    try {
      let PublisherList = [];
      let res = await server.get("/getPublisher");
      PublisherList = res.data;
      if (!Array.isArray(res.data)) {
        PublisherList = [res.data];
      }

      let GenreList = [];
      res = await server.get("/getGenre");
      GenreList = res.data;
      if (!Array.isArray(res.data)) {
        GenreList = [res.data];
      }

      console.log(GenreList);
      let LanguageList = [];
      res = await server.get("/getLanguage");
      LanguageList = res.data;
      if (!Array.isArray(res.data)) {
        LanguageList = [res.data];
      }

      setLanguages(
        LanguageList.map((item) => ({
          NAME: Languages.filter((e) => e.code === item.LANGUAGE)[0].name,
          code: item.LANGUAGE,
        }))
      );

      setPublishers(
        PublisherList.map((item) => ({
          NAME: item.NAME,
          PUBLISHER_ID: item.PUBLISHER_ID,
        }))
      );
      setGenres(
        GenreList.map((item) => ({
          NAME: item.GENRE_NAME,
          GENRE_ID: item.GENRE_ID,
        }))
      );
    } catch (err) {
      setPublishers([]);
      setGenres([]);
      setLanguages([]);
    }
  };

  const blurPage = (e) => {
    if (e.target.value < 0) {
      setQueryOptions({ ...queryOptions, PAGE_START: 0 });
    }
    if (e.target.value > maxPage) {
      setQueryOptions({ ...queryOptions, PAGE_START: maxPage });
    }
  };

  const handlePageSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxPage - minDistance);
        setQueryOptions({
          ...queryOptions,
          PAGE_START: clamped,
          PAGE_END: clamped + minDistance,
        });
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setQueryOptions({
          ...queryOptions,
          PAGE_START: clamped - minDistance,
          PAGE_END: clamped,
        });
      }
    } else {
      setQueryOptions({
        ...queryOptions,
        PAGE_START: newValue[0],
        PAGE_END: newValue[1],
      });
    }
  };

  const blurYear = (e) => {
    if (e.target.value < 0) {
      setQueryOptions({ ...queryOptions, YEAR_START: 0 });
    }
    if (e.target.value > maxYear) {
      setQueryOptions({ ...queryOptions, YEAR_START: maxYear });
    }
  };

  const handleYearSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistanceYear) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxYear - minDistanceYear);
        setQueryOptions({
          ...queryOptions,
          YEAR_START: clamped,
          YEAR_END: clamped + minDistanceYear,
        });
      } else {
        const clamped = Math.max(newValue[1], minDistanceYear);
        setQueryOptions({
          ...queryOptions,
          YEAR_START: clamped - minDistanceYear,
          YEAR_END: clamped,
        });
      }
    } else {
      setQueryOptions({
        ...queryOptions,
        YEAR_START: newValue[0],
        YEAR_END: newValue[1],
      });
    }
  };
  const handleRatingSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setQueryOptions({
      ...queryOptions,
      RATING_START: newValue[0],
      RATING_END: newValue[1],
    });
  };

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Card sx={{ paddingX: { xs: 2, md: 0 } }} elevation={5}>
        <CardHeader margin="auto" title="Filters" />
        <CardContent>
          <Typography>Number of Pages</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrettoSlider
              value={[queryOptions.PAGE_START, queryOptions.PAGE_END]}
              valueLabelDisplay="auto"
              onChange={handlePageSlider}
              // onChangeCommitted={handlePageSlider}
              aria-label="pretto slider"
              min={0}
              max={maxPage}
              step={30}
              sx={{ width: "80%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Typography variant="caption">Start</Typography>
            <Input
              value={queryOptions.PAGE_START}
              size="small"
              onChange={(e) =>
                setQueryOptions({ ...queryOptions, PAGE_START: e.target.value })
              }
              onBlur={blurPage}
              inputProps={{
                step: 50,
                min: 0,
                max: 3000,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
            <Typography variant="caption">End</Typography>
            <Input
              value={queryOptions.PAGE_END}
              size="small"
              onChange={(e) =>
                setQueryOptions({ ...queryOptions, PAGE_END: e.target.value })
              }
              onBlur={blurPage}
              inputProps={{
                step: 50,
                min: 0,
                max: 3000,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Box>

          {/* publish year */}

          <Divider sx={{ marginTop: "2vh" }} />
          <Typography mt={1}>Publishing Year</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrettoSlider
              value={[queryOptions.YEAR_START, queryOptions.YEAR_END]}
              valueLabelDisplay="auto"
              onChange={handleYearSlider}
              // onChangeCommitted={handlePageSlider}
              aria-label="pretto slider"
              min={1900}
              max={maxYear}
              sx={{ width: "80%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Typography variant="caption">Start</Typography>
            <Input
              value={queryOptions.YEAR_START}
              size="small"
              onChange={(e) =>
                setQueryOptions({ ...queryOptions, YEAR_START: e.target.value })
              }
              onBlur={blurYear}
              inputProps={{
                step: 50,
                min: 1900,
                max: queryOptions.YEAR_END,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
            <Typography variant="caption">End</Typography>
            <Input
              value={queryOptions.YEAR_END}
              size="small"
              onChange={(e) =>
                setQueryOptions({ ...queryOptions, YEAR_END: e.target.value })
              }
              onBlur={blurYear}
              inputProps={{
                step: 50,
                min: queryOptions.YEAR_START,
                max: maxYear,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Box>

          {/* rating */}

          <Divider sx={{ marginTop: "2vh" }} />
          <Typography mt={1}>Rating</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrettoSlider
              value={[queryOptions.RATING_START, queryOptions.RATING_END]}
              valueLabelDisplay="auto"
              onChange={handleRatingSlider}
              // onChangeCommitted={handlePageSlider}
              aria-label="pretto slider"
              step={0.1}
              min={0}
              max={5}
              sx={{ width: "80%" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            > */}
            <Typography variant="caption">Start</Typography>
            <Input
              value={queryOptions.RATING_START}
              size="small"
              onChange={(e) =>
                setQueryOptions({
                  ...queryOptions,
                  RATING_START: e.target.value,
                })
              }
              onBlur={blurYear}
              inputProps={{
                step: 0.1,
                min: 1900,
                max: queryOptions.RATING_END,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />

            {/* <Rating
              value={queryOptions.RATING_START}
              onChange={(e) =>
                setQueryOptions({
                  ...queryOptions,
                  RATING_START: e.target.value,
                })
              }
              precision={0.2}
            /> */}
            {/* </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            > */}
            <Typography variant="caption">End</Typography>
            <Input
              value={queryOptions.RATING_END}
              size="small"
              onChange={(e) =>
                setQueryOptions({ ...queryOptions, RATING_END: e.target.value })
              }
              onBlur={blurYear}
              inputProps={{
                step: 0.1,
                min: queryOptions.RATING_START,
                max: maxYear,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
            {/* <Rating
                value={queryOptions.RATING_END}
                onChange={(e) =>
                  setQueryOptions({
                    ...queryOptions,
                    RATING_END: e.target.value,
                  })
                }
                precision={0.2}
              />
            </Box> */}
          </Box>

          {/* category select */}

          <Divider sx={{ marginY: "2vh" }} />
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item xs={3} margin="auto">
              <Typography variant="body2" margin="auto">
                Category
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                options={genres}
                id="category"
                value={
                  genres?.filter(
                    (item) => item.GENRE_ID === queryOptions.GENRE_ID
                  )[0] || ""
                }
                autoHighlight
                getOptionLabel={(option) => option?.NAME || ""}
                renderOption={(props, option) => (
                  <li key={option.GENRE_ID} {...props}>
                    {option.NAME}
                  </li>
                )}
                onChange={(e, value) => {
                  setQueryOptions({
                    ...queryOptions,
                    GENRE_ID: value?.GENRE_ID || null,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Category"
                    placeholder="Add Category"
                  />
                )}
                // isOptionEqualToValue={(option, value) =>
                //   option.AUTHOR_ID === value.AUTHOR_ID
                // }
                noOptionsText="No Category Found"
              />
            </Grid>
          </Grid>

          {/* Author select */}

          <Divider sx={{ marginY: "2vh" }} />
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item xs={3} margin="auto">
              <Typography variant="body2" margin="auto">
                Author
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {/* <Autocomplete
                options={authors}
                id="authorin"
                value={
                  authors?.filter(
                    (item) => item.AUTHOR_ID === queryOptions.AUTHOR_ID
                  )[0] || ""
                }
                autoHighlight
                getOptionLabel={(option) => option?.NAME || ""}
                renderOption={(props, option) => (
                  <li key={option.AUTHOR_ID} {...props}>
                    {option.NAME}
                  </li>
                )}
                onChange={(e, value) => {
                  setQueryOptions({
                    ...queryOptions,
                    AUTHOR_ID: value?.AUTHOR_ID || null,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Author"
                    placeholder="Add Author"
                  />
                )}
                // isOptionEqualToValue={(option, value) =>
                //   option.AUTHOR_ID === value.AUTHOR_ID
                // }
                noOptionsText="No Author Found"
                loading
                loadingText={<CircularProgress />}
              /> */}
              <AuthorInput
                value={queryOptions.AUTHOR_ID}
                setAuthor={setQueryOptions}
              />
            </Grid>
          </Grid>
          {/* publisher select */}

          <Divider sx={{ marginY: "2vh" }} />
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item xs={3} margin="auto">
              <Typography variant="body2" margin="auto">
                Publisher
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                options={publishers}
                id="authorin"
                value={
                  publishers?.filter(
                    (item) => item.PUBLISHER_ID === queryOptions.PUBLISHER_ID
                  )[0] || ""
                }
                autoHighlight
                getOptionLabel={(option) => option?.NAME || ""}
                renderOption={(props, option) => (
                  <li key={option.PUBLISHER_ID} {...props}>
                    {option.NAME}
                  </li>
                )}
                onChange={(e, value) => {
                  setQueryOptions({
                    ...queryOptions,
                    PUBLISHER_ID: value?.PUBLISHER_ID || null,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Publisher"
                    placeholder="Add Publisher"
                  />
                )}
                noOptionsText="No Publisher Found"
                loading
                loadingText={<CircularProgress />}
              />
            </Grid>
          </Grid>

          {/* language select */}

          <Divider sx={{ marginY: "2vh" }} />
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item xs={3} margin="auto">
              <Typography variant="body2" margin="auto">
                Language
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                options={languages}
                id="category"
                value={
                  languages?.filter(
                    (item) => item.code === queryOptions.LANGUAGE
                  )[0] || ""
                }
                autoHighlight
                getOptionLabel={(option) => option?.NAME || ""}
                renderOption={(props, option) => (
                  <li key={option.code} {...props}>
                    ({option.code}) {option.NAME}
                  </li>
                )}
                onChange={(e, value) => {
                  setQueryOptions({
                    ...queryOptions,
                    LANGUAGE: value?.code || null,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Language"
                    placeholder="Add Language"
                  />
                )}
                // isOptionEqualToValue={(option, value) =>
                //   option.AUTHOR_ID === value.AUTHOR_ID
                // }
                noOptionsText="No Category Found"
                loading
                loadingText={<CircularProgress />}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginY: "2vh" }} />
          <FormGroup>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={queryOptions.MY_FAV}
                  onChange={(e) =>
                    setQueryOptions({
                      ...queryOptions,
                      MY_FAV: e.target.checked,
                    })
                  }
                />
              }
              label="My Favourite"
            />
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={queryOptions.MY_RAT}
                  onChange={(e) =>
                    setQueryOptions({
                      ...queryOptions,
                      MY_RAT: e.target.checked,
                    })
                  }
                />
              }
              label="My Rated"
            />
          </FormGroup>
          {/* <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item xs={9} margin="auto">
              <Typography variant="body2" margin="auto">
                My Favourites
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Switch
                checked={queryOptions.FAVOURITE}
                onChange={(e) =>
                  setQueryOptions({
                    ...queryOptions,
                    FAVOURITE: e.target.checked,
                  })
                }
                color="success"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
          </Grid> */}
        </CardContent>

        <CardActions>
          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button onClick={submit} variant="contained">
              Submit
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Filters;
