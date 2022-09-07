import { useState } from 'react';
import {
    AppBar, Box, Button, Drawer, IconButton, Link, List, ListItem, ListItemButton,
    ListItemText, Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ mobile, height }) {
    const [open, setOpen] = useState(false);

    const pages = ["Home", "About", "Articles", "Projects", "Contact"];

    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    return (
        <AppBar color="transparent" sx={{ backdropFilter: "blur(5px)" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Link href="/home" color="inherit" variant="overline" underline="none">Clement Chang</Link>
                <Box sx={{ flexGrow: 1 }} />
                {
                    (!mobile) ?
                        pages.map((page) => (
                            <Button sx={{ borderRadius: 10, marginX: 0.5, padding: 0.7 }}
                                variant={(page.toLowerCase() === pathname.split("/")[1]) 
                                ? "contained" : "text"}
                                size="small" onClick={() => {
                                    navigate("/" + page.toLowerCase()); setOpen(false)
                                }}>{page}</Button>
                        ))
                        :
                        <Box>
                            <IconButton onClick={() => setOpen(!open)}>
                                {
                                    (open) ? <MenuOpenIcon sx={{ fontSize: 25 }} />
                                        : <MenuIcon sx={{ fontSize: 25 }} />
                                }

                            </IconButton>

                        </Box>
                }
                <Drawer PaperProps={{
                    style: {
                        borderRadius: 30, marginRight: 10,
                        marginTop: 0.05 * height, height: 0.9 * height
                    }
                }}
                    anchor="right" open={open} onClose={() => setOpen(false)}>
                    <IconButton sx={{ alignSelf: "flex-end", margin: 2 }} onClick={() => setOpen(!open)}>
                        <CloseIcon sx={{ fontSize: 30 }} />
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
            </Toolbar>
        </AppBar >
    )
}   