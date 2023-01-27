import { useState, forwardRef, useEffect, useCallback } from 'react';
import {
    AppBar, Box, Dialog, IconButton, List, ListItemButton, Button,
    ListItemText, Toolbar, Typography, Slide, useTheme, Fab, Link,
    useMediaQuery, darken, lighten
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useRouter } from 'next/router';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function Navbar({ darkMode, setDarkMode }) {
    const [scrollY, setScrollY] = useState(0);
    const [mobile, setMobile] = useState(true)
    const [open, setOpen] = useState(false);
    const theme = useTheme()
    const router = useRouter()

    const pages = {
        "home": {
            darkColor: "#ff8811", whiteColor: "#E2C044"
        },
        "about": {
            darkColor: "#df2935", whiteColor: "#fc7a57"
        },
        "articles": {
            darkColor: "#73ab84", whiteColor: "#99d19c"
        },
        "projects": {
            darkColor: "#c08552", whiteColor: "#dab49d"
        },
        "contact": undefined
    };

    const preferDark = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        setDarkMode(preferDark);
    }, [setDarkMode, preferDark]);

    function handleResize() {
        setMobile(window.innerWidth <= 768)
    }

    const onScroll = useCallback(event => {
        const { scrollY } = window;
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
        handleResize()
        window.addEventListener("scroll", onScroll, { passive: true })
        console.log(pages[router.pathname.split("/")[1]])
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener("scroll", onScroll, { passive: true })
        }
    }, [])


    const trigger = 350

    function setColor() {
        if ((scrollY < trigger) && (pages[router.pathname.split("/")[1]] !== undefined)) {
            if (darkMode) {
                return pages[router.pathname.split("/")[1]].darkColor
            } else {
                return pages[router.pathname.split("/")[1]].whiteColor
            }
        }
        if (darkMode) {
            return lighten(theme.palette.background.default, 0.15)
        } else {
            return darken(theme.palette.background.default, 0.15)
        }
    }

    function buttonColor(page) {
        if (page === router.pathname.split("/")[1]) {
            if ((scrollY > trigger) && (pages[router.pathname.split("/")[1]] !== undefined)) {
                if (darkMode) {
                    return pages[router.pathname.split("/")[1]].darkColor
                } else {
                    return pages[router.pathname.split("/")[1]].whiteColor
                }
            } else {
                if (page === "contact") {
                    if (darkMode) {
                        return lighten(theme.palette.background.default, 0.2)
                    } else {
                        return darken(theme.palette.background.default, 0.2)
                    }

                } else {
                    return theme.palette.getContrastText(theme.palette.text.primary)
                }
            }
        } else {
            return "transparent"
        }
    }

    return (
        <Box>
            {
                (mobile) ?
                    <Fab sx={{
                        position: "fixed", top: "0", right: "0", margin: 2, 
                        transition:"background-color 1s ease-in-out",
                        backgroundColor: setColor(), "&:hover": { backgroundColor: setColor() }
                    }} size="small" onClick={() => setOpen(!open)}>
                        {
                            (open) ? <MenuOpenIcon sx={{ fontSize: 25, color: theme.palette.text.primary }} />
                                : <MenuIcon sx={{ fontSize: 25, color: theme.palette.text.primary }} />
                        }
                    </Fab>
                    :
                    <AppBar sx={{
                        boxShadow: "none", bgcolor: setColor(),
                        padding: 0, transition: "background-color 1s ease-in-out"
                    }} elevation={0}>
                        <Toolbar sx={{ marginX: 0, paddingX: 2 }}>
                            <Link href="/home" underline="none" variant="subtitle1"
                                color={theme.palette.text.primary} sx={{ transition: "all 1s ease-in-out" }}>
                                clementc.dev
                            </Link>
                            <Box sx={{ flexGrow: 1 }} />
                            {
                                Object.entries(pages).map(([page, value]) => (
                                    <Button disableRipple sx={{
                                        borderRadius: 10, marginX: 0.5, textTransform: 'none',
                                        color: theme.palette.text.primary, backgroundColor: buttonColor(page),
                                        '&:hover': { backgroundColor: buttonColor(page) }
                                    }} key={page}
                                        size="small" onClick={() => {
                                            router.push("/" + page, undefined, { scroll: false }); setOpen(false)
                                        }}>{page}</Button>
                                ))
                            }

                            <IconButton onClick={() => setDarkMode(!darkMode)} disableRipple>
                                {darkMode ?
                                    <LightModeIcon/>
                                    : <NightlightIcon/>}
                            </IconButton>
                        </Toolbar>
                    </AppBar >
            }
            <Dialog open={open} onClose={() => setOpen(false)} fullScreen TransitionComponent={Transition}
                PaperProps={{ style: { backgroundColor: setColor(), 
                transition:"background-color 1s ease-in-out" } }} sx={{ height: "100%" }}>
                <Toolbar sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                    <Link href="/home" underline="none" variant="subtitle1"
                        color={theme.palette.text.primary} sx={{ transition: "all 1s ease-in-out" }}>
                        clementc.dev
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onClick={() => setOpen(!open)}>
                        <CloseIcon sx={{ fontSize: 30, transition: "all 1s ease-in-out" }} />
                    </IconButton>
                </Toolbar>

                <List sx={{
                    width: "100%", display: "flex", alignItems: "center", flexDirection: "column"
                }}>
                    {
                        Object.entries(pages).map(([page, value]) => (
                            <ListItemButton sx={{
                                width: "100%", display: "flex", alignItems: "center",
                                flexDirection: "column", justifyContent: "center"
                            }} key={page} selected={"/" + page === router.pathname}
                                onClick={() => { router.push("/" + page); setOpen(false) }}>
                                <ListItemText sx={{ marginY: 1 }} 
                                primary={<Typography sx={{transition: "all 1s ease-in-out"}} variant="h6">{page}</Typography>} />
                            </ListItemButton>

                        ))
                    }
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <Toolbar sx={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}>
                    <IconButton onClick={() => setDarkMode(!darkMode)} disableRipple>
                        {darkMode ?
                            <LightModeIcon />
                            : <NightlightIcon />}
                    </IconButton>
                </Toolbar>
            </Dialog>
        </Box >
    )
}