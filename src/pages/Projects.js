import { Typography, Box} from "@mui/material"
import { Masonry } from "@mui/lab";

import { useEffect, useState } from "react"
import { getProjectList } from "../api/firebaseApi"
import ProjectCard from "../components/ProjectCard.js";
import TitleCard from "../components/TitleCard";

export default function Projects({ mobile }) {
    const [projlim, setProjlim] = useState(30)
    const [project, setProject] = useState(Array(6).fill(null))

    useEffect(() => {
        getProjectList(projlim).then((document) => {
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [projlim])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingX: "10vw" }}>

            <TitleCard image={'yellow.png'}>
                <Typography variant={(mobile)?"h2":"h1"} color={"black"}>Projects</Typography>
            </TitleCard>
            {
                (mobile) ?
                    project.map((doc) =>
                        <ProjectCard doc={doc} />
                    )
                    :

                    <Masonry columns={"auto"}>
                        {project.map((doc) =>
                            <ProjectCard doc={doc} />)
                        }
                    </Masonry>
            }
        </Box>
    )
}