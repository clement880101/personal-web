import { useEffect, useState } from "react";
import { Box, Skeleton, Typography, Card, CardActionArea, CardMedia, Toolbar } from "@mui/material";
import { getArticle } from "../../api/firebaseApi";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../../api/firebaseConfig"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/router";
import Head from "next/head";

export default function ArticlePage(props) {
    const { data = null } = props
    const [loading, setLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState(undefined);

    const router = useRouter()

    return (
        <Box sx={{ paddingTop: 2, display: "flex", flexDirection: "row", justifyContent: "center" }}>
            {
                (!router.isFallback) && <>
                    <Head>
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={data.doc.Title + " | clementc.dev"} />
                        <meta property="og:description" content={data.doc.Desc} />
                        <meta property="og:image" content={data.doc.Image} />
                        <meta property="og:url" content={"https://clementc.dev/articles/" + data.id} />
                        <title>{data.doc.Title + " | clementc.dev"}</title>
                        <meta name="description" content={data.doc.Desc} />
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta property="twitter:domain" content="clementc.dev" />
                        <meta property="twitter:url" content={"https://clementc.dev/articles/" + data.id} />
                        <meta name="twitter:title" content={data.doc.Title + " | clementc.dev"} />
                        <meta name="twitter:description" content={data.doc.Desc} />
                        <meta name="twitter:image" content={data.doc.Image} />
                    </Head>
                </>
            }

            <Box sx={{ minWidth: 300, maxWidth: 800, width: "80vw" }}>
                <Toolbar />
                <Card variant="outlined" sx={{ width: 160, height: 60, borderRadius: 4 }}>
                    <CardActionArea sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "row" }}
                        onClick={() => { router.push("/articles", undefined, { scroll: false }) }}>
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
                    {
                        (!router.isFallback) && <CardMedia sx={{ width: "100%", height: "100%" }} component="img"
                            image={data.doc.Image} onLoad={() => { setLoading(false) }} />
                    }
                </Card>
                <Typography variant={"h3"} sx={{ marginTop: 2 }}>
                    {(data === null) ? <Skeleton /> : data.doc.Title}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                    {(data === null) ? <Skeleton /> :
                        "Last Modified " + data.doc.Date}
                </Typography>
                <Typography color="text.secondary" sx={{ marginBottom: 5, marginTop: 2, fontStyle: 'italic' }}
                    variant="subtitle1">
                    {(data === null) ? <Skeleton /> : data.doc.Desc}
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
                    <div dangerouslySetInnerHTML={{ __html: data.doc.Content }} />
                }
            </Box>
        </Box>
    )
}

export async function getStaticProps({ params }) {
    var data = null
    const document = await getArticle(`${params.articleID}`)
    if (document.success) {
        data = document.data
    } else {
        return {
            redirect: {
                destination: "/404",
            },
        }
    }

    return {
        props: {
            data,
        },
        revalidate: 432000,
    }
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { articleID: '8j6u5yw7Rn06sZ8XFFtr' } },
        { params: { articleID: 'KvCX1GBZvwmHKyWMml3m' } },
        { params: { articleID: 'l4OZm6YxYmOi5H7wCAeM' } }],
        fallback: true,
    };
}