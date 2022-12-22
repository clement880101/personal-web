import { Box, Typography, Card, CardMedia, Skeleton, useTheme } from "@mui/material"
import { useState } from "react"
import ExpTimeline from "../components/ExpTimeline"
import Skillmodule from "../components/Skillmodule"
import TitleCard from "../components/TitleCard"

export default function About({ mobile }) {
    const [loading, setLoading] = useState(true)
    const theme = useTheme()

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <TitleCard image={'green.png'} mobile={mobile}>
                <Typography sx={{ color: "white" }} variant={(mobile) ? "h2" : "h1"} >About</Typography>
                <Typography variant="h5" color={"white"}>The paths that I had taken and who I am now</Typography>
            </TitleCard>

            <Box sx={{ display: "flex", alignItems: "center", width: "95vw" }}
                flexDirection={(mobile) ? "column" : "row"}>
                <Card sx={{ margin: 1, borderRadius: 4, position: "relative", overflow: "hidden", height: (mobile) ? 200 : 500 }}
                    elevation={0}>
                    {
                        (loading) && <Skeleton variant="rectangular" height="100%" width="100%" />

                    }

                    <CardMedia component="img" width="100%" sx={{ transform: "translateY(-200px)" }}
                        image={"https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/about%2Fmountain.jpg?alt=media&token=9df30b79-96a3-435b-9cd2-65adab2e4f40"}
                        onLoad={() => { setLoading(false) }} />
                    <Box sx={{
                        position: 'absolute', bottom: 0, left: 0, width: "100%", height: "100%", padding: 5,
                        display: "flex", flexDirection: "column", justifyContent: "center", 
                        bgcolor: (mobile)? theme.palette.background.default:"rgba(0, 0, 0, 0.50)",
                        backdropFilter: "blur(2px)"
                    }} alignItems={(mobile) ? "center" : "start"} >
                        <Typography sx={{ marginX: 1 }} variant="h3" color={(mobile)?"text.primary":"white"}>The Journey</Typography>
                        <Typography sx={{ marginX: 1 }} variant="h6" color={(mobile)?"text.secondary":"Gainsboro"}>
                            How I plunged head first into the rabbit hole that is the tech industry
                        </Typography>
                    </Box>
                </Card>
                <ExpTimeline mobile={mobile} />
            </Box>

            <Box sx={{
                display: "flex", flexDirection: "column", width: "95vw", marginTop: 10, marginBottom: 2
            }} alignItems={(mobile) ? "center" : "start"} paddingRight={(mobile) ? 0 : "30%"}>
                <Typography sx={{ marginX: 1 }} variant="h3">Skills</Typography>
                <Typography sx={{ marginX: 1 }} variant="h6" color="text.secondary">
                    Now I can do all these things...
                </Typography>
            </Box>
            <Skillmodule mobile={mobile} />
        </Box>
    )
}