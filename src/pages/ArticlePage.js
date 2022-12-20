import { useEffect, useState } from "react";
import { Box, Skeleton, Typography, Card, CardActionArea } from "@mui/material";
import { getArticle } from "../api/firebaseApi";
import { useNavigate, useParams } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../api/firebaseConfig"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function ArticlePage({ mobile }) {
    const [data, setData] = useState(null);
    const [imageUrl, setImageUrl] = useState(undefined);

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

    useEffect(()=>{
        if (data !== null) {
            getDownloadURL(ref(storage, 'gs://personalwebsite-4b72f.appspot.com/article/' +
                data.Image)).then((url) => {
                    setImageUrl(url);
                });

        }
    }, [data])

    return (
        <Box sx={{ paddingTop: 2 }} paddingX={(mobile) ? 2 : "20vw"}>
            <Card variant="outlined" sx={{ width: 160, height: 60, borderRadius: 4 }}>
                <CardActionArea sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "row" }}
                    onClick={() => { navigate("/articles") }}>
                    <ArrowBackIosNewIcon />
                    <Typography>
                        Back to Articles
                    </Typography>
                </CardActionArea>
            </Card>
            <Card sx={{ height: 300, overflow: "hidden", marginY: 2, borderRadius: 4 }}>
                {
                    (data === null) ? <Skeleton variant="rectangular" sx={{ width: "100%" }} /> :
                        <Box component="img" sx={{ width: "100%" }}
                            src={imageUrl} />
                }
            </Card>
            <Typography variant={(mobile) ? "h4" : "h3"} sx={{ marginTop: 2 }}>
                {(data === null) ? <Skeleton /> : data.Title}
            </Typography>
            <Typography color="text.secondary" variant="subtitle2">
                {(data === null) ? <Skeleton /> : "Last Modified " + String(format.format(data.Date.seconds * 1000))}
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: 5, marginTop: 2, fontStyle: 'italic' }}
                variant="subtitle1">
                {(data === null) ? <Skeleton /> : data.Subtitle}
            </Typography>

            {(data === null) ?
                <Box sx={{ margin: 0, padding: 0 }}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </Box>
                :
                <div dangerouslySetInnerHTML={{ __html: data.Content }} />
            }
        </Box>
    )
}