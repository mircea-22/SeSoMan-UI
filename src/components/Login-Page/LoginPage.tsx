import React, { useEffect, useState } from "react";
import "./LoginPage.css"
import { Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import bitmedia from '../assets/bitmedia.jpg';
import karriereassistant from '../assets/SchuelerkarriereLogo.jpg';
import { useHistory } from 'react-router-dom';

export const LoginPage = () =>{
    const url: {service: string} = useParams();
    const [img, setImg] = useState<string>();
    const [text, setText] = useState<any>();
    const history = useHistory();

    const handleClick = () => {
        history.push('/privacy-notice');
    };

    useEffect(()=>{
        if(url.service === 'bitmedia_mit'){
            setImg(bitmedia);
            setText('Do you want to continue?');
        }else if(url.service === 'karriereassistant'){
            setImg(karriereassistant);
            setText(karriereStatement());
        }
    })

    const karriereStatement = () =>{
        return(
            <div>
                <p>
                Schülerkarriere doesn’t know you yet!
                </p>
                <p>
                If you authorize logging in with your SeSoMan account, Schülerkarriere can recognize you next time you login.
                </p>
                <p>
                Schülerkarriere can also contact you if some functions of the service you use require your consent.
                </p>
                <p>
                Do you agree to proceed with SeSoMan login?
                </p>
            </div>
        )
    }


    return(
        <div className="login-wrapper">
            <div className="hint-section">
                    <Typography   fontSize={16}> 
                        You are about to login with your SeSoMan account to the following service
                    </Typography>

                    <img className='service_logo' src={img}/>

                    <Typography className="q-mark" fontSize={16}>
                        {text}
                    </Typography>
                <div className='btn-container'>
                    <Button onClick={handleClick} className="yes-btn" size="small" variant="contained">Yes</Button>
                    <Button className="no-btn" size="small" variant="outlined">No</Button>
                </div>
            </div>
           
        </div>
    );
}