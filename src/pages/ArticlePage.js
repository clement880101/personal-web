import { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { getArticle } from "../api/firebaseApi";
import { useNavigate, useParams } from "react-router-dom";



export default function ArticlePage({match}) {
    const [data, setData] = useState(null);

    const navigate = useNavigate();
    const {articleID} = useParams()
    const format = new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit'})

    useEffect(() => {
        getArticle(articleID).then((document)=>{
            if(document[0]){
                setData(document[1])
            }else{
                navigate("/articles")
            }
        })
    }, []);

   
    return(
        <Box>
            <Typography>{(data === null) ? <Skeleton/> : data.Title}</Typography>
            <Typography>{(data === null) ? <Skeleton/> : format.format(data.Date.seconds * 1000)}</Typography>
            <Typography>{(data === null) ? <Skeleton/> : data.Subtitle}</Typography>
            <Typography>{(data === null) ? <Skeleton/> : data.Content.replaceAll("\\n", "\n")}</Typography>
        </Box>
    )
}