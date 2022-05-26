import { Typography, Box, IconButton, Divider, Link} from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import emory from "../assets/emory.jpg";
import kimforest from "../assets/kimforest.jpg";
import synopsys from "../assets/synopsys.jpg";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Cardpopup from "../components/Cardpopup";

export default function Home() {
    const [index, setIndex] = useState(0)
    const iam = ["DevOps Engineer", "Fullstack Dev", "Web3 Enthusiast"];

    useEffect(() => {
        const interval = setInterval(() => {
            if (index >= iam.length - 1) {
                setIndex(0)
            } else {
                setIndex(index + 1)
            }
        }, 3000)

        return (() => clearInterval(interval))
    })

    return (
        <Box>
            <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant="h1">Clement Chang</Typography>
                <Typography variant="h2" key={index} component={motion.div}
                    initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} >
                    {iam[index]}
                </Typography>
                <IconButton sx={{width:50, height:50, marginTop:5}} disableRipple
                onClick={()=>{window.scrollTo(0, window.innerHeight * 1.2)}}
                component={motion.div} whileHover={{y:5}} whileTap={{y:20}}>
                    <KeyboardArrowDownIcon sx={{ fontSize: 100 }} />
                </IconButton>
            </Box>

            <Box sx={{ height: "20vh", display:"flex", flexDirection:"column", alignItems:"center",
             justifyContent:"center", padding:5}}>
                <Typography variant="h5">Hi, I'm a DevOps & Fullstack Engineer based in the Bay Area</Typography>
                <Typography variant="body1">This is a website where I share my thoughts on the world and showcase what I have accomplished</Typography>
                <Typography variant="body2">Feel free to <Link href="/contact">contact</Link> me if you want to connect, exchange ideas, or grab some coffee</Typography>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography sx={{paddingTop:7}} variant="h4">Experiences</Typography>
                <Box sx={{display: "flex", flexDirection: "row", flexWrap:"wrap", justifyContent:"space-evenly"}}>
                    <Cardpopup title={"Synopsys"} picture={synopsys}>
                        <Typography variant="h5">DevOps Engineer</Typography>
                        <Typography variant="body2">2021 - Present</Typography>
                        <Divider variant="middle" />
                        <Typography variant="body1">Processed 100+GB of Next Generation Sequencing raw data with a bioinformatics pipeline in Linux to recommend drugs that are not conventionally used to treat specific cancer variants for patients that had exhausted other option</Typography>
                    </Cardpopup>
                    <Cardpopup title={"KimForest"} picture={kimforest}>
                        <Typography variant="h5">Data Analyst Intern</Typography>
                        <Typography variant="body2">2018</Typography>
                        <Divider variant="middle" />
                        <Typography variant="body1">Analyzed and processed micro-array results using DeSeq2 in R environment to provide paying customers with personalized portfolios of potential inherited health risks and recommended steps to minimize such risks</Typography>
                        <Typography variant="body1">Processed 100+GB of Next Generation Sequencing raw data with a bioinformatics pipeline in Linux to recommend drugs that are not conventionally used to treat specific cancer variants for patients that had exhausted other option</Typography>
                    </Cardpopup>
                    <Cardpopup title={"Emory"} picture={emory}>
                        <Typography variant="h5">Undergraduate Student</Typography>
                        <Typography variant="body2">CS and Bio Major</Typography>
                        <Divider variant="middle" />
                        <Typography variant="body1">Analyzed and processed micro-array results using DeSeq2 in R environment to provide paying customers with personalized portfolios of potential inherited health risks and recommended steps to minimize such risks</Typography>
                        <Typography variant="body1">Processed 100+GB of Next Generation Sequencing raw data with a bioinformatics pipeline in Linux to recommend drugs that are not conventionally used to treat specific cancer variants for patients that had exhausted other option</Typography>
                    </Cardpopup>
                </Box>
            </Box>
            <Box sx={{ height: "20vh"}}>
                

            </Box>
            <Box sx={{ height: "100vh"}}>
                <Typography sx={{paddingTop:7}} variant="h4">Skills</Typography>
            </Box>
        </Box>
    )
}