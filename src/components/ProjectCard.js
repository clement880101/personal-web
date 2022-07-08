import { useState } from "react";
import { Card, Box, CardContent, CardMedia, IconButton, Skeleton, Typography, 
    Collapse, CardActions, Button, Chip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ProjectCard(doc){
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = function() {
        setExpanded(!expanded);
    }

    return(
        <Card sx={{ width: 300, margin:1, borderRadius:4}}>
            {
                (doc.doc !== null) ? <CardMedia component="img" height="140" 
                image={require("../assets/preview/"+doc.doc[1].Image)}/>
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
                    <Typography>{(doc.doc !== null) ? "Tech Used": <Skeleton/>}</Typography>
                    <Box sx={{display:"flex", flexDirection:"row", gap:1, flexWrap:"wrap", marginBottom:3}}>
                        {(doc.doc !== null) ? doc.doc[1].Tags.map((item)=> <Chip label={item}/>) : <Box/>}
                    </Box>
                    <Typography>{(doc.doc !== null) ? doc.doc[1].Desc: <Skeleton/>}</Typography>
                </CardContent>
                <CardActions sx={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                    {(doc.doc !== null) ? <Button size="small" href={doc.doc[1].Link}>
                            See More
                        </Button> : <Skeleton/>
                    }
                </CardActions>
            </Collapse>
        </Card>
    )
}