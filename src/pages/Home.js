import { Box, Typography, Fade, IconButton, Paper} from "@mui/material"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home(){
    return(
        <Box sx={{height:"100%", width:"100vw", backgroundColor:"white", display:"flex"}}>
            <Box sx={{width:"50vw", backgroundColor:"transparent", textAlign:"right",
                pr:"1vw", my:"20vh"}}>
                <IconButton>
                    <LinkedInIcon sx={{ fontSize:50 }}/>
                </IconButton>
                <IconButton>
                    <GitHubIcon sx={{ fontSize:50 }}/>
                </IconButton>
                <img src={require("../assets/profile.jpg")} alt="Profile" width={"20%"}/>
            </Box>
            <Fade in={true} sx={{width:"50vw", pl:"1vw", my:"20vh"}} timeout={ 1000 }>
                <Box>
                    <Typography variant="h2"> Hi!</Typography>
                    <Typography variant="h3"> I'm Clement</Typography>
                    <Typography variant="h5"> Welcome to my website</Typography>
                </Box>
            </Fade>
        </Box>  
    )
}