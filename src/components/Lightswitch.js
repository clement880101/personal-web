import { IconButton, useMediaQuery} from "@mui/material";
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect } from "react";

export default function Lightswitch({darkmode, setDarkMode}) {
    const preferDark = useMediaQuery('(prefers-color-scheme: dark)');
    useEffect(() => {
        setDarkMode(preferDark);
    }, [setDarkMode, preferDark]);

    return (
        <IconButton sx={{position:"fixed", bottom:"0", right:"0"}} 
        onClick={() => setDarkMode(!darkmode)} disableRipple>
            {darkmode ?  <LightModeIcon />:<NightlightIcon />}
        </IconButton>
    );
}