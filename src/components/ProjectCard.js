import { useState, useEffect } from "react";
import {
    Card, Box, CardMedia, Skeleton, Typography,
    Button, Chip, CardActionArea, Dialog, DialogTitle,
    IconButton, DialogContent, DialogActions
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../api/firebaseConfig"

export default function ProjectCard({ doc }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(undefined);
    const [loading, setLoading] = useState(true)

    const handleClick = function () {
        setOpen(!open);
    }

    useEffect(() => {
        if (doc !== null) {
            getDownloadURL(ref(storage, 'gs://personalwebsite-4b72f.appspot.com/project/' +
                doc[1].Image)).then((url) => {
                    setImageUrl(url);
                });

        }
    }, [doc])

    return (
        <Card sx={{ borderRadius: 4}}>
            <CardActionArea onClick={() => { handleClick() }} sx={{ position: 'relative' }}>
                <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
                    {
                        (loading) && <Skeleton variant="rectangular" sx={{ height: "100%", width: "100%" }} />
                    }
                    <CardMedia sx={{ width: "100%", height: "100%" }} component="img"
                        image={imageUrl} onLoad={() => { setLoading(false) }} />
                </Box>
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: "100%",
                    background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1))',
                    color: 'white', padding: 2, display: "flex",
                    flexDirection: "column", justifyContent: "flex-end"
                }} disableRipple>

                    <Typography variant="h6">{
                        (doc !== null) ? doc[1].Title : <Skeleton />
                    }</Typography>
                </Box>
            </CardActionArea>
            <Dialog onClose={handleClick} open={open} PaperProps={{ style: { borderRadius: 30 } }}>
                <DialogTitle sx={{ position: "relative", padding: 0 }}>
                    <Box sx={{ height: 150, width: "100%", overflow: "hidden" }}>
                        {
                            (loading) && <Skeleton variant="rectangular" sx={{ height: "100%", width: "100%" }} />
                        }
                        <CardMedia sx={{ width: "100%", height: "100%" }} component="img"
                            image={imageUrl} onLoad={() => { setLoading(false) }} />
                    </Box>
                    <Box sx={{
                        position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.50)", color: "white", padding: 3, display: "flex",
                        flexDirection: "row", alignItems: "center"
                    }} >
                        <Typography variant="h5">{(doc !== null) ? doc[1].Name : <Skeleton />}</Typography>
                    </Box>
                    <IconButton sx={{ position: "absolute", top: 3, right: 3 }} onClick={handleClick}>
                        <CloseIcon sx={{ fontSize: 30, color: "white" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" sx={{ marginTop: 3 }}>
                        {(doc !== null) ? doc[1].Title : <Skeleton />}
                    </Typography>
                    <Box sx={{
                        display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap",
                        marginY: 1
                    }}> {(doc !== null) ? doc[1].Tags.map((item) => <Chip
                        label={item} key={item}
                        onClick={() => {
                            if (item !== "N/A") {
                                navigate({ pathname: "/about", search: "?skills=" + item })
                            }
                        }} />) : <Box />}
                    </Box>
                    <Typography color="text.secondary" variant="body2">
                        {(doc !== null) ? doc[1].Desc : <Skeleton />}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ marginRight: 2, marginBottom: 1 }}>
                    {(doc !== null) ?
                        <Button size="small" variant="contained" href={doc[1].Link}>
                            See More
                        </Button>
                        : <Skeleton />
                    }
                </DialogActions>
            </Dialog>
        </Card>

    )
}