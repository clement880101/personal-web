import { Typography, Box, Grid } from "@mui/material"
import { useState, useEffect } from "react"
import { getArticleList } from "../api/firebaseApi"
import ArticleCard from "../components/ArticleCard"

export default function Articles() {
    const [artlim, setArtlim] = useState(30)
    const [article, setArticle] = useState(Array(artlim).fill(null))

    useEffect(() => {
        getArticleList(artlim).then((document) => {
            // Replace with error banner
            document[0] ? setArticle(document[1]) : console.log(document[1])
        })

    }, [artlim])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingX: "10vw" }}>
            <Typography sx={{ padding: 10 }} variant="h4">Articles</Typography>
            <Grid container sx={{ wrap: "wrap" }}>
                {article.map((doc) =>
                    <Grid item xs={"auto"}>
                        <ArticleCard doc={doc} />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}