import {
    Box, Typography, Card, CardMedia, Skeleton, Grid,
    ToggleButton, ToggleButtonGroup
} from "@mui/material"
import Head from "next/head"
import { useState, useEffect, useRef } from "react"
import ExpTimeline from "../components/ExpTimeline"
import TitleBanner from "../components/TitleBanner"
import SkillLeft from "../components/SkillLeft"
import SkillRight from "../components/SkillRight"

import { getSkills } from "../api/firebaseApi"

export default function about() {
    const [selected, setSelected] = useState("All")
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [xs, setXs] = useState(6)
    const aboutRef = useRef()

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
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Box sx={{ width: "100%" }} ref={aboutRef}>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="about | clementc.dev" />
                <meta property="og:description" content="about clement" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/banner%2Fabout.png?alt=media&token=565a5c5c-165a-4702-8631-a7754dd97e04" />
                <meta property="og:url" content="https://clementc.dev/about" />
                <title>about | clementc.dev</title>
                <meta name="description" content="about clement" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="clementc.dev" />
                <meta property="twitter:url" content="https://clementc.dev/about" />
                <meta name="twitter:title" content="about | clementc.dev" />
                <meta name="twitter:description" content="about clement" />
                <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/banner%2Fabout.png?alt=media&token=565a5c5c-165a-4702-8631-a7754dd97e04" />
            </Head>
            <TitleBanner darkColor={"#df2935"} whiteColor={"#fc7a57"}>
                <Typography variant="h2" sx={{ transition: "color 1s ease-in-out" }}>about</Typography>
                <Typography variant="h5" sx={{ transition: "color 1s ease-in-out" }}>The paths that I had taken and who I am now</Typography>
            </TitleBanner>

            <Grid container spacing={2} sx={{ width: "100%", padding: 2 }}>
                <Grid item xs={xs} sx={{ minHeight: 550 }}>
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
                            <Typography variant="h3" color="white">journey</Typography>
                            <Typography variant="h6" color="white">
                                How I plunged head first into the rabbit hole that is the tech industry
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={xs} sx={{ minHeight: 550 }}>
                    <ExpTimeline />
                </Grid>
                <Grid item xs={xs}>
                    <Typography sx={{ transition: "color 1s ease-in-out" }} variant="h3">skills</Typography>
                    <Typography sx={{ transition: "color 1s ease-in-out" }} variant="h6" color="text.secondary">
                        Now I can do all these things...
                    </Typography>
                    <ToggleButtonGroup value={selected}
                        exclusive onChange={handleChange} color="primary" size="small">
                        {category.map((cat, index) =>
                            <ToggleButton sx={{ transition: "color 1s ease-in-out" }} key={index} value={cat}>{cat}</ToggleButton>
                        )}
                    </ToggleButtonGroup>
                    <SkillLeft data={data} title={selected} />
                </Grid>
                <Grid item xs={xs}>
                    <SkillRight data={data} />
                </Grid>
            </Grid>
        </Box>
    )
}