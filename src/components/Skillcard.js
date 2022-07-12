import { Card, CardContent, Typography, Chip, Box } from "@mui/material"
import { useEffect, useState } from "react"

export default function SkillCard({data, title}){
    const [skills, setSkills] = useState(Array(5).fill(null))
    const [languages, setLanguages] = useState(Array(5).fill(null))

    useEffect(()=>{
        if (data !== null){
            setSkills(data[title].skills)
            setLanguages(data[title].languages)
        }
    }, [data, title])

    return(
        <Card sx={{width:400, borderRadius:4}}>
            <CardContent sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Typography>{title}</Typography>
                <Typography>I know these languages</Typography>
                <Box sx={{display:"flex", flexDirection:"row", gap:1, flexWrap:"wrap", padding:2}}>
                    {languages.map((item)=> <Chip label={(item === null) ? " " : item}/>)}
                </Box>
                <Typography>Things that I am skilled in</Typography>
                <Box sx={{display:"flex", flexDirection:"row", gap:1, flexWrap:"wrap", padding:2}}>
                    {skills.map((item)=> <Chip label={(item === null) ? " " : item}/>)}
                </Box>
            </CardContent>
        </Card>
    )
}