import { CardContent, Card, Typography, Skeleton, CardActionArea, CardActions } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function ArticleCard({ doc }) {
    const navigate = useNavigate();
    
    return (
        <Card variant="outlined" sx={{ width: 300, height: 200, margin: 1, borderRadius: 4 }}>
            <CardActionArea sx={{ height: "100%", width: "100%", padding:1}} 
                onClick={() => { if(doc !== null){navigate("/articles/" + doc[0])} }}>
                <CardContent sx={{ width: "100%", height:"80%", overflow:"hidden"}}>
                    <Typography variant="h6" gutterBottom>
                        {(doc !== null) ? doc[1].Title : <Skeleton />}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        {(doc !== null) ? doc[1].Subtitle : <Skeleton />}
                    </Typography>

                </CardContent>
                <CardActions sx={{ width: "100%", paddingX:2}}>
                    <Typography variant="overline" color="primary">{(doc !== null)? "Read More" : <Skeleton />}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}