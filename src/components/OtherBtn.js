import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import { useRouter } from "next/router";
import { Card, CardActionArea, Typography } from "@mui/material";

export default function OtherBtn({ page }) {
    const router = useRouter()

    return (
        <Card sx={{ height: "100%", borderRadius: 4, minHeight: 200, 
        transition:"background-color 1s ease-in-out" }} variant="outlined">
            <CardActionArea sx={{
                flexDirection: "column", display: "flex", justifyContent: "center",
                alignItems: "center", width: "100%", height: "100%"
            }} onClick={() => {
                (page === "articles") ?
                router.push("/articles", undefined, { scroll: false }) :
                router.push("/projects", undefined, { scroll: false })
            }}>
                <ArrowCircleRight sx={{transition: "color 1s ease-in-out"}}/>
                <Typography sx={{transition: "color 1s ease-in-out"}}>{(page === "articles") ? "Other Articles" : "Other Projects"}</Typography>
            </CardActionArea>
        </Card>
    )
}