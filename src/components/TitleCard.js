import { Box} from "@mui/material"

export default function TitleCard({ children }) {
    return (
        <Box sx={{ position: "relative" }}>
            <Box sx={{ height: "100%", width: "100%", position: "absolute", zIndex: -100 }} >
                <img style={{ width: "100vw" }} src={require("../assets/background1.jpg")} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flexWrap:"wrap", 
            justifyContent:"center", alignItem:"center"}}>
                {children}
            </Box>
        </Box>
    )
}