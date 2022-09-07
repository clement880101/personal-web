import { Typography, Box, Grid } from "@mui/material"
import { useState, useEffect } from "react"
import { getArticleList } from "../api/firebaseApi"
import ArticleCard from "../components/ArticleCard"
import TitleCard from "../components/TitleCard"

export default function Articles({ mobile }) {
    const [artlim, setArtlim] = useState(30)
    const [article, setArticle] = useState(Array(6).fill(null))

    useEffect(() => {
        getArticleList(artlim).then((document) => {
            // Replace with error banner
            document[0] ? setArticle(document[1]) : console.log(document[1])
        })

    }, [artlim])

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", alignItems: "center",
            width: "100%", paddingX: "10vw"
        }}>
            <TitleCard image={'yellow.png'} mobile={mobile}>
                <Typography variant={(mobile)?"h2":"h1"}  color={"black"}>Articles</Typography>
            </TitleCard>

            {
                (mobile) ?
                    article.map((doc) =>
                        <ArticleCard doc={doc} />
                    )
                    :
                    <Grid container sx={{ wrap: "wrap" }}>
                        {article.map((doc) =>
                            <Grid item xs={"auto"}>
                                <ArticleCard doc={doc} />
                            </Grid>
                        )}
                    </Grid>
            }
        </Box>
    )
}