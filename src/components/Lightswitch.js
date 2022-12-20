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
            color:"white", background: (darkmode) ? "rgb(0,0,0, 0.3)" : "rgb(0,0,0,0.7)",
            "&.MuiButtonBase-root:hover": {
                bgcolor: (darkmode) ? "rgb(0,0,0,0.7)" : "rgb(0,0,0, 0.3)"
            }
        }}
            size="small" onClick={() => setDarkMode(!darkmode)}>
            {darkmode ? <LightModeIcon /> : <NightlightIcon />}
        </Fab>

    );
}