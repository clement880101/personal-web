import { Typography, Box, Paper, IconButton} from "@mui/material";
import { Map, Overlay} from 'pigeon-maps'
import { stamenToner} from 'pigeon-maps/providers'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

export default function Contact() {
    const [vwidth, setWidth] = useState(window.innerWidth);
    const [vheight, setHeight] = useState(window.innerHeight);


    function handleResize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {      
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    },[])

    return (
        <Box sx={{ display: "flex", maxWidth: "100vw", minHeight:"100vh"}} 
        flexDirection={(vheight + 200> vwidth) ? "column":"row"}>
            <Box sx={{ minWidth:"50vw", display:"flex", alignItems:"center", flexDirection:"column"}}>
                <Typography  sx={{ padding: 10 }} variant="h4">Contact</Typography>
                <Box sx={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-evenly"}}>
                    <IconButton  disableRipple component={motion.div} whileTap={{scale:0.95}} 
                    whileHover={{y:-3, transition:{duration:0.1}}}
                    onClick={()=>{window.open('https://www.linkedin.com/in/clement-chang-815501145/', '_blank')}}>
                        <LinkedInIcon sx={{fontSize:70, color:"#0077B5"}} />
                    </IconButton>
                    <IconButton  disableRipple component={motion.div} whileTap={{scale:0.95}} 
                    whileHover={{y:-3, transition:{duration:0.1}}}
                    onClick={()=>{window.open('https://github.com/clement880101', '_blank')}}>
                        <GitHubIcon sx={{fontSize:70}}/>
                    </IconButton>
                    <IconButton  disableRipple component={motion.div} whileTap={{scale:0.95}} 
                    whileHover={{y:-3, transition:{duration:0.1}}}
                    onClick={()=>{window.open('https://twitter.com/clement880101', '_blank')}}>
                        <TwitterIcon sx={{fontSize:70, color:"#1DA1F2"}} />
                    </IconButton>
                </Box>
            </Box>
            <Map
                provider={stamenToner}
                dprs={[1, 2]}
                height={(vheight + 200 > vwidth) ? vheight/2 + 90: vheight}
                width={(vheight + 200> vwidth) ? vwidth-18: vwidth/2}
                defaultCenter={[37.40, -122.1]}
                defaultZoom={9.7}
                twoFingerDrag={true}
            >
                <Overlay anchor={[37.389, -122.081]} offset={[20, 30]} style={{display:"flex", flexDirection:"row"}}>
                    <LocationOnIcon fontSize="large" style={{color:"black"}}/>
                    <Paper style={{display:"flex", flexDirection:"column", 
                    justifyContent:"center", borderRadius:30}} elevation={20}>
                        <Typography variant="body" style={{padding:6}}>Mountain View</Typography>
                    </Paper>
                </Overlay>
            </Map>
        </Box>
    )
}