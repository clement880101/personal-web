import { useState, useEffect } from 'react';
import { AppBar, Box, Button, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [vwidth, setWidth] = useState(window.innerWidth);

    const pages = ["Home", "About", "Articles", "Projects", "Contact"];

    const navigate = useNavigate();
    const pathname = useLocation().pathname;


    function handleResize() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <AppBar color="transparent" sx={{ backdropFilter: "blur(5px)" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Link href="/home" color="inherit" variant="overline" underline="none">Clement Chang</Link>
                <Box sx={{ flexGrow: 1 }}/>
                {
                    (vwidth > 768) ?
                        pages.map((page) => (
                            <Button sx={{ borderRadius: 10, marginX: 0.5, padding: 0.7 }}
                                variant={("/" + page.toLowerCase() === pathname) ? "contained" : "text"}
                                size="small" onClick={() => {
                                    navigate("/" + page.toLowerCase()); setOpen(false)
                                }}>{page}</Button>
                        ))
                        :
                        <Box>
                            <IconButton onClick={() => setOpen(!open)}>
                                <DensityMediumIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                            <Drawer PaperProps={{ style: { borderRadius: 30, margin: 20, maxHeight:"90vh"} }}
                                anchor="right" open={open} onClose={() => setOpen(false)}>
                                <IconButton sx={{alignSelf:"flex-end", margin:2}} onClick={() => setOpen(!open)}>
                                    <CloseIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                                <List sx={{ marginTop: "10vh", minWidth: 300 }}>
                                    {
                                        pages.map((page) => (
                                            <ListItem selected={"/" + page.toLowerCase() === pathname} disablePadding>
                                                <ListItemButton onClick={() => { navigate("/" + page.toLowerCase()); setOpen(false) }}>
                                                    <ListItemText disableTypography={true} primary={page} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Drawer>
                        </Box>
                }
            </Toolbar>
        </AppBar >
    )
}   