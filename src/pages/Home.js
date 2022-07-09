import { Box, Typography, Link, Button} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getArticleList, getProjectList } from "../api/firebaseApi.js"
import ArticleCard from "../components/ArticleCard";
import OtherBtn from "../components/OtherBtn.js";
import ProjectCard from "../components/ProjectCard.js";


export default function Home() {
    const  navigate = useNavigate()
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
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", paddingX: 5}}>
            <Box sx={{height: "50vh", display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", padding: 5}}>
                <Typography variant="h4">Hi, I'm Clement Chang</Typography>
                <Typography variant="h5">I'm a DevOps & a Fullstack Engineer based in the Bay Area</Typography>
                <Typography variant="body1">This is a website where I share my thoughts on the world and showcase what I have accomplished</Typography>
                <Typography variant="body2">Feel free to <Link href="/contact">contact</Link> me if you want to connect, exchange ideas, or grab some coffee</Typography>
            </Box>

            <Typography variant="h4">Articles</Typography>
            <Box sx={{flexWrap:"wrap", flexDirection:"row", display:"flex", justifyContent:"center"}}>
                {article.map((doc) => <ArticleCard doc={doc}/>)}
                <OtherBtn page="articles"/>
            </Box>
            
            <Box sx={{height: "30vh", display: "flex", flexDirection: "row", alignItems: "center",
                justifyContent: "center", padding: 5}}>
                <Typography variant="h6">if you like what you are seeing here, take a look at these </Typography>
                <Button variant="contained" size="small" disableTouchRipple sx={{ borderRadius: 10, margin:1}}
                    onClick={() => { navigate("/about") }}>About</Button>
                <Button variant="contained" size="small" disableTouchRipple sx={{ borderRadius: 10, margin:1}}
                    onClick={() => { navigate("/contact") }}>Contact</Button>
            </Box>

            <Typography variant="h4">Projects</Typography>
            <Box sx={{flexWrap:"wrap", flexDirection:"row", display:"flex", justifyContent:"center"}}>
                {project.map((doc) => <ProjectCard doc={doc}/>)}
                <OtherBtn page="projects"/>
            </Box>
        </Box>
    )
}