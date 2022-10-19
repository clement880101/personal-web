import { Box, Typography } from "@mui/material"
import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react"
import { getArticleList, getProjectList } from "../api/firebaseApi.js"

import ArticleCard from "../components/ArticleCard";
import OtherBtn from "../components/OtherBtn.js";
import ProjectCard from "../components/ProjectCard.js";
import TitleCard from "../components/TitleCard.js";


export default function Home({ mobile }) {
    const [numItem, setNumItem] = useState(Math.floor(window.innerWidth * 0.95 / 290) - 1)
    const [article, setArticle] = useState(Array((mobile) ? 2 : numItem).fill(null))
    const [project, setProject] = useState(Array((mobile) ? 2 : numItem).fill(null))

    useEffect(() => {
        getArticleList((mobile) ? 2 : numItem).then((document) => {
            // Replace with error banner
            document[0] ? setArticle(document[1]) : console.log(document[1])
        })

        getProjectList((mobile) ? 2 : numItem).then((document) => {
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [mobile, numItem])

    function handleResize() {
        setNumItem(Math.floor(window.innerWidth * 0.95 / 290) - 1)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <TitleCard image={'rocket.png'} mobile={mobile}>
                <Typography variant={(mobile) ? "h2" : "h1"} color={"white"}>Clement</Typography>
                <Typography variant="h5" color={"white"}>DevOps & Fullstack Engineer based in the Bay Area</Typography>
            </TitleCard>

            <Box sx={{
                display: "flex", flexDirection: "column", width: "95vw", marginTop: 10, marginBottom: 2
            }} alignItems={(mobile) ? "center" : "start"} paddingRight={(mobile) ? 0 : "30%"}>
                <Typography sx={{ marginX: 1 }} variant="h3">Articles</Typography>
                <Typography sx={{ marginX: 1 }} variant="h6" color="text.secondary">
                    Sharing my ideas on DevOps, blockchain, or any topics I find interesting
                </Typography>
            </Box>


            {
                (mobile) ?
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {
                            article.map((doc, index) =>
                                <ArticleCard doc={doc} key={index} />
                            )
                        }
                        <OtherBtn page="articles" />
                    </Box>
                    :
                    <Box sx={{ width: "95vw" }}>
                        <Masonry columns={"auto"} >
                            {article.map((doc, index) =>
                                <ArticleCard doc={doc} key={index} />
                            )}
                            <OtherBtn page="articles" />
                        </Masonry>
                    </Box>
            }

            <Box sx={{
                display: "flex", flexDirection: "column", width: "95vw", marginTop: 10, marginBottom: 2
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
                            project.map((doc, index) =>
                                <ProjectCard doc={doc} key={index} />
                            )
                        }
                        <OtherBtn page="projects" />
                    </Box>
                    :
                    <Box sx={{ width: "95vw" }}>
                        <Masonry columns={"auto"}>
                            {project.map((doc, index) =>
                                <ProjectCard doc={doc} key={index} />)
                            }
                            <OtherBtn page="projects" />
                        </Masonry>
                    </Box>
            }
        </Box>
    )
}