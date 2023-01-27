import { Typography, Box, Grid } from "@mui/material"
import Head from "next/head";
import { useEffect, useState, useRef } from "react"
import { getProjectList } from "../api/firebaseApi"
import ProjectCard from "../components/ProjectCard.js";
import TitleBanner from "../components/TitleBanner";

export default function projects(props) {
    const { project = Array(4).fill(null) } = props
    const projRef = useRef()
    const [xs, setXs] = useState(3)

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
        <Box sx={{width:"100%"}}  ref={projRef}>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="projects | clementc.dev" />
                <meta property="og:description" content="projects by clement" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/banner%2Fproject.png?alt=media&token=4d196260-8ed5-450f-8237-4a9a4859164e" />
                <meta property="og:url" content="https://clementc.dev/projects" />
                <title>projects | clementc.dev</title>
            </Head>

            <TitleBanner darkColor={"#c08552"} whiteColor={"#dab49d"}>
                <Typography variant="h2" sx={{ transition: "color 1s ease-in-out" }}>projects</Typography>    
            </TitleBanner>
            <Box sx={{padding:2}}>
            <Grid container spacing={1} sx={{ width: "100%" }} ref={projRef}>
                {
                    project.map((data, index) =>
                        <Grid item xs={xs} key={index}>
                            <ProjectCard data={data} />
                        </Grid>
                    )
                }
            </Grid>
            </Box>
        </Box>
    )
}

export async function getStaticProps() {
    var project = Array(4).fill(null)
    const document = await getProjectList(20)
    if (document.success) {
        project = document.data
    } else {
        console.log(document.err)
    }

    return {
        props: {
            project,
        },
        revalidate: 432000,
    }
}