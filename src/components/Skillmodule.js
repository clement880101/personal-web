import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState, useEffect, createRef } from "react"

import SkillLeft from "./SkillLeft"
import SkillRight from "./SkillRight"

import { getSkills } from "../api/firebaseApi"

import { useSearchParams } from 'react-router-dom';


export default function Skillmodule() {
    const [selected, setSelected] = useState("DevOps")
    const [data, setData] = useState(null)
    const [searchParams] = useSearchParams();

    const category = ["DevOps", "Frontend", "Backend", "Life", "All"]

    const skillRef = createRef()

    useEffect(() => {
        getSkills().then((document) => {
            // Replace with error banner
            document[0] ? setData(document[1]) : console.log(document[1]);
            if (searchParams.get("skills") !== null) {
                setSelected("All")
            }
        })
    }, [])

    useEffect(() => {
        if (((skillRef.current !== undefined) && (skillRef.current !== null)) &&
            ((searchParams.get("skills") !== null) && (data !== null))) {
            setTimeout(() => { skillRef.current.scrollIntoView(false) }, 1000);
        }
    }, [searchParams, skillRef, data])

    const handleChange = (event, newAlignment) => {
        setSelected(newAlignment)
    };

    return (
        <Box sx={{ width: "95vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ToggleButtonGroup sx={{ alignSelf: "center", margin: 1 }} value={selected} 
            exclusive onChange={handleChange} color="primary" size="small">
                {category.map((cat) =>
                    <ToggleButton value={cat}>{cat}</ToggleButton>
                )}   
            </ToggleButtonGroup>

            <Box sx={{ width: "95vw", display: "flex", flexWrap: "wrap", flexDirection: "row", marginTop: 2 }}>
                <SkillLeft data={data} title={selected} />
                <SkillRight data={data} ref={skillRef} />
            </Box>
        </Box>
    )
}