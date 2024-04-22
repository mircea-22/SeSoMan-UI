import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { CardT } from "./CardT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/pro-light-svg-icons";
import { Box, Button, Divider, Modal, Paper, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import bitmedia from '../assets/sokrates.png';
import karriereassistant from '../assets/SchuelerkarriereLogo.jpg';


export const Dashboard = (props: any) =>{
    const [open, setOpen] = useState<boolean[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [target, setTarget] = useState<string>('');
    const [consumer, setConsumer] = useState<string>('')
  
   
    const getTokens = async() =>{
      try{
        var obj = await axios.post('https://sesoman-backend.onrender.com/resource/view/all', {headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }});
        getDataFromTokens(obj.data)
      }catch(e){
        console.error(e);
      }
    }

    async function decodeToken(token: string) {
      try {
        const decodedToken = jwtDecode(token)
        return decodedToken; // Return the decoded payload
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }

    const getDataFromTokens = async(tokens: any) =>{
      var new_data : any[] = [];
      var openStates: boolean[] = [];
      var iterator = 0;
      while(iterator < tokens.length){
          var obj = await decodeToken(tokens[iterator].jwt);
          new_data.push(obj);
          openStates.push(false);
          iterator = iterator + 1;
      }
      setData(new_data);
      setOpen(openStates);
    }

    const setOpenAtIndex = (val: number) => {
      setOpen(prevState => {
          const newState = [...prevState]; // Create a copy of the state array
          newState[val] = !newState[val]; // Modify the value at index 55
          return newState; // Set the state with the updated array
      });
  };

  function capitalizeFirstLetter(word: string): string {
    // Convert the word to lowercase
    const lowercasedWord = word.toLowerCase();
    
    // Capitalize the first letter and concatenate with the rest of the word
    const capitalizedWord = lowercasedWord.charAt(0).toUpperCase() + lowercasedWord.slice(1);
    
    return capitalizedWord;
  }


    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
    };

    useEffect(() =>{
      props.setShow(false)
      getTokens();
    },[]);

  



    return(
        <div className='timeline-wrapper'>
          <Typography className="dash-title" variant="h6">Dashboard</Typography>
            <div style={{position: 'relative', top: '20px'}}>
             <Timeline>
             {data.map((obj: any) =>
             <div key={data.indexOf(obj)} style={{ position: 'relative', left: '-4%'}}>
             <Typography className='timeline-title' fontSize={18}>{obj.Date}</Typography>
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className='card-wrapper'>
                        <CardT
                            title={obj.Target_Service}
                            subtitle='Learning Management System'
                            image={bitmedia}
                        />
                        <Paper onClick={() =>{
                          setOpenAtIndex(data.indexOf(obj));
                          setTarget(obj.Target_Service);
                          setConsumer(obj.Calling_Service);
                          
                          }} 
                          className="paper-container">
                            <FontAwesomeIcon color="#D3D3D3" icon={faLongArrowAltRight} size='5x' />
                            <Typography>Data Transfer</Typography>
                        </Paper>
                        
                        <CardT
                            title={obj.Calling_Service}
                            subtitle='Learning Management System'
                            image={karriereassistant}
                        />
                    </div>
                  </TimelineContent>
                  <div>
                    <Modal
                      open={open[data.indexOf(obj)]}
                      onClose={() => setOpenAtIndex(data.indexOf(obj))}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box sx={{...style,  width: 400 }}>
                        <h2 id="parent-modal-title">Consent Receipt</h2>
                        <div>
                          <div style={{display: 'flex', alignItems: 'center'}}><Typography sx={{marginRight: '2px'}} fontSize={15}><b>Provider:</b></Typography><Typography fontSize={14}>{target}</Typography></div>
                          <div style={{display: 'flex', alignItems: 'center'}}><Typography sx={{marginRight: '2px'}} fontSize={15}><b>Consumer:</b></Typography><Typography fontSize={14}> {consumer}</Typography></div>
                          <Typography sx={{position: 'relative', top: '15px'}} fontSize={15}><b>You provided this data:</b></Typography>
                          <Typography sx={{position: 'relative', top: '20px'}} fontSize={14}><b>Legal Base:</b> Consent</Typography>
                          <Typography sx={{position: 'relative', top: '20px'}} fontSize={14}><b>Status:</b> Allowed</Typography>
                          <div style={{position: 'relative', top: '35px'}}>
                            <Typography fontSize={14}><b>Basic Information</b></Typography>
                            <ul style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                            {obj.Data_Selection.Stammdaten.map((entry: string) =>
                            <li key={entry}><Typography fontSize={13}>
                            {capitalizeFirstLetter(entry)}
                            </Typography></li>
                            )}
                            </ul>
                          </div>
                          <div style={{position: 'relative', top: '25px'}}>
                          {obj.Data_Selection.Grades && <Typography fontSize={14}><b>Grades</b></Typography>}
                            <ul style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                            {obj.Data_Selection.Grades.map((entry: string) =>
                            <li key={entry}><Typography fontSize={13}>
                            {capitalizeFirstLetter(entry)}
                            </Typography></li>
                            )}
                            </ul>
                          </div>
                        </div>
                        <div style={{position: 'relative', bottom: '0', display: 'flex', justifyContent: 'flex-start', marginTop: '40px'}}>
                          <Button sx={{marginRight: '5px'}} size='small' variant="contained">Revoke consent</Button>
                          <Button size='small' variant="contained">Download</Button>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </TimelineItem>
                </div>)}
            </Timeline>
            </div>
        </div>
    )
}