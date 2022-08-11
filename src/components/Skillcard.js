import { Card, CardContent, Typography, Chip, Box } from "@mui/material"
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from "react"

export default function SkillCard({ data, title }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [skills, setSkills] = useState(Array(1).fill(null))
    const [languages, setLanguages] = useState(Array(1).fill(null))

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
        <Card sx={{ width: 400, borderRadius: 4 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="subtitle1">I know these languages:</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap", padding: 2 }}>
                    {
                        languages.map((item) => <Chip onClick={() => { handleClick(item.Name) }}
                            label={(item === null) ? "loading..." : item.Name}
                            variant={((item !== null) && (searchParams.get("skills") === item.Name))
                                ? "filled" : "outlined"} />)
                    }
                </Box>
                <Typography variant="subtitle1">Things that I am skilled in:</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap", padding: 2 }}>
                    {
                        skills.map((item) => <Chip onClick={() => { handleClick(item.Name) }}
                            label={(item === null) ? "loading..." : item.Name}
                            variant={((item !== null) && (searchParams.get("skills") === item.Name))
                                ? "filled" : "outlined"} />)
                    }
                </Box>
            </CardContent>
        </Card>
    )
}