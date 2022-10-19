import { Typography, Card, CardContent } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

export default function SkillRight({ data }) {
    const [searchParams] = useSearchParams();

    function find(data, title) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].Name === title) {
                return data[i].Desc
            }
        }
        return "Error"
    }

    return (
        <Card sx={{
            minHeight: 200, alignItems: "center", justifyContent: "center",
            display: "flex", flexDirection: "column", padding: 3, maxWidth:500,
            borderRadius:4
        }}>
            <CardContent>
                <Typography variant='h5'>{(searchParams.get("skills") === null) ?
                    "Click on the pills to learn more"
                    : searchParams.get("skills")}</Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    {((searchParams.get("skills") === null) || (data === null)) ? "" :
                        find(data, searchParams.get("skills"))}
                </Typography>
            </CardContent>

        </Card>
    )
}