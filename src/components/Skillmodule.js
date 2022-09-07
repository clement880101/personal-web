import { Box, ButtonGroup, Button} from "@mui/material"
import { useState, useEffect } from "react"

import SkillCard from "./SkillCard"
import SkillDesc from "./SkillDesc"

import { getSkills } from "../api/firebaseApi"

import { useSearchParams } from 'react-router-dom';


export default function Skillmodule({mobile}) {
    const [selected, setSelected] = useState("DevOps")
    const [data, setData] = useState(null)
    const [searchParams] = useSearchParams();

    const category = ["DevOps", "Frontend", "Backend", "Life", "All"]

    useEffect(()=>{
        getSkills().then((document)=>{
            // Replace with error banner
            document[0] ? setData(document[1]) : console.log(document[1]);
            if (searchParams.get("skills") !== null) {
                setSelected("All")
                window.scrollTo(0, 700);
            }
        })
    }, [])

    return(
        <Box sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <ButtonGroup size="small" sx={{ alignSelf: "center", margin:1}} disableElevation disableRipple>
                {category.map((cat) =>
                    <Button variant={selected === cat ? "contained" : "outlined"} 
                    onClick={() => setSelected(cat)} sx={{borderRadius:10}}>
                        {cat}
                    </Button>
                )}
            </ButtonGroup>
            <Box sx={{width:"100%", display:"flex", flexWrap:"wrap", flexDirection:"row",
            justifyContent:"center", margin:1}}>
                <SkillCard data={data} title={selected}/>
                <SkillDesc data={data}/>
            </Box>
        </Box>
    )
}