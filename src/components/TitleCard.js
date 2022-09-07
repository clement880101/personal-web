import { Card, CardMedia, Box } from "@mui/material"
export default function TitleCard({ children, image }) {
    const height = 400
    const width = "95vw"

    return (
        <Card sx={{ width: width, margin: 1, borderRadius: 4, height: height, 
        position:"relative"}} elevation={0}>
            <CardMedia component="img" sx={{ height: height }} image={require("../assets/" + image)} />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: "100%", height:"100%", padding: 5,
                display:"flex", flexDirection:"column", justifyContent:"center"}} >
                {children}
            </Box>
        </Card>
    )
}