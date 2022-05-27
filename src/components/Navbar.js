import { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pages = ["Home", "Projects", "Articles",  "Contact"];
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <Box>
            <IconButton sx={{ zIndex: 1500, margin:1, position:'fixed'}} onClick={() => setOpen(!open)} 
            disableRipple component={motion.div} whileTap={{scale:0.8}} whileHover={{scale:0.95}}>
                {
                    open ? <CloseIcon sx={{fontSize:50}}/> : <DensityMediumIcon sx={{fontSize:50}}/>
                }
            </IconButton>
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                <List sx={{ marginTop: "10vh", minWidth:300}}>
                    {
                        pages.map((page) => (
                            <ListItem selected={(pathname === "/") ? 
                            "/" + page.toLowerCase() === "/home" : "/" + page.toLowerCase() === pathname
                            } disablePadding>
                                <ListItemButton onClick={() => { navigate("/" + page.toLowerCase()); setOpen(false) }}>
                                    <ListItemText disableTypography={true} primary={page} sx={{fontSize:"1.5rem"}}/>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
                
            </Drawer>
            
        </Box>
    )
}   