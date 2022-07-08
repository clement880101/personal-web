import { useState } from "react";
import { Card, Box, CardContent, CardMedia, IconButton, Skeleton, Typography, 
    Collapse, CardActions, Button, Chip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import checksumnft from "../assets/preview/checksumnft.PNG"

export default function ProjectCard(doc){
    const [expanded, setExpanded] = useState(false);
    const format = new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit'})

    const handleExpandClick = function() {
        setExpanded(!expanded);
    }

    return(
        <Card sx={{ width: 300, margin:1, borderRadius:4}}>
            {
                (doc.doc !== null) ? <CardMedia component="img" height="140" image={checksumnft}/>
                : <Skeleton variant="rectangular" sx={{height:140}}/>
            }
            <Box sx={{width:"100%", display:"flex", flexDirection:"row"}}>
                <CardContent sx={{flexGrow:4}}>
                    <Typography variant="h6">{(doc.doc !== null) ? doc.doc[1].Title: <Skeleton/>}</Typography>
                </CardContent>
                <IconButton onClick={handleExpandClick} disableRipple >
                    {(expanded) ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>
            </Box>
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    <Typography>{(doc.doc !== null) ? format.format(doc.doc[1].Date.seconds * 1000): <Skeleton/>}</Typography>
                    <Typography>{(doc.doc !== null) ? doc.doc[1].Desc: <Skeleton/>}</Typography>
                </CardContent>
                <CardActions sx={{width:"100%", display:"flex", flexDirection:"row"}}>
                    <Box sx={{flexGrow:4}}>
                    {
                        (doc.doc !== null) ? doc.doc[1].Tags.map((item)=> <Chip label="test" size="small"/>) 
                        : <Box/>
                    }
                    </Box>
                    <Button href={doc.doc[1].Link}>See More</Button>
                </CardActions>
            </Collapse>
        </Card>
    )
}