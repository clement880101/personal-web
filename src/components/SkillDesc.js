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
        <Box sx={{ width: 400, minHeight:200, alignItems:"center", justifyContent:"center", 
        display:"flex", flexDirection:"column", padding:3}}>
            <Typography variant='h6'>{(searchParams.get("skills") === null) ? 
            "To learn more about my experiences, click on the tags"
            :searchParams.get("skills")}</Typography>
            <Typography variant="body1">
                {((searchParams.get("skills") === null) || (data === null)) ? "" : 
                find(data, searchParams.get("skills"))}
            </Typography>
        </Box>
    )
}