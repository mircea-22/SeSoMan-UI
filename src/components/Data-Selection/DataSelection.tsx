import {  Button, Checkbox,  CircularProgress,  Divider,  FormControlLabel, FormGroup,Typography } from "@mui/material";
import React, {useEffect, useState } from "react";
import "./DataSelection.css";
import axios from "axios";
import * as jose from 'jose';
import { API_URL } from '../../config';
import { IRoutes } from "../../App";
import bitmedia from '../assets/bitmedia.jpg';
import karriereassistant from '../assets/SchuelerkarriereLogo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/pro-light-svg-icons";




export const DataSelection = (props: IRoutes) =>{
    const [allowedBasic, setAllowedBasic] = useState<string[]>([]);
    const [allowedGrades, setAllowedGrades] = useState<string[]>([]);
    const [data, setData] = useState<any>();
    
    const getDataStructure =  async() =>{
        try{
          var obj = await axios.get('https://merlot.sokrates-r3.test.eduapp.at/api/consent_descriptor');
          setData(obj.data);
        }catch(e){
          console.error(e);
        }
      };
    

    useEffect(() =>{
        props.setIndex(2);
        if(!data){
            getDataStructure();
        }
        
    })

    const getProperyFromResouces = (prop: string) =>{
        var array : [string, string][] = [];
        data?.consent_list.map((entry: any) =>{
            if(entry.data_category.categorie_name === prop){
                Object.entries(entry.data_category.fields).forEach(([key,value]) =>{
                    var key_str = key as string;
                    var value_str = value as string;
                    array.push([key_str, value_str]);
                });
            }
        });
        return array;
    }
    
    const getBasicData = () =>{
        return getProperyFromResouces('Stammdaten');
    }

    const getGrades = () =>{
        return getProperyFromResouces('Grades');
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
        const secret = new TextEncoder().encode(API_URL);
        const alg = 'HS256';
        const jwt = await new jose.SignJWT({
            "Sokrates_Credentials": {
                'JWT': data.callback.Bearer,
                "URL": data.callback.URL
            },
            "Data_Selection":{
                "Stammdaten": allowedBasic,
                "Grades": allowedGrades
            }
        })
        .setProtectedHeader({ alg })
        .setIssuer('https://sesoman-backend.onrender.com')
        .setAudience('Signed JSON for SK')
        .sign(secret);

        await sendPost(jwt);
        window.open(`https://karriereassistent.schuelerkarriere.de/auth/callback?token=${jwt}`, "_self")
    }

  
    return data == undefined ? <CircularProgress /> :(
        <div className='info'>
            <Typography className="title-match">
                We found a match!
            </Typography>
            <Typography>
                <div className='img-container'>
                    <img className='img_logo' src={bitmedia}/>
                    <FontAwesomeIcon color="#5a04bd" className="arrow-right" size={'7x'} icon={faArrowRight}/>
                    <img className='img_logo' src={karriereassistant}/>
                </div>
            </Typography>
            <Typography className='share-hint' fontSize={16}>
                Bitmedia can share the following data with Schuelerkarriere:
            </Typography>
            <div className='data-wrapper'>
                <div className='section-1'>
                    <Typography>
                        Basic Information
                    </Typography>
                    <div className='basic-data'>{
                        getBasicData().map((entry) =>
                            <FormGroup className="checkbox" >
                                <FormControlLabel className='checkbox'  control={<Checkbox size="small" onChange={() =>{setAllowedBasic([...allowedBasic, entry[0]])}}/>} label={entry[1]}  />
                            </FormGroup>
                        )}
                    </div>
                </div>
                <div className='section-2'>
                    <Typography>
                        Grades
                    </Typography>
                    <div className='grades'>
                        {getGrades().map((entry) =>
                            <FormGroup className="checkbox">
                                <FormControlLabel className='checkbox'  control={<Checkbox size="small" onChange={() =>{setAllowedGrades([...allowedGrades, entry[0]])}}/>} label={entry[1]}/>
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