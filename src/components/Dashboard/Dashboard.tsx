import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import React, { useEffect } from "react";
import "./Dashboard.css";
import { CardT } from "./CardT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/pro-light-svg-icons";
import { Paper, Typography } from "@mui/material";



export const Dashboard = (props: any) =>{

    useEffect(() =>{
      props.setShow(false)
    },[])


    return(
        <div className='timeline-wrapper'>
             <Timeline >
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    11:40 am
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className='card-wrapper'>
                        <CardT
                            title='Schuelerkarriere'
                            subtitle='Learning Management System'
                            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRnXtUhC7vKHlTwTnhhVe_0e5Ff7hfVHG0A9qJWCaQCQ&s'
                        />
                        <Paper className="paper-container">
                            <FontAwesomeIcon color="#D3D3D3" icon={faLongArrowAltRight} size='5x' />
                            <Typography>Data Transfer</Typography>
                        </Paper>
                        
                        <CardT
                            title='IMC'
                            subtitle='Learning Management System'
                            image='data:image/png;base64,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'
                        />
                    </div>
                  </TimelineContent>
                </TimelineItem>
            </Timeline>
        </div>
    )
}