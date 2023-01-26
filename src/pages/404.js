import { Typography, Box, Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Custom404(){
    const router = useRouter()

    return(
        <Box sx={{height: "100vh", width:"100%", display:"flex", flexDirection:"column",
        alignItems: "center", justifyContent: "center"}}>
            <Head>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content="404|clementc.dev"/>
                <meta property="og:description" content="404 in clementc.dev"/>
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/thumbnail%2Fpersonalweb.PNG?alt=media&token=dece4229-f941-4f15-b24e-eb7d6abe1c98"/>
                <meta property="og:url" content="https://clementc.dev/404"/>
                <title>404|clementc.dev</title>
            </Head>
            <Typography variant="h6">Woah, seems like you ended up in a dead link</Typography>
            <Button variant="contained" size="small" disableTouchRipple sx={{ borderRadius: 10, margin:1}}
                    onClick={() => { router.push("/home") }}>Home</Button>
        </Box>
    )
}