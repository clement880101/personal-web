import { Typography, Card, CardContent, CardMedia, Skeleton} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export default function SkillRight({ data, mobile }) {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true)

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
            position: "relative", borderRadius: 4, width: (mobile) ? "100%" : "50%", 
            overflow:"hidden", minHeight:"100%"
        }}>
            {
                (loading) && <Skeleton variant="rectangular" height="100%" width="100%" />

            }

            <CardMedia sx={{ height: "100%" }} component="img"
                image={"https://firebasestorage.googleapis.com/v0/b/personalwebsite-4b72f.appspot.com/o/about%2Fpaint.jpg?alt=media&token=c8ca6edc-d95a-41a7-a763-bd5b2603e8e3"} 
                onLoad={() => { setLoading(false) }} />
            <CardContent sx={{
                 position: 'absolute', bottom: 0, left: 0, width: "100%", height: "100%", padding: 5,
                 display: "flex", flexDirection: "column", justifyContent: "center", 
                 bgcolor:"rgba(0, 0, 0, 0.70)", backdropFilter: "blur(5px)", color:"white"
            }}>
                <Typography variant='h6'>{(searchParams.get("skills") === null) ?
                    "Click on the pills to learn more"
                    : searchParams.get("skills")}</Typography>
                <Typography variant="body" sx={{ marginTop: 2 , color:"Gainsboro"}}>
                    {((searchParams.get("skills") === null) || (data === null)) ? "" :
                        find(data, searchParams.get("skills"))}
                </Typography>
            </CardContent>
        </Card>
    )
}