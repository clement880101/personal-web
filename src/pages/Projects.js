import { Typography, Box } from "@mui/material"
import { Masonry } from "@mui/lab";

import { useEffect, useState } from "react"
import { getProjectList } from "../api/firebaseApi"
import ProjectCard from "../components/ProjectCard.js";
import TitleCard from "../components/TitleCard";

export default function Projects({ mobile }) {
    const [projlim, setProjlim] = useState(30)
    const [project, setProject] = useState(Array(6).fill(null))
    const [col, setCol] = useState(Math.floor(window.innerWidth * 0.95 / 290))

    useEffect(() => {
        getProjectList(projlim).then((document) => {
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [projlim])

    function handleResize() {
        setCol(Math.floor(window.innerWidth * 0.95 / 290))
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <TitleCard image={'rocket.png'}>
                <Typography variant={(mobile) ? "h2" : "h1"} color={"white"}>Projects</Typography>
            </TitleCard>
            {
                (mobile) ?
                    project.map((doc, index) =>
                        <ProjectCard doc={doc} key={index} />
                    )
                    :
                    <Box sx={{ width: "95vw" }}>
                        <Masonry columns={col} spacing={2}>
                            {project.map((doc, index) =>
                                <ProjectCard doc={doc} key={index} />)
                            }
                        </Masonry>
                    </Box>
            }
        </Box>
    )
}