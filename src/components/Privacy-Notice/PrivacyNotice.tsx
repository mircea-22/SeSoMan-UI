import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button,Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./PrivacyNotice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown, faClipboardList, faClipboardQuestion, faClock, faFileInvoice, faIdCard, faSitemap, faUserCheck } from "@fortawesome/pro-light-svg-icons";
import { faUserGroup } from "@fortawesome/pro-regular-svg-icons";
import { useHistory } from 'react-router-dom';
import { IRoutes } from "../../App";
import resources from './../../Resources.json';


export const PrivacyNotice = (props: IRoutes) => {
    
    useEffect(() =>{
        props.setIndex(1)
    },[]);


    const itemSpec = [
        'What is the legal basis for the data protection',
        'What information do we collect from you?',
        'Why do we collect this information?',
        'What do we do with your information?',
        'Who might we share your information with?',
        'How long do we keep hold of your information?',
        'How can I access the information you hold about me?',
        'How can I contact a person responsible for data protection at SeSoMan?',

    ];

    const icons= [
        faIdCard,
        faClipboardList,
        faClipboardQuestion,
        faUserGroup,
        faSitemap,
        faClock,
        faUserCheck,
        faFileInvoice
    ]

    const history = useHistory();

    const handleClick = () => {
        history.push('/data-selection');
    };

    return(
        <div className='privacy-struct'>
            <Typography variant="h6">
                Privacy Notice
            </Typography>
            <Typography fontSize={16} className="info-msg">
                Details of what information we collect from you, what we do with it and who it might be shared with.
            </Typography>
            
            <div className="info-topics">
                {itemSpec.map((text) =>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon icon={faCircleChevronDown} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Avatar><FontAwesomeIcon color="#5a04bd" icon={icons[itemSpec.indexOf(text)]}/></Avatar>
                        <Typography fontSize={15} className="acc-text" variant='body1'>{text}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="html-description" dangerouslySetInnerHTML={{ __html: resources.fields[itemSpec.indexOf(text)]}} />
                    </AccordionDetails>
                </Accordion>
                )}
            </div>
            <div className="btn-wrapper">
                <Button onClick={handleClick} className="accept-btn" size="small" variant="contained">Accept</Button>
                <Button className="decline-btn" size="small" variant="outlined">Decline</Button>
            </div>
        </div>
    );
}