import { Card, CardMedia, Box, Skeleton } from "@mui/material"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../api/firebaseConfig"
import { useEffect, useState } from "react"

export default function TitleCard({ children, image }) {


    const [imageUrl, setImageUrl] = useState(undefined);
    const [loading, setLoading] = useState(true)
    const height = 360
    const width = "95vw"

    useEffect(() => {
        getDownloadURL(ref(storage, 'gs://personalwebsite-4b72f.appspot.com/banner/' + image)).then((url) => {
            setImageUrl(url);
        });
    }, [])

    return (
        <Card sx={{ margin: 1, borderRadius: 4, height: height, width: width, position: "relative" }}
            elevation={0}>
            {
                (loading) && <Skeleton variant="rectangular" height={height} width={width} />

            }

            <CardMedia sx={{ height: height * 1.1 }} component="img"
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