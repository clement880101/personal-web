import { Box, ButtonGroup, Button} from "@mui/material"
import { useState, useEffect } from "react"

import SkillCard from "./SkillCard"
import SkillDesc from "./SkillDesc"

import { getSkills } from "../api/firebaseApi"


export default function Skillmodule() {
    const [selected, setSelected] = useState("DevOps")
    const [data, setData] = useState(null)
    const category = ["DevOps", "Frontend", "Backend", "Life", "All"]

    useEffect(()=>{
        getSkills().then((document)=>{
            // Replace with error banner
            document[0] ? setData(document[1]) : console.log(document[1])
        })
    }, [])

    return(
        <Box sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <ButtonGroup size="small" sx={{ alignSelf: "center", margin:1}} disableElevation disableRipple>
                {category.map((cat) =>
                    <Button variant={selected === cat ? "contained" : "outlined"} 
                    onClick={() => setSelected(cat)}>
                        {cat}
                    </Button>
                )}
            </ButtonGroup>
            <Box sx={{width:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap", 
            justifyContent:"center", margin:1}}>
                <SkillCard data={data} title={selected}/>
                <SkillDesc data={data}/>
            </Box>
        </Box>
    )
}