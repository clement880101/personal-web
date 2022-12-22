import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState, useEffect, createRef } from "react"

import SkillLeft from "./SkillLeft"
import SkillRight from "./SkillRight"

import { getSkills } from "../api/firebaseApi"

import { useSearchParams } from 'react-router-dom';


export default function Skillmodule({ mobile }) {
    const [selected, setSelected] = useState("All")
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
        if (searchParams.get("skills") !== null) {
            skillRef.current.scrollIntoView(true)
        }
    }, [])

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null) {
            setSelected(newAlignment)
        }
    };

    return (
        <Box sx={{
            width: "95vw", display: "flex", flexDirection: (mobile) ? "column" : "row"
        }} ref={skillRef}>
            <Box sx={{display: "flex", flexDirection:"column", width: (mobile)? "100%": "50%",
            alignItems:(mobile)?"center":"flex-start"}}>
                <ToggleButtonGroup value={selected}
                    exclusive onChange={handleChange} color="primary" size="small">
                    {category.map((cat) =>
                        <ToggleButton value={cat}>{cat}</ToggleButton>
                    )}
                </ToggleButtonGroup>
                <SkillLeft data={data} title={selected} mobile={mobile} />
            </Box>

            <SkillRight data={data} ref={skillRef} mobile={mobile} />
        </Box>
    )
}