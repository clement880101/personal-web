import { useEffect, useState } from "react"
import {
    Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator,
    TimelineDot, TimelineConnector, TimelineContent, Skeleton
} from "@mui/lab"
import { getExperiences } from "../api/firebaseApi"
import ExpCard from "./ExpCard"


export default function ExpTimeline() {
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
                exp.map((doc, i) =>
                    <TimelineItem>
                        <TimelineOppositeContent sx={{ transform: "translateY(50%)" }}>
                            {(doc !== null) ? format.format(doc[1].From.seconds * 1000) : <Skeleton width={70}/>}
                        </TimelineOppositeContent>
                        <TimelineSeparator sx={{ transform: "translateY(50%)" }} >
                            <TimelineDot />
                            {
                                (i === exp.length - 1)?
                                    <div/>
                                    : <TimelineConnector/>
                            }
                        </TimelineSeparator>
                        <TimelineContent>
                            <ExpCard doc={doc} />
                        </TimelineContent>
                    </TimelineItem>
                )
            }
            <TimelineConnector />
        </Timeline>
    )
}