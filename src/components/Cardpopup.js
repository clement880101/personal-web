import { Box, Paper,  Typography} from "@mui/material";
import { motion } from "framer-motion";
import {useState} from "react";

export default function Cardpopup(props){
    const [open, setOpen] = useState(false);

    const down = {
        visible: {height: 500},
        hidden: {height:300}
    }
    
    const up = {
        visible: {marginTop:0, marginBottom:0},
        hidden: {marginTop:120, marginBottom:120}
    }

    return(
        <Box sx={{width:400, borderRadius:10,  position:"relative", overflow:"hidden",display:"flex", 
        flexDirection:"column", boxShadow:10, cursor:"pointer"}} component={motion.div} variants={down}
        whileHover="visible" initial="hidden" animate="hidden">
            <img style={{position:"absolute", top:-20, left:-20}}
            src="https://news.emory.edu/stories/2012/09/upress_us_news_rankings_2012/thumbs/story_main.jpg" 
            alt=""/>
            <Typography variant="h2" sx={{color:"white", textAlign:"center", zIndex:2}} component={motion.div}
            variants={up}>
                    Emory
            </Typography>
            <Paper sx={{padding:3, width:"100%", display:"flex", flexDirection:"column", 
            zIndex:1}} elevation={0}>
                {props.children}
            </Paper>
        </Box>
    )
}