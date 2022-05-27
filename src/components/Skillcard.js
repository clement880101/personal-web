import { Paper, Typography, Box, Chip } from "@mui/material"

export default function Skillcard({ title }) {
    var language = []
    var skills = []

    if (title === "DevOps") {
        language = ["Python", "GoLang", "C shell", "SQL", "Perl"]
        skills = ["Linux", "Jenkins", "InfluxDB", "Grafana", "MongoDB", "TensorFlow",
            "PostgreSQL", "MySQL", "Docker", "AWS", "Git", "Perforce"]
    } else if (title === "Fullstack") {
        language = ["JavaScript", "Python", "Java", "C++", "Typescript", "SQL", "html/CSS", "R"]
        skills = ["React.js", "Node.js", "MongoDB", "MySQL", "Firebase", "MUI",
            "SpringBoot", "TensorFlow", "Git", "AWS", "Framer Motion", "Ant Design"]
    } else if (title === "Blockchain") {
        language = ["C++", "Python", "GoLang", "Solidity", "Java"]
        skills = ["Scaffolding-ETH", "Hardhat", "The Graph", "Docker", "React.js",
            "Metamask", "Wallet Connect"]
    } else {
        language = ["English", "Mandarin"]
        skills = ["Travel", "Fencing", "Geopolitics", "Food", "Clarinet", "Steak",
            "Experimental Music"]
    }

    return (
        <Paper sx={{
            width: 350, height: 500, borderRadius: 10, display: "flex", flexDirection: "column",
            alignItems: "center", padding: 3, marginY: 2, marginX: 10
        }} elevation={24}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1" sx={{ alignSelf: "flex-start" }}>I know how to speak these languages</Typography>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {language.map((lang, index) => (
                    <Chip sx={{ margin: 1 }} key={index} label={lang} />
                ))}
            </Box>
            <Typography variant="body1" sx={{ alignSelf: "flex-start" }}>Things that I am interested or skilled in </Typography>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {skills.map((lang, index) => (
                    <Chip sx={{ margin: 1 }} key={index} label={lang} />
                ))}
            </Box>

        </Paper>
    )
}