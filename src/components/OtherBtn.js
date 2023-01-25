import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, Typography } from "@mui/material";

export default function OtherBtn({page}){
    const navigate = useNavigate();

    return(
        <Card sx={{height:"100%", borderRadius: 4, minHeight:200}} variant="outlined">
            <CardActionArea sx={{flexDirection:"column", display:"flex", justifyContent:"center", 
            alignItems:"center", width:"100%", height:"100%"}}onClick={()=>{(page === "articles") ? 
            navigate("/articles") : navigate("/projects")}}>
                <ArrowCircleRight/>
                <Typography>{(page === "articles") ? "Other Articles" : "Other Projects"}</Typography>
            </CardActionArea>
        </Card>
    )
}