import { Box, Typography, Link, Button, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getArticleList, getProjectList } from "../api/firebaseApi.js"

import ArticleCard from "../components/ArticleCard";
import OtherBtn from "../components/OtherBtn.js";
import ProjectCard from "../components/ProjectCard.js";
import TitleCard from "../components/TitleCard.js";


export default function Home() {
    const navigate = useNavigate()
    const artlim = 2
    const projlim = 2

    const [article, setArticle] = useState(Array(artlim).fill(null))
    const [project, setProject] = useState(Array(projlim).fill(null))

    useEffect(() => {
        getArticleList(artlim).then((document) => {
            // Replace with error banner
            document[0] ? setArticle(document[1]) : console.log(document[1])
        })

        getProjectList(projlim).then((document) => {
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [artlim, projlim])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingX: "10vw" }}>
            <TitleCard image={'yellow.png'}>
                <Typography variant="h2" color={"#416ef8"}>Clement Chang</Typography>
                <Typography variant="h4" color={"black"}>DevOps & a Fullstack Engineer based in the Bay Area</Typography>
            </TitleCard>

            <Typography variant="h5">Articles</Typography>
            <Grid container spacing={1} sx={{ wrap: "wrap" }}>
                {article.map((doc) =>
                    <Grid item xs={"auto"}>
                        <ArticleCard doc={doc} />
                    </Grid>
                )}
                <Grid item xs={"auto"}>
                    <OtherBtn page="articles" />
                </Grid>
            </Grid>

            <Box sx={{
                height: "30vh", display: "flex", flexDirection: "row", alignItems: "center",
                justifyContent: "center", padding: 5, flexWrap: "wrap"
            }}>
                <Typography variant="h6">if you like what you are seeing here, take a look at these </Typography>
                <Button variant="contained" size="small" disableTouchRipple sx={{ borderRadius: 10, margin: 1 }}
                    onClick={() => { navigate("/about") }}>About</Button>
                <Button variant="contained" size="small" disableTouchRipple sx={{ borderRadius: 10, margin: 1 }}
                    onClick={() => { navigate("/contact") }}>Contact</Button>
            </Box>

            <Typography variant="h5">Projects</Typography>
            <Grid container sx={{ wrap: "wrap" }}>
                {project.map((doc) =>
                    <Grid item xs={"auto"}>
                        <ProjectCard doc={doc} />
                    </Grid>
                )}
                <Grid item xs={"auto"}>
                    <OtherBtn page="projects" />
                </Grid>
            </Grid>
        </Box>
    )
}