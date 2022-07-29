import { Box, Typography } from "@mui/material"

export default function Endnote(){
    return(
        <Box sx={{height: "30vh", display: "flex", flexDirection: "row", alignItems: "center",
                justifyContent: "center", padding: 5, flexWrap: "wrap"}}>
            <Typography variant="body1">Designed and developed by Clement Chang</Typography>
        </Box>
    )
}