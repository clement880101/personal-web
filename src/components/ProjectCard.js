import { useState, useEffect } from "react";
import {
    Card, Box, CardMedia, Skeleton, Typography,
    Button, Chip, CardActionArea, Dialog, DialogTitle,
    IconButton, DialogContent, DialogActions
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../api/firebaseConfig"

export default function ProjectCard({ data }) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(undefined);
    const [loading, setLoading] = useState(true)

    const handleClick = function () {
        setOpen(!open);
    }

    useEffect(() => {
        if (data !== null) {
            getDownloadURL(ref(storage, 'gs://personalwebsite-4b72f.appspot.com/project/' +
                data.doc.Image)).then((url) => {
                    setImageUrl(url);
                });
        }
    }, [data])

    return (
        <Card sx={{ borderRadius: 4, transition:"background-color 1s ease-in-out"}}>
            <CardActionArea onClick={() => { handleClick() }} sx={{ position: 'relative'}}>
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
                }}>

                    <Typography variant="h6">{
                        (data !== null) ? data.doc.Title : <Skeleton />
                    }</Typography>
                </Box>
            </CardActionArea>
            <Dialog onClose={handleClick} open={open} 
                PaperProps={{ style: { borderRadius: 30, minWidth: 300, maxWidth: 600, 
                transition:"all 1s ease-in-out"} }}>
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
                        <Typography variant="h5">{(data !== null) ? data.doc.Name : 
                            <Skeleton width={300}/>}</Typography>
                    </Box>
                    <IconButton sx={{ position: "absolute", top: 3, right: 3 }} onClick={handleClick}>
                        <CloseIcon sx={{ fontSize: 30, color: "white" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" sx={{ marginTop: 3 }}>
                        {(data !== null) ? data.doc.Title : <Skeleton />}
                    </Typography>
                    <Box sx={{
                        display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap",
                        marginY: 1
                    }}> {(data !== null) ? data.doc.Tags.map((item) => <Chip
                        label={item} key={item}
                        onClick={() => {
                            if (item !== "N/A") {
                                router.push({ pathname: "/about", query:{skill:item,other:true}}, 
                                undefined, {scroll: false})
                            }
                        }} />) : <Box />}
                    </Box>
                    <Typography color="text.secondary" variant="body2">
                        {(data !== null) ? data.doc.Desc : <Skeleton />}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ marginRight: 2, marginBottom: 1 }}>
                    {(data !== null) ?
                        <Button size="small" variant="contained" href={data.doc.Link}>
                            See More
                        </Button>
                        : <Skeleton width={100}/>
                    }
                </DialogActions>
            </Dialog>
        </Card>

    )
}