import { Card, CardMedia, Box, Skeleton } from "@mui/material"
import { useState } from "react"

export default function TitleCard({ children, image, mobile }) {
    const [loading, setLoading] = useState(true)
    const height = 360
    const width = "95vw"

    return (
        <Card sx={{ margin: 1, borderRadius: 4, height: height, position: "relative" }} elevation={0}>
            <CardMedia sx={{ width: width }}>
                {
                    (loading) && <Skeleton variant="rectangular" height={height} />
                }
                {
                    (mobile) ?
                        <img height="100%" src={require("../assets/" + image)} alt="Banner" onLoad={() => { setLoading(false) }} />
                        : <img width="100%" src={require("../assets/" + image)} alt="Banner" onLoad={() => { setLoading(false) }} />
                }
            </CardMedia>
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