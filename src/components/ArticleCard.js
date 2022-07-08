import { CardContent, Card, Typography, Skeleton, CardActionArea} from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function ArticleCard(doc){
    const navigate = useNavigate();
    const limit = 110

    return(
        <Card sx={{ width: 300, height:200, margin:3, borderRadius:4}}>
            <CardActionArea sx={{height:"100%", width:"100%"}} onClick={()=>{navigate("/article/" + doc.doc[0])}}>
                <CardContent sx={{height:"100%", width:"100%" , padding: 3}}>
                    <Typography variant="h6" gutterBottom>{(doc.doc !== null) ? doc.doc[1].Title: <Skeleton/>}</Typography> 
                    <Typography variant="body2" color="text.secondary" >{(doc.doc !== null) ? 
                    (doc.doc[1].Subtitle.length > limit) ? doc.doc[1].Subtitle.substring(0, limit) + "..." : 
                    doc.doc[1].Subtitle
                    : <Skeleton/>}</Typography>
                    <Typography variant="overline" color="primary">{(doc.doc !== null) 
                    ? "Read More" : <Skeleton/>}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}