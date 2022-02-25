import { AppBar, Toolbar, Typography, Box, Button, Link} from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"

import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#000000',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
});

export default function TopNav(){
    const pages = ["Home", "About", "Contact"]
    const nav = useNavigate()
    const loc = useLocation()

    return(
        <AppBar position="sticky" color="transparent" elevation={(window.pageYOffset === 0)? 0: 4}>
            <Toolbar disableGutters sx={{px:"10vw"}}>
                <Link onClick={()=>{nav("/home", {replace:false})}} variant="h6" underline="none">
                    CLEMENT
                </Link>
                <Box sx={{flexGrow:1, display:"flex", justifyContent:"flex-end"}}>
                    {pages.map((page) =>(
                        <Button key={page} variant={("/" + page.toLowerCase() === loc.pathname)
                        ?"contained": "text"} color="primary" 
                        disableElevation sx={{minWidth:"8vw", mx:"0.25vw"}} 
                        onClick={()=>{nav("/" + page.toLowerCase(), {replace:false})}}>
                            {page}
                        </Button>))}
                </Box>
            </Toolbar>
        </AppBar>
    )
}