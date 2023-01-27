import { Card, CardActionArea } from "@mui/material";


export default function LinkCard({ children, bgcolor, link }) {
    return (
        <Card sx={{ width: 320, margin: 1, borderRadius: 4, height: 100, bgcolor:bgcolor, 
        transition: "background-color 1s ease-in-out"}}>
            <CardActionArea sx={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%", height: "100%"
            }} onClick={()=>{window.open(link, '_blank')}}>
                {children}
            </CardActionArea>
        </Card>
    )
}