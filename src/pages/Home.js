import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getArticleList, getProjectList } from "../api/firebaseApi.js"
import ArticleCard from "../components/ArticleCard";
import OtherBtn from "../components/OtherBtn.js";
import ProjectCard from "../components/ProjectCard.js";


export default function Home() {
    const [artlim, setArtlim] = useState(5)
    const [article, setArticle] = useState(Array(artlim).fill(null))

    const [projlim, setProjlim] = useState(5)
    const [project, setProject] = useState(Array(projlim).fill(null))

    function handleResize() {
        setArtlim(2 * ~~((window.innerWidth - 10) / 302) - 1)
        setProjlim(2 * ~~((window.innerWidth - 10) / 302) - 1)
    }

    useEffect(() => {      
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    },[])

    useEffect(()=>{
        getArticleList(artlim).then((document)=>{
            // Replace with error banner
            document[0] ? setArticle(document[1]) : console.log(document[1])
        })

        getProjectList(projlim).then((document)=>{
            // Replace with error banner
            document[0] ? setProject(document[1]) : console.log(document[1])
        })

    }, [artlim, projlim])

    return(
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", padding: 5}}>
            <Typography variant="h4">Articles</Typography>
            <Box sx={{flexWrap:"wrap", flexDirection:"row", display:"flex", justifyContent:"center"}}>
                {article.map((doc) => <ArticleCard doc={doc}/>)}
                <OtherBtn page="articles"/>
            </Box>

            <Typography variant="h4">Projects</Typography>
            <Box sx={{flexWrap:"wrap", flexDirection:"row", display:"flex", justifyContent:"center"}}>
                {project.map((doc) => <ProjectCard doc={doc}/>)}
                <OtherBtn page="projects"/>
            </Box>
        </Box>
    )
}