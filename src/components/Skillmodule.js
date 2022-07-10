import { Box, ButtonGroup, Button} from "@mui/material"
import { useState } from "react"
import SkillCard from "./SkillCard"

export default function Skillmodule() {
    const [selected, setSelected] = useState("DevOps")

    return(
        <Box sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <ButtonGroup size="small" sx={{ alignSelf: "center", margin:1}} disableElevation disableRipple>
                <Button variant={selected === "DevOps" ? "contained" : "outlined"} 
                onClick={() => setSelected("DevOps")}>
                    DevOps
                </Button>
                <Button variant={selected === "Frontend" ? "contained" : "outlined"} 
                onClick={() => setSelected("Frontend")}>
                    Frontend
                </Button>
                <Button variant={selected === "Backend" ? "contained" : "outlined"} 
                onClick={() => setSelected("Backend")}>
                    Backend
                </Button>
                <Button variant={selected === "Blockchain" ? "contained" : "outlined"} 
                onClick={() => setSelected("Blockchain")}>
                    Blockchain
                </Button>
                <Button variant={selected === "Life" ? "contained" : "outlined"} 
                onClick={() => setSelected("Life")}>
                    Life
                </Button>
            </ButtonGroup>
            <Box sx={{width:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap", 
            justifyContent:"center", gap:2}}>
                <SkillCard title={selected}/>
                <SkillCard title={selected}/>
            </Box>
        </Box>
    )
}