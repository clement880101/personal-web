import { useState } from "react";
import {
    Card, Box, DialogContent, CardMedia, Skeleton, Typography, Button,
    Dialog, CardActionArea, DialogTitle, DialogActions, IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function ExpCard({ doc, mobile }) {
    const [open, setOpen] = useState(false);
    const format = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    const handleClick = function () {
        setOpen(!open);
    }

    return (
        <Box>
            <Card sx={{ width: (mobile)? 250:290, margin: 1, borderRadius: 4 }}>
                <CardActionArea onClick={handleClick} sx={{ position: 'relative' }}>
                    {
                        (doc !== null) ? <CardMedia component="img" sx={{ height: 150 }}
                            image={require("../assets/" + doc[1].Image)} />
                            : <Skeleton variant="rectangular" sx={{ height: 150 }} />
                    }
                    <Box sx={{
                        position: 'absolute', bottom: 0, left: 0, width: '100%',
                        bgcolor: 'transparent', color: 'white', padding: 2,
                    }} >
                        <Typography variant="h6">{(doc !== null) ? doc[1].Name : <Skeleton />}</Typography>
                    </Box>
                </CardActionArea>
            </Card>
            <Dialog onClose={handleClick} open={open} PaperProps={{ style: { borderRadius: 30 } }}>
                <DialogTitle sx={{ position: "relative", padding: 0 }}>
                    {
                        (doc !== null) ? <CardMedia component="img" sx={{ height: 150 }}
                            image={require("../assets/" + doc[1].Image)} />
                            : <Skeleton variant="rectangular" sx={{ height: 150 }} />
                    }
                    <Box sx={{
                        position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.50)", color: "white", padding: 3, display: "flex",
                        flexDirection: "row", alignItems: "center"
                    }} >
                        <Typography variant="h5">{(doc !== null) ? doc[1].Name : <Skeleton />}</Typography>
                    </Box>
                    <IconButton sx={{ position: "absolute", top:3, right:3}} onClick={handleClick}>
                        <CloseIcon sx={{ fontSize: 30, color:"white"}} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" sx={{ marginTop: 3 }}>
                        {(doc !== null) ? doc[1].Title : <Skeleton />}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography variant="caption" sx={{ paddingRight: 2 }}>
                            {(doc !== null) ? doc[1].Location : <Skeleton />}
                        </Typography>
                        <Typography variant="caption">
                            {(doc !== null) ? format.format(doc[1].From.seconds * 1000) + "~" : <Skeleton />}
                        </Typography>
                        <Typography variant="caption">{(doc !== null) ?
                            ((doc[1].To === undefined) ? "Present" : format.format(doc[1].To.seconds * 1000))
                            : <Skeleton />}
                        </Typography>
                    </Box>
                    <Typography sx={{ marginY: 2 }} variant="body2">
                        {(doc !== null) ? doc[1].Exp : <Skeleton />}
                    </Typography>
                    <Typography variant="body2">
                        {(doc !== null) ? doc[1].Desc : <Skeleton />}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ marginRight: 2, marginBottom: 1 }}>
                    {(doc !== null) ?
                        <Button size="small" variant="contained" href={doc[1].Link}>
                            Website
                        </Button>
                        : <Skeleton />
                    }
                </DialogActions>
            </Dialog>
        </Box >
    )
}
