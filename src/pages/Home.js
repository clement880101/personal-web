import { Box, Grid, Typography } from "@mui/material"
import { Masonry } from "@mui/lab";
import { useEffect, useState, useRef } from "react"
import { getArticleList, getProjectList } from "../api/firebaseApi.js"

import ArticleCard from "../components/ArticleCard";
import OtherBtn from "../components/OtherBtn.js";
import ProjectCard from "../components/ProjectCard.js";
import TitleCard from "../components/TitleCard.js";


export default function Home({mobile}) {
    const homeRef = useRef()
    const [xs, setXs] = useState(3)
    const [article, setArticle] = useState(Array(handleNum()).fill(null))
    const [project, setProject] = useState(Array(handleNum()).fill(null))

    function handleNum() {
        const col = (12 / xs) - 1
        if (col <= 2) {
            return 2
        } else {
            return col
        }
    }

    useEffect(() => {

        getArticleList(handleNum()).then((document) => {
            // Replace with error banner
            document[0] ? setArticle(document[1]) : console.log(document[1])
        })

        getProjectList(handleNum()).then((document) => {
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [xs])



    function handleResize() {
        var col = Math.floor(homeRef.current.clientWidth / 290)
        if (col <= 0) {
            setXs(12)
        } else if (col > 12) {
            setXs(1)
        } else {
            setXs(Math.floor(12 / col))
        }
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", alignItems: (mobile) ? "center" : "start",
            width: "100%", padding: 2
        }} ref={homeRef}>
            <TitleCard image={'home.png'} mobile={mobile}>
                <Typography variant={(mobile) ? "h2" : "h1"} color={"white"}>Clement</Typography>
                <Typography variant="h5" color={"white"}>DevOps & Fullstack Engineer based in the Bay Area</Typography>
            </TitleCard>
            <Typography sx={{ marginTop: 5 }} variant="h3">Articles</Typography>
            <Typography variant="h6" color="text.secondary">
                Sharing my ideas on DevOps, blockchain, or any topics I find interesting
            </Typography>

            <Grid container spacing={1} sx={{ width: "100%" }}>
                {
                    article.map((doc, index) =>
                        <Grid item xs={xs}>
                            <ArticleCard doc={doc} key={index} />
                        </Grid>
                    )
                }
                <Grid item xs={xs}>
                    <OtherBtn page="articles" />
                </Grid>
            </Grid>


            <Typography sx={{ marginTop: 5 }} variant="h3">Projects</Typography>
            <Typography variant="h6" color="text.secondary">
                Showcasing what I had made with various technologies
            </Typography>
            <Grid container spacing={1} sx={{ width: "100%" }}>
                {
                    project.map((doc, index) =>
                        <Grid item xs={xs}>
                            <ProjectCard doc={doc} key={index} />
                        </Grid>
                    )
                }
                <Grid item xs={xs}>
                    <OtherBtn page="projects" />
                </Grid>
            </Grid>
        </Box>
    )
}