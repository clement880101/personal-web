import { useEffect, useState } from "react"
import {
    Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator,
    TimelineDot, TimelineConnector, TimelineContent
} from "@mui/lab"
import { Box } from "@mui/system"
import { Skeleton } from '@mui/material'
import { getExperiences } from "../api/firebaseApi"
import ExpCard from "./ExpCard"


export default function ExpTimeline({ mobile }) {
    const limit = 3
    const [exp, setExp] = useState(Array(limit).fill(null))
    const format = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' })

    useEffect(() => {
        getExperiences(limit).then((document) => {
            // Replace with error banner
            document[0] ? setExp(document[1]) : console.log(document[1])
        })
    }, [])

    return (
        <Timeline>
            {
                exp.map((doc, index) =>
                    <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{ transform: "translateY(50%)" }}>
                            {(doc !== null) ? format.format(doc[1].From.seconds * 1000) :
                                <Box sx={{display:"flex", flexDirection:"column", alignItems:"end"}}>
                                    <Skeleton width={30} height={25}/>
                                    <Skeleton width={40} height={25}/>
                                </Box>
                            }
                        </TimelineOppositeContent>
                        <TimelineSeparator sx={{ transform: "translateY(50%)" }} >
                            <TimelineDot />
                            {
                                (index === exp.length - 1) ?
                                    <div />
                                    : <TimelineConnector />
                            }
                        </TimelineSeparator>
                        <TimelineContent>
                            <ExpCard doc={doc} mobile={mobile} />
                        </TimelineContent>
                    </TimelineItem>
                )
            }
            <TimelineConnector />
        </Timeline>
    )
}