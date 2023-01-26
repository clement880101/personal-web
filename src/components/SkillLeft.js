import { Typography, Chip, Box, Skeleton } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function SkillLeft({ data, title, mobile}) {
    const router = useRouter()
    const [skills, setSkills] = useState(Array(3).fill(null))
    const [languages, setLanguages] = useState(Array(6).fill(null))

    function handleClick(skill) {
        router.replace({
            query: { ...router.query, 'skills': skill },
         });
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
        <Box sx={{ display: "flex", flexDirection: "column", padding:2, width:"100%",justifyContent:"center"}}>
            <Typography variant="h5">...speak these languages</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap", padding: 2 }}>
                {
                    languages.map((item, index) => <Chip key={index} onClick={() => { handleClick(item.Name) }}
                        label={(item === null) ? <Skeleton width={50} /> : item.Name}
                        variant={((item !== null) && (router.query.skills === item.Name))
                            ? "filled" : "outlined"} />)
                }
            </Box>
            <Typography variant="h5">...talk about and use</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap", padding: 2 }}>
                {
                    skills.map((item, index) => <Chip key={index} onClick={() => { handleClick(item.Name) }}
                        label={(item === null) ? <Skeleton width={50} /> : item.Name}
                        variant={((item !== null) && (router.query.skills === item.Name))
                            ? "filled" : "outlined"} />)
                }
            </Box>
        </Box>
    )
}
