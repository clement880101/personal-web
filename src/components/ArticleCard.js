import { CardContent, Card, Typography, Skeleton, CardActionArea, CardActions, Box } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function ArticleCard({ doc }) {
    const navigate = useNavigate();

    return (
        <Box sx={{ padding: 0, margin: 1 }}>
            <Card variant="outlined" sx={{ width: 290, height: 200, borderRadius: 4 }}>
                <CardActionArea sx={{ height: "100%", width: "100%", padding: 1 }}
                    onClick={() => { if (doc !== null) { navigate("/articles/" + doc[0]) } }}>
                    <CardContent sx={{ width: "100%", height: "80%", overflow: "hidden" }}>
                        <Typography variant="h6" gutterBottom>
                            {(doc !== null) ? doc[1].Title : <Skeleton />}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                            {(doc !== null) ? doc[1].Subtitle : 
                            <Box>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </Box>
                            }
                        </Typography>

                    </CardContent>
                    <CardActions sx={{ width: "100%", paddingX: 2 }}>
                        <Typography variant="overline" color="primary">{(doc !== null) ? "Read More" :
                            <Skeleton sx={{ width: 80 }} />}</Typography>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Box>
    )
}