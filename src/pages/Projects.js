import { Typography, Box, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { getProjectList } from "../api/firebaseApi"
import ProjectCard from "../components/ProjectCard.js";

export default function Projects() {
    const [projlim, setProjlim] = useState(30)
    const [project, setProject] = useState(Array(projlim).fill(null))

    useEffect(() => {
        getProjectList(projlim).then((document) => {
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [projlim])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingX: "10vw" }}>
            <Typography sx={{ padding: 10 }} variant="h4">Projects</Typography>
            <Grid container sx={{ wrap: "wrap" }}>
                {project.map((doc) =>
                    <Grid item xs={"auto"}>
                        <ProjectCard doc={doc} />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}