import { useEffect, useState } from "react";
import { Box, Skeleton, Typography, Card, CardActionArea } from "@mui/material";
import { getArticle } from "../api/firebaseApi";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function ArticlePage({ mobile }) {
    const [data, setData] = useState(null);

    const navigate = useNavigate();
    const { articleID } = useParams()
    const format = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })

    useEffect(() => {
        getArticle(articleID).then((document) => {
            if (document[0]) {
                setData(document[1])
            } else {
                navigate("/articles")
            }
        })
    }, [articleID, navigate]);


    return (
        <Box sx={{ paddingTop: 2 }} paddingX={(mobile) ? 2 : "20vw"}>
            <Card variant="outlined" sx={{ width: 200, height: 80, borderRadius: 4 }}>
                <CardActionArea sx={{ height: "100%", width: "100%", display:"flex", flexDirection:"row"}}
                    onClick={()=>{navigate("/articles")}}>
                    <ArrowBackIosNewIcon />
                    <Typography>
                        Back to Articles
                    </Typography>
                </CardActionArea>
            </Card>
            <Typography variant={(mobile) ? "h4" : "h3"} sx={{ marginBottom: 2, marginTop: 5 }}>
                {(data === null) ? <Skeleton /> : data.Title}
            </Typography>
            <Typography color="text.secondary" variant="subtitle2">
                {(data === null) ? <Skeleton /> : "Last Modified " + String(format.format(data.Date.seconds * 1000))}
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: 5, marginTop: 2, fontStyle: 'italic' }}
                variant="subtitle1">
                {(data === null) ? <Skeleton /> : data.Subtitle}
            </Typography>

            {(data === null) ? <Skeleton /> :
                <div dangerouslySetInnerHTML={{ __html: data.Content.replaceAll("\\n", "\n") }} />
            }
        </Box>
    )
}