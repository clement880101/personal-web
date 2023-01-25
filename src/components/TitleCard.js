import { Card, CardMedia, Box, Skeleton } from "@mui/material"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../api/firebaseConfig"
import { useEffect, useState } from "react"

export default function TitleCard({ children, image }) {
    const [imageUrl, setImageUrl] = useState(undefined);
    const [loading, setLoading] = useState(true)
    const height = 360

    useEffect(() => {
        getDownloadURL(ref(storage, 'gs://personalwebsite-4b72f.appspot.com/banner/' + image)).then((url) => {
            setImageUrl(url);
        });
    }, [])

    return (
        <Card sx={{borderRadius: 4, height: height, width: "100%", position: "relative", overflow:"hidden" }}
            elevation={0}>
            {
                (loading) && <Skeleton variant="rectangular" height={height} width="100%" />

            }

            <CardMedia sx={{ height: height }} component="img"
                image={imageUrl} onLoad={() => { setLoading(false) }} />

            {
                (!loading) &&
                <Box sx={{
                    position: 'absolute', bottom: 0, left: 0, width: "100%", height: "100%", padding: 5,
                    display: "flex", flexDirection: "column", justifyContent: "center"
                }} >
                    {children}
                </Box>
            }
        </Card>
    )
}