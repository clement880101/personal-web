import { Typography, Box, Toolbar } from "@mui/material";

import LinkCard from "../components/LinkCard";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import Head from "next/head";

export default function contact() {
    return (
        <Box sx={{
            display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly",
            flexWrap: "wrap", width: "100%", height: "100vh"
        }}>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="contact | clementc.dev" />
                <meta property="og:description" content="contact clement" />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/thumbnail%2Fpersonalweb.PNG?alt=media&token=dece4229-f941-4f15-b24e-eb7d6abe1c98" />
                <meta property="og:url" content="https://clementc.dev/contact" />
                <title>contact | clementc.dev</title>
                <meta name="description" content="contact clement"/>
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="clementc.dev" />
                <meta property="twitter:url" content="https://clementc.dev/contact" />
                <meta name="twitter:title" content="contact | clementc.dev" />
                <meta name="twitter:description" content="contact clement" />
                <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/thumbnail%2Fpersonalweb.PNG?alt=media&token=dece4229-f941-4f15-b24e-eb7d6abe1c98" />
            </Head>
            <Typography variant="h2" sx={{ transition: "color 1s ease-in-out" }}>contact</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <LinkCard link={'https://github.com/clement880101'} bgcolor={"auto"}>
                    <GitHubIcon sx={{ fontSize: 70, color: "auto", transition: "color 1s ease-in-out" }} />
                </LinkCard>
                <LinkCard link={'https://www.linkedin.com/in/clement-chang-815501145/'} bgcolor={"#0077B5"}>
                    <LinkedInIcon sx={{ fontSize: 70, color: "white" }} />
                </LinkCard>
                <LinkCard link={'https://twitter.com/clement880101'} bgcolor={"#1DA1F2"}>
                    <TwitterIcon sx={{ fontSize: 70, color: "white" }} />
                </LinkCard>
            </Box>
        </Box>
    )
}
