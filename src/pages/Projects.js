import { Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
import { getProjectList } from "../api/firebaseApi"
import ProjectCard from "../components/ProjectCard.js";

export default function Projects(){
    const [projlim, setProjlim] = useState(30)
    const [project, setProject] = useState(Array(projlim).fill(null))

    useEffect(()=>{
        getProjectList(projlim).then((document)=>{
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [projlim])

    return(
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", paddingX: 5}}>
            <Typography sx={{padding:10}} variant="h4">Projects</Typography>

            <Box sx={{flexWrap:"wrap", flexDirection:"row", display:"flex", justifyContent:"center"}}>
                {project.map((doc) => <ProjectCard doc={doc}/>)}
            </Box>
        </Box>
    )
}