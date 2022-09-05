import { useState } from "react";
import {
    Card, Box, CardContent, CardMedia, IconButton, Skeleton, Typography,
    Collapse, CardActions, Button, Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ProjectCard({doc}) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = function () {
        setExpanded(!expanded);
    }

    return (
        <Box>
            <Card sx={{ width: 300, margin: 1, borderRadius: 4, transitionDuration: '1s' }}>
                {
                    (doc !== null) ? <CardMedia component="img" height="140"
                        image={require("../assets/preview/" + doc[1].Image)} />
                        : <Skeleton variant="rectangular" sx={{ height: 140 }} />
                }
                <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                    <CardContent sx={{ flexGrow: 4 }}>
                        <Typography variant="h6">{(doc !== null) ? doc[1].Title : <Skeleton />}</Typography>
                    </CardContent>
                    <IconButton onClick={handleExpandClick} disableRipple >
                        {(expanded) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
                <Collapse in={expanded} timeout="auto">
                    <CardContent>
                        <Typography>{(doc !== null) ? "Tech Used" : <Skeleton />}</Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap", marginBottom: 3 }}>
                            {(doc !== null) ? doc[1].Tags.map((item) => <Chip
                                onClick={() => { if(item !== "N/A"){navigate({ pathname: "/about", search: "?skills=" + item })} }}
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