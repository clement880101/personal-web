import { Box, Typography } from "@mui/material"

import ExpTimeline from "../components/ExpTimeline"
import Skillmodule from "../components/Skillmodule"
import TitleCard from "../components/TitleCard"

export default function About({ mobile }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
            <TitleCard image={'green.png'} mobile={mobile}>
                <Typography sx={{ color: "white" }} variant={(mobile)?"h2":"h1"} >About</Typography>
                <Typography variant="h5" color={"white"}>The paths that I had taken and who I am now</Typography>
            </TitleCard>

            <Box sx={{ display: "flex", alignItems: "center", width:"95vw" }} flexDirection={(mobile) ? "column" : "row"}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "90%", marginTop: 10, 
                marginBottom:2}} alignItems={(mobile) ? "center" : "start"} >
                    <Typography sx={{ marginX: 1 }} variant="h3">The Journey</Typography>
                    <Typography sx={{ marginX: 1 }} variant="h6" color="text.secondary">
                        How I plunged head first into the rabbit hole that is the tech industry
                    </Typography>
                </Box>
                <ExpTimeline mobile={mobile} />
            </Box>

            <Box sx={{
                display: "flex", flexDirection: "column", width:"95vw", marginTop: 10, marginBottom: 2
            }} alignItems={(mobile) ? "center" : "start"} paddingRight={(mobile) ? 0 : "30%"}>
                <Typography sx={{ marginX: 1 }} variant="h3">Now I Can...</Typography>
                <Typography sx={{ marginX: 1 }} variant="h6" color="text.secondary">
                    The skills, interests, and aspirations that makes me, me
                </Typography>
            </Box>
            <Skillmodule />
        </Box>
    )
}