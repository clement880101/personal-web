import {
    CardContent, Card, Typography, Skeleton, CardActionArea,
    CardActions, Box, CardMedia
} from "@mui/material"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../api/firebaseConfig"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";

export default function ArticleCard({ doc }) {
    const [imageUrl, setImageUrl] = useState(undefined);
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    return (
        <Card variant="outlined" sx={{ borderRadius: 4, height: "100%", 
        transition:"background-color 1s ease-in-out"}}>
            <CardActionArea sx={{
                height: "100%", width: "100%", display: "flex", flexDirection: "column"
            }}
                onClick={() => { if (doc !== null) { router.push("/articles/" + doc[0]) } }}>
                <Box sx={{ height: 100, width: "100%", overflow: "hidden" }}>
                    {
                        (loading) && <Skeleton variant="rectangular" sx={{ height: "100%", width: "100%" }} />
                    }
                    {
                        (doc !== null) && <CardMedia sx={{ width: "100%", height: "100%" }} component="img"
                            image={doc[1].Image} onLoad={() => { setLoading(false) }} />
                    }

                </Box>

                <CardContent sx={{ width: "100%", overflow: "hidden", flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{transition: "color 1s ease-in-out"}}>
                        {(doc !== null) ? doc[1].Title : <Skeleton />}
                    </Typography>

                    {(doc !== null) ?
                        <Typography color="text.secondary" variant="body2"
                        sx={{transition: "color 1s ease-in-out"}}>{doc[1].Subtitle}</Typography>
                        :
                        <Box>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </Box>
                    }

                </CardContent>
                <CardActions sx={{ width: "100%", paddingX: 2 }}>
                    <Typography variant="overline" color="primary" 
                    sx={{transition: "color 1s ease-in-out"}}>{(doc !== null) ? "Read More" :
                        <Skeleton sx={{ width: 80 }} />}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}