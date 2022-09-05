import { Box, Typography } from "@mui/material"

import ExpTimeline from "../components/ExpTimeline"
import Skillmodule from "../components/Skillmodule"
import TitleCard from "../components/TitleCard"

export default function About({ mobile }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingX: "10vw" }}>
            <TitleCard image={'leaves.png'}>
                <Typography sx={{ padding: 10, color:"#416ef8"}} variant="h2">About</Typography>
            </TitleCard>

            {
                (mobile) ?
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h5">The Journey</Typography>
                        <ExpTimeline />
                    </Box>
                    :
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Typography variant="h2">The Journey</Typography>
                        <ExpTimeline />
                    </Box>
            }
            <Typography variant="h5">Expertise</Typography>
            <Skillmodule />
        </Box>
    )
}