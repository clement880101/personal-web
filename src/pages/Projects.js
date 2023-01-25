import { Typography, Box, Grid} from "@mui/material"
import { useEffect, useState, useRef } from "react"
import { getProjectList } from "../api/firebaseApi"
import ProjectCard from "../components/ProjectCard.js";
import TitleCard from "../components/TitleCard";

export default function Projects({ mobile }) {
    const projRef = useRef()
    const [xs, setXs] = useState(3)
    const [project, setProject] = useState(Array(12/xs).fill(null))
    

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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding:2}}
            ref={projRef}>
            <TitleCard image={'lake.png'}>
                <Typography variant={(mobile) ? "h2" : "h1"} color={"white"}>Projects</Typography>
            </TitleCard>
            <Grid container spacing={1} sx={{ width: "100%", marginTop:2}} ref={projRef}>
                {
                    project.map((doc, index) =>
                        <Grid item xs={xs}>
                            <ProjectCard doc={doc} key={index} />
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}