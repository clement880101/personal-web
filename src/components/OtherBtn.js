import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function OtherBtn({page}){
    const navigate = useNavigate();

    return(
        <Box sx={{width: 300, height:200, margin:1, flexDirection:"column", display:"flex", 
        justifyContent:"center", alignItems:"center"}}>
            <Box sx={{flexDirection:"column", display:"flex", justifyContent:"center", 
            alignItems:"center", cursor:"pointer"}}onClick={()=>{(page === "articles") ? 
            navigate("/articles") : navigate("/projects")}}>
                <ArrowCircleRight/>
                <Typography>{(page === "articles") ? "Other Articles" : "Other Projects"}</Typography>
            </Box>
        </Box>
    )
}