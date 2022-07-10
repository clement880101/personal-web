import { Card, CardContent, Typography } from "@mui/material"

export default function SkillCard({title}){
    return(
        <Card sx={{width:300, height:400, borderRadius:4}}>
            <CardContent>
                <Typography>{title}</Typography>
                <Typography>I know these languages</Typography>
                <Typography>Things that I am skilled in</Typography>
            </CardContent>
        </Card>
    )
}