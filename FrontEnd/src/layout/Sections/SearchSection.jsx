import { useEffect, useMemo, useState } from "react";

// material-ui
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  Grow,
  InputAdornment,
  OutlinedInput,
  Popper,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import server from "./../../HTTP/httpCommonParam";
// third-party
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";

// project imports
import Transitions from "../../ui-component/extended/Transitions";

// assets
import ClearIcon from "@mui/icons-material/Clear";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { shouldForwardProp } from "@mui/system";
import CardForSearchbar from "../../component/CardForSearchbar";

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: "99%",
  top: "-55px !important",
  padding: "0 12px",

  [theme.breakpoints.down("sm")]: {
    padding: "0 10px",
  },
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 734,
    // background: {theme.palette.background},
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    transition: "all .2s ease-in-out",
    color: theme.palette.heading,
    "& input": {
      background: "transparent !important",
      paddingLeft: "4px !important",
    },
    [theme.breakpoints.down("lg")]: {
      width: 450,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 4,
      background: "#fff",
    },
  })
);

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(
  ({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: "all .2s ease-in-out",
    // background: theme.palette.background,
    // color: theme.palette.primary.dark,
    // "&:hover": {
    //   background: theme.palette.secondary.dark,
    //   color: theme.palette.primary.light,
    // },
  })
);

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState, searchClickHandler }) => {
  const theme = useTheme();

  return (
    <OutlineInputStyle
      id="input-search-header"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      sx={{ color: theme.palette.background }}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon color="theme.palette.heading" />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <ButtonBase
            onClick={searchClickHandler}
            sx={{ borderRadius: "12px" }}
          >
            <HeaderAvatarStyle variant="rounded">
              <SearchOutlinedIcon />
            </HeaderAvatarStyle>
          </ButtonBase>
          <Box sx={{ ml: 2 }}>
            <ButtonBase sx={{ borderRadius: "12px" }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  // background: theme.palette.secondary.light,
                  // color: theme.palette.secondary.dark,
                  // "&:hover": {
                  //   background: theme.palette.secondary.dark,
                  //   color: theme.palette.primary.light,
                  // },
                }}
                {...bindToggle(popupState)}
              >
                <ClearIcon />
              </Avatar>
            </ButtonBase>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      inputProps={{ "aria-label": "weight" }}
    />
  );
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const small = useMediaQuery(theme.breakpoints.down("md"));
  const [result, setResult] = useState([]);
  useEffect(() => {
    console.log(value);
    if (value !== "") getSearchResults(value.replaceAll(/ /g, ""));
  }, [value]);
  const handleSearchChange = (e) => {
    setValue(e.target.value);
    setAnchorEl(e.currentTarget);
  };
  const getSearchResults = async (value) => {
    const queryOptions = {
      text: value,
      count: small ? 5 : 5,
      sort: "TITLE",
      order: "ASC",
    };
    try {
      const response = await server.get("/search-bar", {
        params: queryOptions,
      });
      console.log(response.data);
      setResult(response.data);
    } catch (err) {
      setResult([]);
      console.log(err);
    }
  };

  const searchResults = useMemo(() => result.map((item) => item), [result]);

  const searchClickHandler = () => {
    console.log(value);
  };
  const canBeOpen = value.length && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <ButtonBase sx={{ borderRadius: "12px" }}>
                  <HeaderAvatarStyle
                    variant="rounded"
                    {...bindToggle(popupState)}
                  >
                    <SearchOutlinedIcon
                      fontSize="small"
                      color={theme.background}
                    />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions
                      type="zoom"
                      {...TransitionProps}
                      sx={{ transformOrigin: "center left" }}
                    >
                      <Card
                        sx={{
                          [theme.breakpoints.down("sm")]: {
                            border: 0,
                            boxShadow: "none",
                          },
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item xs>
                              <MobileSearch
                                value={value}
                                setValue={setValue}
                                popupState={popupState}
                                searchClickHandler={searchClickHandler}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={handleSearchChange}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Box sx={{ m: 2 }}>
                <ButtonBase
                  onClick={() => {
                    setValue("");
                  }}
                  sx={{ borderRadius: "12px" }}
                >
                  <Avatar
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      "&:hover": {
                        background: theme.palette.error.dark,
                        color: theme.palette.primary.light,
                      },
                    }}
                  >
                    <ClearIcon />
                  </Avatar>
                </ButtonBase>
              </Box>
              <ButtonBase
                onClick={searchClickHandler}
                sx={{ borderRadius: "12px" }}
              >
                <HeaderAvatarStyle variant="rounded">
                  <SearchOutlinedIcon />
                </HeaderAvatarStyle>
              </ButtonBase>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ "aria-label": "weight" }}
        />
        {/* <CardForSearchbar /> */}
        <Popper
          sx={{ zIndex: 1800 }}
          id={id}
          open={searchResults.length}
          anchorEl={anchorEl}
          placement="bottom"
          transition
        >
          {({ TransitionProps }) => (
            <Grow
              style={{
                transformOrigin: "top", // Set the transform origin to top
              }}
              {...TransitionProps}
              timeout={350}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="left"
                alignItems="left"
                width={648}
                height={small ? 300 : 400}
                overflowY="scroll"
                sx={{ p: 1, bgcolor: "background.default" }}
              >
                <CardForSearchbar book={searchResults} />
              </Box>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  );
};

export default SearchSection;
