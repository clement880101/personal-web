import {
    CardContent, Card, Typography, Skeleton, CardActionArea,
    CardActions, Box, CardMedia
} from "@mui/material"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../api/firebaseConfig"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ArticleCard({ doc }) {
    const [imageUrl, setImageUrl] = useState(undefined);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (doc !== null) {
            getDownloadURL(ref(storage, 'gs://personalwebsite-4b72f.appspot.com/article/' +
                doc[1].Image)).then((url) => {
                    setImageUrl(url);
                });
        }
    }, [doc])

    return (
        <Box sx={{ padding: 0, margin: 1 }}>
            <Card variant="outlined" sx={{ width: 290, borderRadius: 4 }}>
                <CardActionArea sx={{
                    height: "100%", width: "100%", minHeight: 310,
                    display: "flex", flexDirection: "column"
                }}
                    onClick={() => { if (doc !== null) { navigate("/articles/" + doc[0]) } }}>
                    <Box sx={{height: 100, width:"100%", overflow:"hidden"}}>
                        {
                            (loading) && <Skeleton variant="rectangular" sx={{ height: "100%", width: "100%" }} />
                        }
                        <CardMedia sx={{ width: "100%", height: "100%" }} component="img"
                            image={imageUrl} onLoad={() => { setLoading(false) }} />
                    </Box>

                    <CardContent sx={{ width: "100%", overflow: "hidden", flexGrow: 1 }}>
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