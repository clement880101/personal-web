import { useState } from "react";
import {
    Card, Box, CardContent, CardMedia, Skeleton, Typography,
    Collapse, CardActions, Button, Chip, CardActionArea
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ProjectCard({ doc }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = function () {
        setExpanded(!expanded);
    }

    return (
        <Box>
            <Card sx={{ width: 300, margin: 1, borderRadius: 4, transitionDuration: '1s' }}>
                <Box sx={{ position: 'relative' }}>
                    {
                        (doc !== null) ? <CardMedia component="img" height="200"
                            image={require("../assets/preview/" + doc[1].Image)} />
                            : <Skeleton variant="rectangular" sx={{ height: 200 }} />
                    }
                    <CardActionArea sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.70)', color: 'white', padding: 2, display:"flex",
                        flexDirection:"row"
                    }} onClick={()=>{handleExpandClick()}} disableRipple>

                        <Typography variant="h6" sx={{flexGrow:1}}>{(doc !== null) ? doc[1].Title : <Skeleton />}</Typography>
                        {(expanded) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </CardActionArea>
                </Box>



                <Collapse in={expanded} timeout="auto">
                    <CardContent>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap", marginBottom: 3 }}>
                            {(doc !== null) ? doc[1].Tags.map((item) => <Chip
                                onClick={() => { if (item !== "N/A") { navigate({ pathname: "/about", search: "?skills=" + item }) } }}
                                label={item} />) : <Box />}
                        </Box>
                        <Typography>{(doc !== null) ? doc[1].Desc : <Skeleton />}</Typography>
                    </CardContent>
                    <CardActions sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                        {(doc !== null) ? <Button size="small" href={doc[1].Link}>
                            See More
                        </Button> : <Skeleton />
                        }
                    </CardActions>
                </Collapse>
            </Card>
        </Box>
    )
}