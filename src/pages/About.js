import { Box, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import { getExperiences } from "../api/firebaseApi"
import Expcard from "../components/Expcard"

export default function About(){
    const limit = 3

    const [exp, setExp] = useState(Array(limit).fill(null))
    useEffect(()=>{
        getExperiences(limit).then((document)=>{
            // Replace with error banner
            document[0] ? setExp(document[1]) : console.log(document[1])
        })
    }, [])

    return(
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", paddingX: 5}}>
            <Typography sx={{padding:10}} variant="h4">About</Typography>
            <Typography variant="h5">Experiences</Typography>
            <Box sx={{flexWrap:"wrap", flexDirection:"row", display:"flex", justifyContent:"center"}}>
                {exp.map((doc) => <Expcard doc={doc}/>)}
            </Box>
        </Box>
    )
}