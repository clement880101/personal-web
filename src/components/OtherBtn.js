import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import { useRouter } from "next/router";
import { Card, CardActionArea, Typography } from "@mui/material";

export default function OtherBtn({page}){
    const router = useRouter()

    return(
        <Card sx={{height:"100%", borderRadius: 4, minHeight:200}} variant="outlined">
            <CardActionArea sx={{flexDirection:"column", display:"flex", justifyContent:"center", 
            alignItems:"center", width:"100%", height:"100%"}}onClick={()=>{(page === "articles") ? 
            router.push("/articles") : router.push("/projects")}}>
                <ArrowCircleRight/>
                <Typography>{(page === "articles") ? "Other Articles" : "Other Projects"}</Typography>
            </CardActionArea>
        </Card>
    )
}