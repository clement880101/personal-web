import { Box, CircularProgress} from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function App() {
  const router = useRouter()

  useEffect(()=>{
    router.push("/home")
  },[])

  return (
    <Box sx={{height: "100vh", width:"100%", display:"flex", flexDirection:"column",
    alignItems: "center", justifyContent: "center"}}>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="home|clementc.dev" />
        <meta property="og:description" content="portfolio and blog by clement" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/thumbnail%2Fpersonalweb.PNG?alt=media&token=dece4229-f941-4f15-b24e-eb7d6abe1c98" />
        <meta property="og:url" content="https://clementc.dev/home" />
        <title>home|clementc.dev</title>
      </Head>
      <CircularProgress />
    </Box>

  )
}
