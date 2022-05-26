import { Box, Paper,  Typography} from "@mui/material";
import { motion } from "framer-motion";


export default function Cardpopup(props){
    const down = {
        visible: {height:500, transition:{duration:0.5}},
        hidden: {height:270, transition:{duration:0.5}}
    }
    
    const up = {
        visible: {marginTop:0, marginBottom:0, transition:{duration:0.5}},
        hidden: {marginTop:115, marginBottom:115, transition:{duration:0.5}}
    }

    return(
        <Box sx={{width:350, borderRadius:10,  position:"relative", overflow:"hidden",display:"flex", 
        flexDirection:"column", boxShadow:10, cursor:"pointer", margin:2}} component={motion.div} variants={down}
        whileHover="visible" initial="hidden" animate="hidden">
            <img style={{position:"absolute", top:-50, left:-120, width:"140%"}} src={props.picture} alt=""/>
            <Typography variant="h3" sx={{color:"white", textAlign:"center", zIndex:2}} component={motion.div}
            variants={up}>
                {props.title}
            </Typography>
            <Paper sx={{padding:3, width:"100%", height:500, display:"flex", flexDirection:"column", 
            zIndex:1}} elevation={0}>
                {props.children}
            </Paper>
        </Box>
    )
}