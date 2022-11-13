import { Card, CardMedia, Box, Skeleton } from "@mui/material"
import { useState } from "react"

export default function TitleCard({ children, image, mobile }) {
    const [loading, setLoading] = useState(true)
    const height = 360
    const width = "95vw"

    return (
        <Card sx={{ margin: 1, borderRadius: 4, height: height, width: width, position: "relative" }} elevation={0}>
            {
                (loading) && <Skeleton variant="rectangular" height={height} width={width} />

            }

            <CardMedia sx={{ height: height }} component="img"
                image={require("../assets/banner/" + image)} onLoad={() => { setLoading(false) }} />


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