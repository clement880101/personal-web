import { Box, Typography } from "@mui/material"

import ExpTimeline from "../components/ExpTimeline"
import Skillmodule from "../components/Skillmodule"

export default function About({ mobile }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingX: 5 }}>
            <Typography sx={{ padding: 10 }} variant="h4">About</Typography>
            {
                (mobile) ?
                    <Box>
                        <Typography variant="h5">The Journey</Typography>
                        <ExpTimeline />
                    </Box>
                    :
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems:"center"}}>
                        <Typography variant="h2">The Journey</Typography>
                        <ExpTimeline />
                    </Box>
            }
            <Typography variant="h5">Expertise</Typography>
            <Skillmodule />
        </Box>
    )
}