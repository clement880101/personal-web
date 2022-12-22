import { useState, forwardRef } from 'react';
import {
    AppBar, Box, Button, Dialog, IconButton, Link, List, ListItemButton,
    ListItemText, Toolbar, Typography, Slide, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate, useLocation } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

export default function Navbar({ mobile, darkMode }) {
    const theme = useTheme()
    const [open, setOpen] = useState(false);

    const pages = ["Home", "About", "Articles", "Projects", "Contact"];

    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    return (
        <AppBar sx={{ background: "transparent", boxShadow: 'none' }}>
            <Toolbar sx={{ display: "flex" }}>
                <Box sx={{
                    background: (darkMode) ?  "rgb(255,255,255,0.5)" : "rgb(0,0,0,0.5)", 
                    height: "100%", borderRadius: 10, padding: 1, backdropFilter: "blur(5px)"
                }}>
                    <Link href="/home" color={theme.palette.background.default}            
                    variant="overline" underline="none">Clementc.dev</Link>
                </Box>


                <Box sx={{ flexGrow: 1 }} />
                {
                    (!mobile) ?
                        <Box sx={{
                            background: (darkMode) ? "rgb(255,255,255,0.5)" : "rgb(0,0,0,0.5)", 
                            height: "100%", borderRadius: 10, padding: 1, backdropFilter: "blur(5px)"
                        }}>
                            {
                                pages.map((page) => (
                                    <Button sx={{ borderRadius: 10, marginX: 0.5, padding: 0.7, 
                                        color:theme.palette.background.default }}
                                        variant={(page.toLowerCase() === pathname.split("/")[1])
                                            ? "contained" : "text"}
                                        size="small" onClick={() => {
                                            navigate("/" + page.toLowerCase()); setOpen(false)
                                        }}>{page}</Button>
                                ))
                            }
                        </Box>
                        :

                        <IconButton onClick={() => setOpen(!open)} sx={{
                            backdropFilter: "blur(5px)",
                            background: (darkMode) ? "rgb(255,255,255,0.5)" : "rgb(0,0,0,0.5)",
                            "&.MuiButtonBase-root:hover": {
                                bgcolor: (darkMode) ? "rgb(255,255,255,1)" : "rgb(0,0,0,1)"
                            }
                        }}>
                            {
                                (open) ? <MenuOpenIcon sx={{ fontSize: 25, color:theme.palette.background.default}} />
                                    : <MenuIcon sx={{ fontSize: 25, color: theme.palette.background.default}} />
                            }

                        </IconButton>


                }
            </Toolbar>
            <Dialog open={open} onClose={() => setOpen(false)} fullScreen TransitionComponent={Transition}>
                <Toolbar sx={{ alignSelf: "flex-end" }}>
                    <IconButton onClick={() => setOpen(!open)}>
                        <CloseIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Toolbar>

                <List sx={{
                    marginTop: "10vh", width: "100%", display: "flex", alignItems: "center",
                    flexDirection: "column"
                }}>
                    {
                        pages.map((page) => (

                            <ListItemButton sx={{
                                width: "100%", display: "flex", alignItems: "center",
                                flexDirection: "column", justifyContent: "center"
                            }} selected={"/" + page.toLowerCase() === pathname}
                                onClick={() => { navigate("/" + page.toLowerCase()); setOpen(false) }}>
                                <ListItemText sx={{ marginY: 2 }} primary={<Typography variant="h5">{page}</Typography>} />
                            </ListItemButton>

                        ))
                    }
                </List>
            </Dialog>
        </AppBar >
    )
}   