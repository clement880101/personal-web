import { Typography } from '@mui/material';
import { Box } from '@mui/system'
import { useSearchParams } from 'react-router-dom';

export default function SkillDesc({ data }) {
    const [searchParams, setSearchParams] = useSearchParams();

    function find(data, title) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].Name === title) {
                return data[i].Desc
            }
        }
        return "Error"
    }

    return (
        <Box sx={{ width: 400, height:"100%", alignItems:"center", justifyContent:"center", 
        display:"flex", flexDirection:"column"}}>
            <Typography>{(searchParams.get("skills") === null) ? "None":searchParams.get("skills")}</Typography>
            <Typography>
                {((searchParams.get("skills") === null) || (data === null)) ? "None" : 
                find(data, searchParams.get("skills"))}
            </Typography>
        </Box>
    )
}