import { useEffect, useState } from "react";
import { Box, Skeleton, Typography, Card, CardActionArea, CardMedia } from "@mui/material";
import { getArticle } from "../../api/firebaseApi";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../../api/firebaseConfig"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/router";
import Head from "next/head";

export default function ArticlePage({ mobile }) {
    const [data, setData] = useState(null);
    const [title, setTitle] = useState(undefined);
    const [desc, setDesc] = useState(undefined);
    const [loading, setLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState(undefined);

    const router = useRouter()
    const { articleID } = router.query
    const format = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })

    useEffect(() => {
        getArticle(articleID).then((document) => {
            if (document[0]) {
                setData(document[1])
                setTitle(document[1].Title)
                setDesc(document[1].Subtitle)
            } else {
                router.push("/articles")
            }
        })
    }, [articleID]);

    useEffect(() => {
        if (data !== null) {
            getDownloadURL(ref(storage, 'gs://personalwebsite-4b72f.appspot.com/article/' +
                data.Image)).then((url) => {
                    setImageUrl(url);
                });
        }
    }, [data])

    return (
        <Box sx={{ paddingTop: 2, display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title + "|clementc.dev"} />
                <meta property="og:description" content={desc} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={"https://clementc.dev/articles/" + articleID} />
                <title>{title + "|clementc.dev"}</title>
            </Head>
            <Box sx={{minWidth:300, maxWidth:800, width:"80vw"}}>
                <Card variant="outlined" sx={{ width: 160, height: 60, borderRadius: 4 }}>
                    <CardActionArea sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "row" }}
                        onClick={() => { router.push("/articles") }}>
                        <ArrowBackIosNewIcon />
                        <Typography>
                            Back to Articles
                        </Typography>
                    </CardActionArea>
                </Card>
                <Card sx={{ height: 300, overflow: "hidden", marginY: 2, borderRadius: 4 }}>
                    {
                        (loading) && <Skeleton variant="rectangular" height="100%" width="100%" />

                    }
                    <CardMedia sx={{ width: "100%", height: "100%" }} component="img"
                        image={imageUrl} onLoad={() => { setLoading(false) }} />
                </Card>
                <Typography variant={(mobile) ? "h4" : "h3"} sx={{ marginTop: 2 }}>
                    {(data === null) ? <Skeleton /> : title}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                    {(data === null) ? <Skeleton /> :
                        "Last Modified " + String(format.format(data.Date.seconds * 1000))}
                </Typography>
                <Typography color="text.secondary" sx={{ marginBottom: 5, marginTop: 2, fontStyle: 'italic' }}
                    variant="subtitle1">
                    {(data === null) ? <Skeleton /> : desc}
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
        </Box>
    )
}