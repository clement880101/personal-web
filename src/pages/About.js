import {
    Box, Typography, Card, CardMedia, Skeleton, useTheme, Grid,
    ToggleButton, ToggleButtonGroup
} from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"
import ExpTimeline from "../components/ExpTimeline"
import TitleCard from "../components/TitleCard"
import SkillLeft from "../components/SkillLeft"
import SkillRight from "../components/SkillRight"

import { getSkills } from "../api/firebaseApi"
import { createRef } from "preact"

export default function about() {
    const [selected, setSelected] = useState("All")
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [xs, setXs] = useState(6)
    const router = useRouter()
    const aboutRef = useRef()
    const skillRef = useRef()
    const theme = useTheme()

    const { skills } = router.query
    const category = ["DevOps", "Frontend", "Backend", "Life", "All"]

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null) {
            setSelected(newAlignment)
        }
    };

    useEffect(() => {
        function handleResize() {
            var col = aboutRef.current.clientWidth < 800
            if (col) {
                setXs(12)
            } else {
                setXs(6)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        getSkills().then((document) => {
            // Replace with error banner
            document[0] ? setData(document[1]) : console.log(document[1]);
        })

        // if ((skills !== undefined) &&(skillRef !== undefined)){
        //     skillRef.current.scrollIntoView({block: "end", inline: "nearest"})
        // }

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: 2 }} ref={aboutRef}>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="about|clementc.dev" />
                <meta property="og:description" content="about clement" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/banner%2Fabout.png?alt=media&token=565a5c5c-165a-4702-8631-a7754dd97e04" />
                <meta property="og:url" content="https://clementc.dev/about" />
                <title>about|clementc.dev</title>
            </Head>
            <TitleCard image={'about.png'}>
                <Typography sx={{ color: "white" }} variant="h2">about</Typography>
                <Typography variant="h5" color={"white"}>The paths that I had taken and who I am now</Typography>
            </TitleCard>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={xs}>
                    <Card sx={{
                        borderRadius: 4, position: "relative", overflow: "hidden", width: "100%", height: 550,
                        marginTop: 4
                    }} elevation={0}>
                        {
                            (loading) && <Skeleton variant="rectangular" height="100%" width="100%" />

                        }

                        <CardMedia component="img" sx={{ minWidth: "100%", minHeight: "100%" }}
                            image={"https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/about%2Fmountain.jpg?alt=media&token=9df30b79-96a3-435b-9cd2-65adab2e4f40"}
                            onLoad={() => { setLoading(false) }} />

                        <Box sx={{
                            position: 'absolute', bottom: 0, left: 0, width: "100%", height: "100%", padding: 5,
                            display: "flex", flexDirection: "column", justifyContent: "center",
                            bgcolor: "rgba(0, 0, 0, 0.50)",
                            backdropFilter: "blur(2px)"
                        }} alignItems={"start"} >
                            <Typography variant="h3" color="text.primary">The Journey</Typography>
                            <Typography variant="h6" color="text.secondry">
                                How I plunged head first into the rabbit hole that is the tech industry
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={xs}>
                    <ExpTimeline />
                </Grid>
                <Grid item xs={xs}>
                    <Typography variant="h3">Skills</Typography>
                    <Typography variant="h6" color="text.secondary">
                        Now I can do all these things...
                    </Typography>
                    <ToggleButtonGroup value={selected}
                        exclusive onChange={handleChange} color="primary" size="small">
                        {category.map((cat, index) =>
                            <ToggleButton key={index} value={cat}>{cat}</ToggleButton>
                        )}
                    </ToggleButtonGroup>
                    <SkillLeft data={data} title={selected} />
                </Grid>
                <Grid item xs={xs} ref={skillRef}>
                    <SkillRight data={data} />
                </Grid>
            </Grid>
        </Box>
    )
}