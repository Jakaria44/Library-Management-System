export default function componentStyleOverrides(theme) {
    const bgColor = theme.background;
    return {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: theme.heading,
                    color: theme.backgroundDefault,
                },
            },
        },
        MuiLoadingButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: bgColor,
                        background: theme.colors?.grey300,
                    },
                },
                textSuccess: {
                    color: theme.colors?.textDark,
                    background: theme.colors?.successMain,
                    '&:hover': {
                        background: theme.colors?.seccessDark,
                    },
                },
                loading: {
                    color: theme.colors?.textDark,
                    background: theme.colors?.successMain,
                    '&:hover': {
                        background: theme.colors?.seccessDark,
                    },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: '4px',
                    color: theme.textDark,
                    transition: 'all .2s ease-in-out',
                    background: theme.buttonBackground,
                    '&:hover': {
                        color: theme.background,
                        background: theme.heading,
                    },
                },
                textError: {
                    background: theme.colors?.errorMain,
                    '&:hover': {
                        background: theme.colors?.errorDark,
                    },
                },
                textSuccess: {
                    color: theme.colors?.textDark,
                    background: theme.colors?.successMain,
                    '&:hover': {
                        background: theme.colors?.seccessDark,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    transition: 'all .2s ease-in-out',
                    color: theme.textDark,
                    background: theme.background,
                    '&:hover': {
                        color: theme.background,
                        background: theme.heading,
                    },
                },
                rounded: {
                    borderRadius: '12px',
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    background: theme.background,
                },
                rounded: {
                    borderRadius: '8px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    padding: '12px',
                    background: theme.backgroundDefault,
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.colors?.textDark,
                    padding: '12px',
                },
                title: {
                    fontSize: '1.125rem',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '12px 12px 4px 12px',
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    marginTop: 'auto',
                    padding: '12px',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: '12px',
                    '&.Mui-selected': {
                        color: theme.menuSelected,
                        backgroundColor: theme.menuSelectedBack,
                        '&:hover': {
                            backgroundColor: theme.menuSelectedBack,
                        },
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected,
                        },
                    },
                    '&:hover': {
                        backgroundColor: theme.menuSelectedBack,
                        color: theme.menuSelected,
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected,
                        },
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    minWidth: '36px',
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme.textDark,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.darkTextSecondary,
                        fontSize: '0.875rem',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: bgColor,
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors?.grey400,
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.colors?.primaryLight,
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1,
                    },
                },
                input: {
                    fontWeight: 500,
                    background: bgColor,
                    padding: '15.5px 14px',
                    borderRadius: '12px',
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0,
                        },
                    },
                },
                inputAdornedStart: {
                    paddingLeft: 4,
                },
                notchedOutline: {
                    borderRadius: '12px',
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: theme.colors?.grey300,
                    },
                },
                mark: {
                    backgroundColor: theme.paper,
                    width: '4px',
                },
                valueLabel: {
                    color: theme?.colors?.primaryLight,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.divider,
                    opacity: 1,
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit',
                    },
                    '&.MuiChip-colorError':{
                        color: '#000'
                    }
                },
                
            },
        },
        // MuiTooltip: {
        //     styleOverrides: {
        //         tooltip: {
        //             color: theme.paper,
        //             background: theme.colors?.grey700,
        //         },
        //     },
        // },
    };
}
