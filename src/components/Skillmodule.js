import { Box, ButtonGroup, Button } from "@mui/material"
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

    useEffect(()=>{
        if (((skillRef.current !== undefined)&&(skillRef.current !== null))&&
        ((searchParams.get("skills") !== null)&&(data !== null))) {
            setTimeout(() => { skillRef.current.scrollIntoView(false) }, 1000);
        }
    }, [searchParams, skillRef, data])

    return (
        <Box sx={{ width: "95vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ButtonGroup size="small" sx={{ alignSelf: "center", margin: 1 }} disableElevation disableRipple>
                {category.map((cat) =>
                    <Button variant={selected === cat ? "contained" : "outlined"}
                        onClick={() => setSelected(cat)} sx={{ borderRadius: 10 }}>
                        {cat}
                    </Button>
                )}
            </ButtonGroup>
            <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", flexDirection: "row", margin: 1 }}>
                <SkillLeft data={data} title={selected}/>
                <SkillRight data={data} ref={skillRef} />
            </Box>
        </Box>
    )
}