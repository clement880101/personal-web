import { Box, Typography, Grid } from "@mui/material"
import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react"
import { getArticleList, getProjectList } from "../api/firebaseApi.js"

import ArticleCard from "../components/ArticleCard";
import OtherBtn from "../components/OtherBtn.js";
import ProjectCard from "../components/ProjectCard.js";
import TitleCard from "../components/TitleCard.js";


export default function Home({ mobile }) {
    const [article, setArticle] = useState(Array((mobile) ? 2 : 5).fill(null))
    const [project, setProject] = useState(Array((mobile) ? 2 : 5).fill(null))

    useEffect(() => {
        getArticleList((mobile) ? 2 : 5).then((document) => {
            // Replace with error banner
            document[0] ? setArticle(document[1]) : console.log(document[1])
        })

        getProjectList((mobile) ? 2 : 5).then((document) => {
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [mobile])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingX: "10vw" }}>
            <TitleCard image={'yellow.png'} mobile={mobile}>
                <Typography variant={(mobile)?"h2":"h1"} color={"black"}>Clement Chang</Typography>
                <Typography variant="h5" color={"black"}>DevOps & a Fullstack Engineer based in the Bay Area</Typography>
            </TitleCard>

            <Box sx={{
                display: "flex", flexDirection: "column", width: "100%", marginTop: 10, marginBottom: 2
            }} alignItems={(mobile) ? "center" : "start"} paddingRight={(mobile) ? 0 : "30%"}>
                <Typography sx={{ marginX: 1 }} variant="h3">Articles</Typography>
                <Typography sx={{ marginX: 1 }} variant="h6" color="text.secondary">
                    Sharing my ideas on blockchain, frontend, or any topics I find interesting
                </Typography>
            </Box>


            {
                (mobile) ?
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {
                            article.map((doc) =>
                                <ArticleCard doc={doc} />
                            )
                        }
                        <OtherBtn page="articles" />
                    </Box>
                    :
                    <Grid container sx={{ wrap: "wrap" }}>
                        {article.map((doc) =>
                            <Grid item xs={"auto"}>
                                <ArticleCard doc={doc} />
                            </Grid>
                        )}
                        <Grid item xs={"auto"}>
                            <OtherBtn page="articles" />
                        </Grid>
                    </Grid>
            }

            <Box sx={{
                display: "flex", flexDirection: "column", width: "100%", marginTop: 10, marginBottom: 2
            }} alignItems={(mobile) ? "center" : "start"} paddingRight={(mobile) ? 0 : "30%"}>
                <Typography sx={{ marginX: 1 }} variant="h3">Projects</Typography>
                <Typography sx={{ marginX: 1 }} variant="h6" color="text.secondary">
                    Showcasing what I had made with various technologies
                </Typography>
            </Box>

            {
                (mobile) ?
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {
                            project.map((doc) =>
                                <ProjectCard doc={doc} />
                            )
                        }
                        <OtherBtn page="projects" />
                    </Box>
                    :
                    <Masonry columns={"auto"}>
                        {project.map((doc) =>
                            <ProjectCard doc={doc} />)
                        }
                        <OtherBtn page="projects" />
                    </Masonry>
            }
        </Box>
    )
}