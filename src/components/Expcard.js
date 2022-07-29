import { useState } from "react";
import { Card, Box, CardContent, CardMedia, IconButton, Skeleton, Typography, 
    Collapse, CardActions, Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ExpCard(doc){
    const [expanded, setExpanded] = useState(false);
    const format = new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit'})

    const handleExpandClick = function() {
        setExpanded(!expanded);
    }

    return(
        <Card sx={{ width: 300, margin:1, borderRadius:4, height:(expanded)? "auto": 200}}>
            {
                (doc.doc !== null) ? <CardMedia component="img" height="140" 
                image={require("../assets/"+doc.doc[1].Image)}/>
                : <Skeleton variant="rectangular" sx={{height:140}}/>
            }
            <Box sx={{width:"100%", display:"flex", flexDirection:"row"}}>
                <CardContent sx={{flexGrow:4}}>
                    <Typography variant="h6">{(doc.doc !== null) ? doc.doc[1].Name: <Skeleton/>}</Typography>
                </CardContent>
                <IconButton onClick={handleExpandClick} disableRipple >
                    {(expanded) ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>
            </Box>
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                <Typography>{(doc.doc !== null) ? doc.doc[1].Title : <Skeleton/>}</Typography>
                    <Typography>{(doc.doc !== null) ? doc.doc[1].Location: <Skeleton/>}</Typography>
                    <Typography>{(doc.doc !== null) ? format.format(doc.doc[1].From.seconds * 1000): <Skeleton/>}</Typography>
                    <Typography>{(doc.doc !== null) ? format.format(doc.doc[1].To.seconds * 1000): <Skeleton/>}</Typography>
                    <Typography>{(doc.doc !== null) ? doc.doc[1].Desc: <Skeleton/>}</Typography>
                </CardContent>
                <CardActions sx={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                    {(doc.doc !== null) ? <Button size="small" variant="contained" href={doc.doc[1].Link}>Website</Button> 
                    : <Skeleton/>
                    }
                </CardActions>
            </Collapse>
        </Card>
    )
}