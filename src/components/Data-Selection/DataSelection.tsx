import {  Button, Checkbox,  Divider,  FormControlLabel, FormGroup,Typography } from "@mui/material";
import React, {useEffect, useState } from "react";
import "./DataSelection.css";
import resources from "./../../Resources.json";
import axios from "axios";
import * as jose from 'jose';
import { API_URL } from '../../config';




export const DataSelection = () =>{
    const [allowedData, setAllowedData] = useState<{}>({});
  
   
    const getProperyFromResouces = (prop: string) =>{
        var array : string[] = [];
        resources.consent_list.map((entry) =>{
            Object.entries(entry.data_category[prop as keyof typeof entry.data_category] || {}).forEach(([key,value]) =>{
                var str = value as string;
                array.push(str);
            });
        });
        return array;
    }
    
    const getBasicData = () =>{
        return getProperyFromResouces('stammdaten_fields');
    }

    const getGrades = () =>{
        return getProperyFromResouces('grades_fields');
    }

    const sendPost = async(jwt: string) =>{
        return axios.post('https://sesoman-backend.onrender.com/resource/add',{
            "JWT": jwt
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        });
    }

    const signJSON = async() =>{
        console.log(API_URL);
        const secret = new TextEncoder().encode(API_URL);
        const alg = 'HS256';
        const jwt = await new jose.SignJWT({
            "Sokrates_Credentials": {
                'JWT': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                "URL":"https://api.sokrates.at/get_data?....."
            },
            "Data_Selection":{
                allowedData
            }
        })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('https://sesoman-backend.onrender.com')
        .setAudience('Signed JSON for SK')
        .setExpirationTime('2h')
        .sign(secret);

        await sendPost(jwt);
    }

  
    return(
        <div className='info'>
            <Typography fontSize={20}>
                Please select which data you allow to transfer:
            </Typography>
            <div className='data-wrapper'>
                <div className='section-1'>
                    <Typography>
                        Basic Information
                    </Typography>
                    <div className='basic-data'>{
                        getBasicData().map((entry) =>
                            <FormGroup className="checkbox" >
                                <FormControlLabel className='checkbox'  control={<Checkbox value={entry} size="small" onChange={(event) =>{setAllowedData({...allowedData, [entry]: event.target.checked})}}/>} label={entry}  />
                            </FormGroup>
                        )}
                    </div>
                </div>
                <Divider className="divider" orientation="vertical" flexItem/>
                <div className='section-2'>
                    <Typography>
                        Grades
                    </Typography>
                    <div className='grades'>
                        {getGrades().map((entry) =>
                            <FormGroup className="checkbox">
                                <FormControlLabel className='checkbox'  control={<Checkbox size="small" onClick={() =>{console.log(entry)}}/>} label={entry}/>
                            </FormGroup>
                        )}
                    </div>
                </div>
            </div>
            <Button onClick={signJSON} size="small" variant="contained" className="transfer-btn">
                Transfer data
            </Button>
        </div> 
    );
}