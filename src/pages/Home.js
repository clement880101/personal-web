import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
    const [index, setIndex] = useState(0)
    const iam = ["DevOps Engineer", "Fullstack Developer", "Blockchain Enthusiast",
        "Amateur Fencer", "Giant Foodie", "Avid Traveler"];

    useEffect(() => {
        const interval = setInterval(() => {
            if (index >= iam.length - 1) {
                setIndex(0)
            } else {
                setIndex(index + 1)
            }
        }, 2000)

        return (() => clearInterval(interval))
    })

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h1">Clement Chang</Typography>
            <Typography variant="h2" key={index} component={motion.div}
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} >
                {iam[index]}
            </Typography>
        </Box>
    )
}