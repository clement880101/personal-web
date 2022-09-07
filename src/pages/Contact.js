import { Typography, Box } from "@mui/material";
import LinkCard from "../components/LinkCard";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Contact({ mobile }) {
    if (mobile) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingX: "10vw" }}>
                <Typography variant="h4" sx={{ padding: 10 }}>Contact</Typography>
                <LinkCard link={'https://github.com/clement880101'} bgcolor={"auto"}>
                    <GitHubIcon sx={{ fontSize: 90, color: "auto" }} />
                </LinkCard>
                <LinkCard link={'https://www.linkedin.com/in/clement-chang-815501145/'} bgcolor={"#0077B5"}>
                    <LinkedInIcon sx={{ fontSize: 90, color: "white" }} />
                </LinkCard>
                <LinkCard link={'https://twitter.com/clement880101'} bgcolor={"#1DA1F2"}>
                    <TwitterIcon sx={{ fontSize: 90, color: "white" }} />
                </LinkCard>
            </Box>
        )
    } else {
        return (
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"center",
            paddingTop: 5, paddingX: "10vw" }}>
                <Typography variant="h2">Contact</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", marginLeft:"10vw" }}>
                    <LinkCard link={'https://github.com/clement880101'} bgcolor={"auto"}>
                        <GitHubIcon sx={{ fontSize: 90, color: "auto" }} />
                    </LinkCard>
                    <LinkCard link={'https://www.linkedin.com/in/clement-chang-815501145/'} bgcolor={"#0077B5"}>
                        <LinkedInIcon sx={{ fontSize: 90, color: "white" }} />
                    </LinkCard>
                    <LinkCard link={'https://twitter.com/clement880101'} bgcolor={"#1DA1F2"}>
                        <TwitterIcon sx={{ fontSize: 90, color: "white" }} />
                    </LinkCard>
                </Box>
            </Box>

        )
    }
}