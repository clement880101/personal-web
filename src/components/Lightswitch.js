import {useMediaQuery, Fab } from "@mui/material";
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect } from "react";

export default function Lightswitch({ darkmode, setDarkMode }) {
    const preferDark = useMediaQuery('(prefers-color-scheme: dark)');
    useEffect(() => {
        setDarkMode(preferDark);
    }, [setDarkMode, preferDark]);

    return (
        <Fab sx={{ position: "fixed", bottom: "0", right: "0", margin:2}}
        size="small" onClick={() => setDarkMode(!darkmode)}>
            {darkmode ? <LightModeIcon /> : <NightlightIcon />}
        </Fab>

    );
}