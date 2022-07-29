import { Typography, Box} from "@mui/material"
import { useState, useEffect } from "react"
import { getArticleList } from "../api/firebaseApi"
import ArticleCard from "../components/ArticleCard"

export default function Articles(){
    const [artlim, setArtlim] = useState(30)
    const [article, setArticle] = useState(Array(artlim).fill(null))

    useEffect(()=>{
        getArticleList(artlim).then((document)=>{
            // Replace with error banner
            document[0] ? setArticle(document[1]) : console.log(document[1])
        })

    }, [artlim])

    return(
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", paddingX: 5}}>
            <Typography sx={{padding:10}} variant="h4">Articles</Typography>
            <Box sx={{flexWrap:"wrap", flexDirection:"row", display:"flex", justifyContent:"center"}}>
                {article.map((doc) => <ArticleCard doc={doc}/>)}
            </Box>
        </Box>
    )
}