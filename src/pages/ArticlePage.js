import { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { getArticle } from "../api/firebaseApi";
import { useNavigate, useParams } from "react-router-dom";


export default function ArticlePage() {
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
        <Box sx={{ paddingX: "20%", paddingY: 5 }}>
            <Typography variant="h4">{(data === null) ? <Skeleton /> : data.Title}</Typography>
            <Typography variant="subtitle2">{(data === null) ? <Skeleton /> : format.format(data.Date.seconds * 1000)}</Typography>
            <Typography sx={{ marginY: 3 }} variant="subtitle1">{(data === null) ? <Skeleton /> : data.Subtitle}</Typography>
            {(data === null) ? <Skeleton /> :
                <div dangerouslySetInnerHTML={{__html: data.Content.replaceAll("\\n", "\n")}} />
            }
        </Box>
    )
}