import PropTypes from 'prop-types';
import {useState} from 'react';

// material-ui
import {useTheme, styled} from '@mui/material/styles';
import {Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper} from '@mui/material';

import FormControl, {useFormControl} from '@mui/material/FormControl';

// third-party
import PopupState, {bindPopper, bindToggle} from 'material-ui-popup-state';

// project imports
import Transitions from '../../ui-component/extended/Transitions';

// assets
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import {shouldForwardProp} from '@mui/system';

// styles
const PopperStyle = styled(Popper, {shouldForwardProp})(({theme}) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, {shouldForwardProp})(({theme}) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    transition: 'all .2s ease-in-out',
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, {shouldForwardProp})(({theme}) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: 'all .2s ease-in-out',
    background: theme.palette.secondary.light,
    color: theme.palette.primary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.primary.light
    }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({value, setValue, popupState, searchClickHandler}) => {
    const theme = useTheme();

    return (

        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}

            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                    <SearchOutlinedIcon/>
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <ButtonBase onClick={searchClickHandler} sx={{borderRadius: '12px'}}>
                        <HeaderAvatarStyle variant="rounded">
                            <SearchOutlinedIcon/>
                        </HeaderAvatarStyle>
                    </ButtonBase>
                    <Box sx={{ml: 2}}>
                        <ButtonBase sx={{borderRadius: '12px'}}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    background: theme.palette.secondary.light,
                                    color: theme.palette.secondary.dark,
                                    '&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.primary.light
                                    }
                                }}
                                {...bindToggle(popupState)}
                            >
                                <ClearIcon/>
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{'aria-label': 'weight'}}
        />
    );
};


// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const theme = useTheme();
    const [value, setValue] = useState('');

    const searchClickHandler = () => {
        console.log(value);
    }
    return (
        <>
            <Box sx={{display: {xs: 'block', md: 'none'}}}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ml: 2}}>
                                <ButtonBase sx={{borderRadius: '12px'}}>
                                    <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                        <SearchOutlinedIcon fontSize='small'  color={theme.palette.grey[500]}/>
                                    </HeaderAvatarStyle>
                                </ButtonBase>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({TransitionProps}) => (
                                    <>
                                        <Transitions type="zoom" {...TransitionProps}
                                                     sx={{transformOrigin: 'center left'}}>
                                            <Card
                                                sx={{
                                                    background: '#fff',
                                                    [theme.breakpoints.down('sm')]: {
                                                        border: 0,
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                            >
                                                <Box sx={{p: 2}}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch value={value} setValue={setValue}
                                                                          popupState={popupState}
                                                                          searchClickHandler={searchClickHandler}/>
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
            <Box sx={{display: {xs: 'none', md: 'block'}}}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchOutlinedIcon/>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <Box sx={{m: 2}}>
                                <ButtonBase onClick={() => {
                                    setValue("")
                                }} sx={{borderRadius: '12px'}}>
                                    <Avatar
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.mediumAvatar,
                                            background: theme.palette.secondary.light,
                                            color: theme.palette.secondary.dark,
                                            '&:hover': {
                                                background: theme.palette.error.dark,
                                                color: theme.palette.primary.light
                                            }
                                        }}
                                    >
                                        <ClearIcon />
                                    </Avatar>
                                </ButtonBase>
                            </Box>
                            <ButtonBase onClick={searchClickHandler} sx={{borderRadius: '12px'}}>
                                <HeaderAvatarStyle variant="rounded">
                                    <SearchOutlinedIcon/>
                                </HeaderAvatarStyle>
                            </ButtonBase>

                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{'aria-label': 'weight'}}
                />
            </Box>
        </>
    );
};

export default SearchSection;
