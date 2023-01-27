import { useHits } from 'react-instantsearch-hooks-web';
import { Box, Typography, Grid } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ArticleCard from "./ArticleCard";

export default function ArticleSearch(props) {
    const articleRef = useRef()
    const [xs, setXs] = useState(3)
    const [article, setArticle] = useState(Array(12/xs).fill(null))
    const { hits } = useHits(props);

    useEffect(() => {
        setArticle(hits)
    }, [hits])

    function handleResize() {
        var col = Math.floor(articleRef.current.clientWidth / 290)
        if (col <= 0) {
            setXs(12)
        } else if (col > 12) {
            setXs(1)
        } else {
            setXs(Math.floor(12 / col))
        }
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (article.length === 0) {
        return (
            <Box sx={{
                width: "100%", display: "flex", flexDirection: "column", height:300,
                alignItems: "center", justifyContent: "center"
            }}>
                <ArticleIcon sx={{ fontSize: 60, transition: "color 1s ease-in-out"}} />
                <Typography variant="h5" sx={{transition: "color 1s ease-in-out"}}>No Results</Typography>
            </Box>
        )
    } else {
        return (

            <Grid container spacing={1} sx={{ width: "100%" }} ref={articleRef}>
                {
                    article.map((doc, index) =>
                        <Grid item xs={xs} key={index}>
                            <ArticleCard doc={(doc === null) ? doc : [doc.objectID, doc]} />
                        </Grid>
                    )
                }
            </Grid>
        )
    }
}