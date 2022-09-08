import { useHits } from 'react-instantsearch-hooks-web';
import { Grid, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import ArticleCard from "./ArticleCard";

export default function ArticleSearch(props) {
    const [article, setArticle] = useState(Array(6).fill(null))
    const { hits } = useHits(props);

    useEffect(()=>{
        setArticle(hits)
    }, [hits])

    if (article.length === 0){
        return (
            <Box sx={{width:"100%", height:"60vh", display:"flex", flexDirection: "column", 
            alignItems:"center", justifyContent:"center"}}>
                <ArticleIcon sx={{fontSize:60}}/>
                <Typography variant="h5">No Results</Typography>
            </Box>
        )
    }else if (props.mobile) {
        return (
            article.map((doc) => <ArticleCard doc={(doc === null)? doc:[doc.objectID, doc]}/>)
        )
    } else {
        return (
            <Grid container sx={{ wrap: "wrap" }}>
                {article.map((doc) =>
                    <Grid item xs={"auto"}>
                        <ArticleCard doc={(doc === null)? doc:[doc.objectID, doc]}/>
                    </Grid>
                )}
            </Grid>
        )
    }
}