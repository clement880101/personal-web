import { Typography, Box, Grid } from "@mui/material"
import Head from "next/head";
import { useEffect, useState, useRef } from "react"
import { getProjectList } from "../api/firebaseApi"
import ProjectCard from "../components/ProjectCard.js";
import TitleCard from "../components/TitleCard";

export default function projects({ }) {
    const projRef = useRef()
    const [xs, setXs] = useState(3)
    const [project, setProject] = useState(Array(12 / xs).fill(null))


    useEffect(() => {
        getProjectList(20).then((document) => {
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })
    }, [])

    function handleResize() {
        var col = Math.floor(projRef.current.clientWidth / 290)
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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: 2 }}
            ref={projRef}>
           <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="projects|clementc.dev" />
                <meta property="og:description" content="projects by clement" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/banner%2Fproject.png?alt=media&token=4d196260-8ed5-450f-8237-4a9a4859164e" />
                <meta property="og:url" content="https://clementc.dev/projects" />
                <title>projects|clementc.dev</title>
            </Head>

            <TitleCard image={'project.png'}>
                <Typography variant={"h2"} color={"white"}>projects</Typography>
            </TitleCard>
            <Grid container spacing={1} sx={{ width: "100%", marginTop: 2 }} ref={projRef}>
                {
                    project.map((doc, index) =>
                        <Grid item xs={xs} key={index}>
                            <ProjectCard doc={doc}  />
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}