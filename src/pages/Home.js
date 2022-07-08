import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getArticleList } from "../api/firebaseApi.js"
import ArticleCard from "../components/ArticleCard";

export default function Home() {
    const [limit, setLimit] = useState(4)
    const [doc, setDoc] = useState(Array(limit).fill(null))

    useEffect(()=>{
        getArticleList(limit).then((document)=>{
            // Replace with error banner
            document[0] ? setDoc(document[1]) : console.log(document[1])
        })
    }, [limit])

    return(
        <Box>
            {doc.map((doc) => <ArticleCard doc={doc}/>)}
        </Box>
    )
}