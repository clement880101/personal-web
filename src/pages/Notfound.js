import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Notfound(){
    const navigate = useNavigate()
    return(
        <Box sx={{height:"100vh", width:"100vw", display:"flex", flexDirection:"column",
        alignItems: "center", justifyContent: "center", padding:5}}>
            <Typography variant="h6">Woah, seems like you ended up in a dead link</Typography>
            <Button variant="contained" size="small" disableTouchRipple sx={{ borderRadius: 10, margin:1}}
                    onClick={() => { navigate("/home") }}>Home</Button>
        </Box>
    )
}