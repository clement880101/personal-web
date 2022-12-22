import { useMediaQuery, Fab } from "@mui/material";
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect } from "react";

export default function Lightswitch({ darkmode, setDarkMode }) {
    const preferDark = useMediaQuery('(prefers-color-scheme: dark)');
    useEffect(() => {
        setDarkMode(preferDark);
    }, [setDarkMode, preferDark]);

    return (
        <Fab sx={{
            position: "fixed", bottom: "0", right: "0", margin: 2, backdropFilter: "blur(5px)",
            color:"white", background: (darkmode) ? "rgb(255,255,255,0.5)" : "rgb(0,0,0,0.5)",
            "&.MuiButtonBase-root:hover": {
                bgcolor: (darkmode) ? "rgb(255,255,255,1)" : "rgb(0,0,0,1)"
            }
        }}
            size="small" onClick={() => setDarkMode(!darkmode)}>
            {darkmode ? <LightModeIcon sx={{color:"black"}}/> : <NightlightIcon sx={{color:"white"}}/>}
        </Fab>

    );
}