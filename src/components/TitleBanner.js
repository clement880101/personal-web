import {Box, useTheme } from "@mui/material"


export default function TitleBanner({ children, darkColor, whiteColor }) {
    const theme = useTheme()

    return (
        <Box sx={{
            width: "100%", height: 400, display: "flex", flexDirection: "column",
            justifyContent: "center", bgcolor: (theme.palette.mode === "dark")?
                darkColor:whiteColor
            , padding: 2, transition: "background-color 1s ease-in-out"
        }}>
            {children}
        </Box>
    )
}