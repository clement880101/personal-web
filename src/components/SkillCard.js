import { Card, CardContent, Typography, Chip, Box, Skeleton} from "@mui/material"
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from "react"

export default function SkillCard({ data, title}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [skills, setSkills] = useState(Array(3).fill(null))
    const [languages, setLanguages] = useState(Array(3).fill(null))

    function handleClick(skill) {
        setSearchParams({ 'skills': skill }, { replace: true })
    }

    useEffect(() => {
        if (data !== null) {
            const ski = []
            const lang = []
            for (let i = 0; i < data.length; i++) {
                if ((title === "All") || (data[i].Tag === title)) {
                    if (data[i].Type === "skills") {
                        ski.push(data[i])
                    } else if (data[i].Type === "language") {
                        lang.push(data[i])
                    }
                }
            }
            setSkills(ski)
            setLanguages(lang)
        }
    }, [data, title])


    return (
        <Card sx={{ borderRadius: 4, padding:2, maxWidth:500}}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "start"}}>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body1">...speak these languages</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap", padding: 2 }}>
                    {
                        languages.map((item) => <Chip onClick={() => { handleClick(item.Name) }}
                            label={(item === null) ? <Skeleton width={50}/> : item.Name}
                            variant={((item !== null) && (searchParams.get("skills") === item.Name))
                                ? "filled" : "outlined"} />)
                    }
                </Box>
                <Typography variant="body1">...talk about and use</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap", padding: 2 }}>
                    {
                        skills.map((item) => <Chip onClick={() => { handleClick(item.Name) }}
                            label={(item === null) ? <Skeleton width={50}/> : item.Name}
                            variant={((item !== null) && (searchParams.get("skills") === item.Name))
                                ? "filled" : "outlined"} />)
                    }
                </Box>
            </CardContent>
        </Card>
    )
}
