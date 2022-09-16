import { useHits } from 'react-instantsearch-hooks-web';
import { Box, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import { useState, useEffect } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ArticleCard from "./ArticleCard";

export default function ArticleSearch(props) {
    const [article, setArticle] = useState(Array(6).fill(null))
    const { hits } = useHits(props);

    useEffect(() => {
        setArticle(hits)
    }, [hits])

    if (article.length === 0) {
        return (
            <Box sx={{
                width: "95vw", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", paddingTop: 10
            }}>
                <ArticleIcon sx={{ fontSize: 60 }} />
                <Typography variant="h5">No Results</Typography>
            </Box>
        )
    } else if (props.mobile) {
        return (
            article.map((doc) => <ArticleCard doc={(doc === null) ? doc : [doc.objectID, doc]} />)
        )
    } else {
        return (
            <Box sx={{ width: "95vw" }}>
                <Masonry columns={"auto"} spacing={2}>
                    {article.map((doc) =>
                        <ArticleCard doc={(doc === null) ? doc : [doc.objectID, doc]} />
                    )}
                </Masonry>
            </Box>
        )
    }
}