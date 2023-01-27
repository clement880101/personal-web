import { Box, Grid, Typography } from "@mui/material"
import Head from "next/head.js";
import { useEffect, useState, useRef } from "react"
import { getArticleList, getProjectList } from "../api/firebaseApi.js"

import ArticleCard from "../components/ArticleCard";
import OtherBtn from "../components/OtherBtn.js";
import ProjectCard from "../components/ProjectCard.js";
import TitleBanner from "../components/TitleBanner.js";


export default function home() {
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
            (document.success) ? setProject(document.data) : console.log(document.err)
        })

    }, [xs])





    useEffect(() => {
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
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Box sx={{ width: "100%" }}>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="home | clementc.dev" />
                <meta property="og:description" content="portfolio and blog by clement" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/thumbnail%2Fhome.jpeg?alt=media&token=db985b70-ca85-4f61-91f1-63c06ba30d32" />
                <meta property="og:url" content="https://clementc.dev/home" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="clementc.dev" />
                <meta property="twitter:url" content="https://clementc.dev/home" />
                <meta name="twitter:title" content="home | clementc.dev" />
                <meta name="twitter:description" content="portfolio and blog by clement" />
                <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/thumbnail%2Fhome.jpeg?alt=media&token=db985b70-ca85-4f61-91f1-63c06ba30d32" />
                <title>home | clementc.dev</title>
                <meta name="description" content="portfolio and blog by clement"/>
            </Head>
            <TitleBanner darkColor={"#ff8811"} whiteColor={"#E2C044"}>
                <Typography variant="h2" sx={{ transition: "color 1s ease-in-out" }}>clement</Typography>
                <Typography variant="h5" sx={{ transition: "color 1s ease-in-out" }}>
                    DevOps & Fullstack Engineer based in the Bay Area
                </Typography>
            </TitleBanner>
            <Box sx={{
                display: "flex", flexDirection: "column", alignItems: "start",
                width: "100%", padding: 2
            }} ref={homeRef}>
                <Typography sx={{ marginTop: 6, transition: "color 1s ease-in-out" }}
                    variant="h4">articles</Typography>
                <Typography sx={{ marginBottom: 1, transition: "color 1s ease-in-out" }}
                    variant="h6" color="text.secondary">
                    Sharing my ideas on DevOps, blockchain, or any topics I find interesting
                </Typography>

                <Grid container spacing={1} sx={{ width: "100%" }}>
                    {
                        article.map((doc, index) =>
                            <Grid item xs={xs} key={index} >
                                <ArticleCard doc={doc} />
                            </Grid>
                        )
                    }
                    <Grid item xs={xs}>
                        <OtherBtn page="articles" />
                    </Grid>
                </Grid>


                <Typography sx={{ marginTop: 6, transition: "color 1s ease-in-out" }} variant="h4">
                    projects</Typography>
                <Typography sx={{ marginBottom: 1, transition: "color 1s ease-in-out" }} variant="h6"
                    color="text.secondary">
                    Showcasing what I had made with various technologies
                </Typography>
                <Grid container spacing={1} sx={{ width: "100%" }}>
                    {
                        project.map((data, index) =>
                            <Grid item xs={xs} key={index} >
                                <ProjectCard data={data} />
                            </Grid>
                        )
                    }
                    <Grid item xs={xs}>
                        <OtherBtn page="projects" />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}